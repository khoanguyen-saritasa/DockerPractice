import { config } from "dotenv";
import { Client } from "pg";

config()

export const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export const connectToDB = async () => {
  try {
    client.connect().then(() => {
      console.log('Connected to db!')
    });
  } catch (err) {
    console.log(err);
  }
};