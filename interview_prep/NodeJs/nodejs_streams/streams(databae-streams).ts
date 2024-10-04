import { Pool, PoolClient, QueryResult } from "pg";
import { QueryStream } from "pg-query-stream";
import * as JSONStream from "JSONStream";
import { PassThrough } from "stream";

export class StreamService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: "your_username",
      host: "your_host",
      database: "your_database",
      password: "your_password",
      port: 5432,
    });
  }
  // Method to close the pool connection
  async closePool(): Promise<void> {
    await this.pool.end();
  }
  async getDatabaseStream(
    queryString: string,
    params?: any[]
  ): Promise<PassThrough> {
    const client = await this.pool.connect();
    const stream = client.query(new QueryStream(queryString, params));

    //passThrough data expects string or buffer data type
    //Transform stream to json string before transforming it into passthrough
    const passThrough = new PassThrough();
    stream.pipe(JSONStream.stringify()).pipe(passThrough);

    //Handle the stream events
    stream.on("end", () => {
      console.log("Stream ended.");
      passThrough.end();
      client.release();
    });

    stream.on("error", (error) => {
      console.error("Error in stream:", error);
      passThrough.destroy(error);
      client.release();
    });

    return passThrough;
  }

  // Method to execute a simple query
  async query(queryString: string, params?: any[]): Promise<QueryResult<any>> {
    const client = await this.pool.connect();
    try {
      return await client.query(queryString, params);
    } finally {
      client.release();
    }
  }

  // Method to begin a transaction
  async beginTransaction(): Promise<PoolClient> {
    const client = await this.pool.connect();
    await client.query("BEGIN");
    return client;
  }

  // Method to commit a transaction
  async commitTransaction(client: PoolClient): Promise<void> {
    await client.query("COMMIT");
    client.release();
  }

  // Method to rollback a transaction
  async rollbackTransaction(client: PoolClient): Promise<void> {
    await client.query("ROLLBACK");
    client.release();
  }
}
