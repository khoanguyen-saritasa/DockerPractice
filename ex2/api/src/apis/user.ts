import { Express } from "express";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../configs/configs";
import { verifyToken } from "../middlewares/authorization";
import { ResponseErrorType } from "../models/ResponseError";
import { User } from "../models/User";
import { ParamDictionary } from "../utils/types";

export function buildUserAPI(app: Express): void {
  app.get<ParamDictionary, User | ResponseErrorType, string>(
    "/user/",
    verifyToken(),
    async (req, res) => {
      const authHeader = req.header("Authorization");
      const token = authHeader != null ? authHeader.split(" ")[1] : null;
      if (token != null) {
        const decodedToken = jwt.verify(token, SECRET_TOKEN);
        const user = await User.findByEmail(
          (decodedToken as Pick<User, "email">).email
        );
        if (user == null) {
          return res.status(401).send(User.composeUnauthorizedError());
        }
        return res.status(200).send(user);
      }
      return res.status(401).send(User.composeUnauthorizedError());
    }
  );
}
