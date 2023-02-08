import { Express } from "express";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../configs/configs";
import { ILogin } from "../interfaces/login";
import { IToken } from "../interfaces/token";
import { User } from "../models/User";

export function buildAuthorizationAPI(app: Express): void {
  app.post<unknown, IToken | string, ILogin>("/auth/login/", async (req, res) => {
    if (req.body == null) {
      return res.sendStatus(400);
    }
    const userInfo = await User.findByEmail(req.body.email);
    if (userInfo == null) {
      return res.status(401).send("Wrong email or password.");
    }
    const accessToken = jwt.sign(userInfo, SECRET_TOKEN);
    return res.status(200).json({ accessToken });
  });
}
