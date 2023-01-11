import { Express } from "express";
import { verifyToken } from "../middlewares/authorization";

export function buildTestAuthAPI(app: Express): void {
  app.get<any, string, string>("/tests/", verifyToken(), (req, res) => {
    res.send("Authorization success")
  });
}
