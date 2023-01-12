import { Express } from "express";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../configs/configs";
import { UserQueries } from "../db/User";
import { Login } from "../models/login";
import { Token } from "../models/token";

export function buildAuthorizationAPI(app: Express): void {
  app.post<unknown, Token | string, Login>("/auth/login/", async (req, res) => {
    if (req.body == null) {
      return res.sendStatus(400);
    }
    const userQuery = await UserQueries.getUser(req.body);
    if (userQuery.rows.length === 0) {
      return res.sendStatus(401);
    }
    const user = userQuery.rows[0];
    if (user.password !== req.body.password) {
      return res.sendStatus(401).send("Wrong email or password.");
    }
    const accessToken = jwt.sign(userQuery.rows[0], SECRET_TOKEN);
    return res.sendStatus(200).json({ accessToken });
  });
}
