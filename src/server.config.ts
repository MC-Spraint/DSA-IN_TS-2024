import dotenv from "dotenv";
import express, { Express } from "express";
import bodyParser from "body-parser";
import path from "path";
import { BaseRouter } from "./router";
import { ConnectMongoDB } from "./core/config/databases/mongodb.config";
// import passport from "passport";
// import { ConnectPostgresql } from "./core/config/databases/postgres.config";

export class ServerConfig {
  private readonly app: Express;
  private readonly PORT: string | number;

  constructor() {
    dotenv.config();
    this.app = express();
    this.PORT = process.env.PORT || 8000;
    this.configureApp();
  }
  private configureApp(): void {
    // this.app.use(passport.initialize());
    this.app.use(express.static(path.join(__dirname, "/public")));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use("/api/v1", new BaseRouter().router);
    // this.connectDatabases();
  }

  private connectDatabases(): void {
    ConnectMongoDB();
    // ConnectPostgresql();
  }

  public start(): void {
    this.app.listen(this.PORT, () => {
      console.log(`Server running on port no. ${this.PORT}`);
    });
  }
}
