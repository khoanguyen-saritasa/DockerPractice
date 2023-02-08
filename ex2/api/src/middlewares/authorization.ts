import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../configs/configs";

export function verifyToken(): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    const token = authHeader != null ? authHeader.split(" ")[1] : null;
    if (token == null) {
      res.sendStatus(401);
      return;
    }
    try {
      jwt.verify(token, SECRET_TOKEN);
      next();
    } catch (error: unknown) {
      res.sendStatus(403);
    }
  };
}
