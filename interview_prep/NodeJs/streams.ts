import { Pool, PoolClient, QueryResult } from "pg";
import { QueryStream } from "pg-query-stream";
import { PassThrough } from "stream";
import * as JSONStream from "JSONStream";
import * as fs from "fs";
import * as path from "path";
import * as util from "util";

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
  async getFileStream(relativePath: string): Promise<PassThrough> {
    const filePath = path.join(__dirname + relativePath);
    const passThrough = new PassThrough();
    const fileStream = await promisify(fs.createReadStream)(filePath, { encoding: "utf-8" }) as any;

    fileStream.pipe(passThrough);

    fileStream.on("data", (chunk) => {
      console.log(chunk);
    });
    fileStream.on("end", () => {
      console.log("File reading ended");
      passThrough.end();
    });
    fileStream.on("error", (error) => {
      console.error("File reading error:", error);
      passThrough.destroy(error);
    });
    return passThrough;

  }
  async getVideoStream(
    relativePath: string,
    range: string | undefined
  ): Promise<PassThrough> {
    const filePath = path.join(__dirname + relativePath);

    const passThrough = new PassThrough();

    const videoStats = (await promisify(fs.stat)(filePath)) as any;
    const fileSize = videoStats.size;

    const { start, end } = this.calculateRange(range, fileSize);

    const videoStream = fs.createReadStream(filePath, { start, end });

    videoStream.pipe(passThrough);

    videoStream.on("end", () => {
        console.error("Video stream ended");
        passThrough.end();
      });
    videoStream.on("error", (error) => {
      console.error("Error in video stream:", error);
      passThrough.destroy(error);
    });

    return passThrough;
  }

  async getVideoHeaders(
    filePath: string,
    range: string | undefined
  ): Promise<Record<string, string | number>> {
    const videoStats = (await promisify(fs.stat)(filePath)) as any;
    const fileSize = videoStats.size;

    const { start, end } = this.calculateRange(range, fileSize);

    const contentLength = end - start + 1;
    return {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
  }

  private calculateRange(
    range: string | undefined,
    fileSize: number
  ): { start: number; end: number } {
    const parts = range ? range.replace(/bytes=/, "").split("-") : [0];
    const start = parseInt(parts[0] as string, 10);
    const end = parts[1] ? parseInt(parts[1] as string, 10) : fileSize - 1;

    if (start >= fileSize) {
      throw new Error(
        `Requested range not satisfiable: ${start} >= ${fileSize}`
      );
    }

    return { start, end };
  }
  // Method to get a streaming query result with parameters
  async getDatabaseStream(queryString: string, params?: any[]): Promise<PassThrough> {
    const passThrough = new PassThrough();

    const client = await this.pool.connect();
    const stream = client.query(new QueryStream(queryString, params));

    //passThrough data expects string or buffer data type
    stream.pipe(JSONStream.stringify()).pipe(passThrough);

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

  // Method to close the pool connection
  async closePool(): Promise<void> {
    await this.pool.end();
  }
}

function promisify(original) {
  return function (...args) {
    // `args` is an array containing all the arguments passed to the promisified function
    // `original` is the original function that follows the error-first callback pattern

    return new Promise((resolve, reject) => {
      // Call the original function with the captured arguments (`...args`)
      // Pass a callback function that resolves or rejects the promise
      original(...args, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

// var obj = {
//   property1: "att1",
//   property2: {
//     property1: "innerProperty",
//     aFunction() {
//       // Reference obj.property1
//       let outerProperty = obj.property1;

//       // Create a string that combines inner and outer properties
//       let combinedProperty = `${outerProperty} - ${this.property1}`;
//       return combinedProperty;
//     },
//   },
// };
// const fcall1 = obj.property2.aFunction();
// const fcall2 = obj.property2.aFunction.bind(obj.property2);


// console.log(fcall1); // Outputs: "att1 - innerProperty"


import fs from 'fs';

const readableStream = fs.createReadStream('deploy.sh');
const writableStream = fs.createWriteStream('output.txt');

// Pipe the readable stream to the writable stream
readableStream.pipe(writableStream);

// Listen for events on the readable stream
readableStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk);
});

readableStream.on('end', () => {
  console.log('Readable stream ended');
});

// Listen for events on the writable stream
writableStream.on('finish', () => {
  console.log('Writable stream finished writing');
});

writableStream.on('error', (err) => {
  console.error('Error writing to writable stream:', err);
});
