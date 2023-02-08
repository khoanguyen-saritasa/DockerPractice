import { Express } from "express";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../configs/configs";
import { ILogin } from "../interfaces/login";
import { IToken } from "../interfaces/token";
import { ResponseErrorType } from "../models/ResponseError";
import { User } from "../models/User";

export function buildAuthorizationAPI(app: Express): void {
  app.post<User, IToken | ResponseErrorType, ILogin>(
    "/auth/login/",
    async (req, res) => {
      if (req.body == null) {
        return res.sendStatus(400).send(User.composeUnauthorizedError());
      }
      const userInfo = await User.findUser(req.body);
      if (userInfo == null) {
        return res.status(401).send(User.composeInvalidUserError());
      }
      const accessToken = jwt.sign(
        { email: userInfo.email, password: userInfo.password },
        SECRET_TOKEN
      );
      return res.status(200).json({ access_token: accessToken });
    }
  );
}
