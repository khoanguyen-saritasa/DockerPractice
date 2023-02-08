import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { buildAuthorizationAPI } from "./src/apis/authorization";
import { buildPostAPI } from "./src/apis/post";
import { PORT } from "./src/configs/configs";
import { client } from "./src/db/db-config";

// Config env.
dotenv.config();

const app: Express = express();

// Connect to pg client.
client.connect();

// Body parser.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config CORS.
app.use(
  cors({
    // Support all requested headers.
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

/** Build APIs. */
buildAuthorizationAPI(app);
buildPostAPI(app);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
