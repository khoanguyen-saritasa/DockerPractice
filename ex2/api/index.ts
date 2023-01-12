import cors from 'cors';
import dotenv from "dotenv";
import express, { Express } from "express";
import { buildAuthorizationAPI } from "./src/apis/authorization";
import { buildTestAuthAPI } from "./src/apis/tests";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

/** Body parser. */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  // Support all requested headers;
  origin: "*",
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

/** Build APIs. */
buildAuthorizationAPI(app);
buildTestAuthAPI(app);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
