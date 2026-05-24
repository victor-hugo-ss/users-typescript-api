import { MongoClient as Mongo, Db } from "mongodb";
import { log } from "node:console";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || "localhost:27027";
    const username = process.env.MONGODB_USERNAME || "root";
    const password = process.env.MONGODB_PASSWORD || "password";

    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db("users-db");

    this.client = client;
    this.db = db;

    console.log("connected to mongodb!");
  },
};
