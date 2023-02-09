import { Express } from "express";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../configs/configs";
import { ILogin } from "../interfaces/login";
import { IToken } from "../interfaces/token";
import { User } from "../models/User";
import { ResponseErrorType } from "../utils/generate-error";

export function buildAuthorizationAPI(app: Express): void {
  app.post<User, IToken | ResponseErrorType, ILogin>(
    "/auth/login/",
    async (req, res) => {
      if (req.body == null) {
        return res.sendStatus(400).send(User.badRequest());
      }
      const userInfo = await User.findUserWithLogin(req.body);
      if (userInfo == null) {
        return res.status(401).send(User.composeInvalidUserError());
      }
      const accessToken = jwt.sign({ email: userInfo.email }, SECRET_TOKEN);
      return res.status(200).json({ access_token: accessToken });
    }
  );
}
