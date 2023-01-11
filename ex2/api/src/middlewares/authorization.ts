import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export function verifyToken(): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      res.sendStatus(401);
      return;
    }
    try {
      const asd = jwt.verify(token, "secret-token");
      console.log(asd)
      next();
    } catch (error: unknown) {
      res.sendStatus(403);
      return;
    }
  };
}
