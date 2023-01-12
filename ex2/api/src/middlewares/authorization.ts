import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      res.sendStatus(401);
      return;
    }
    try {
      jwt.verify(token, "secret-token");
      next();
    } catch (error: unknown) {
      res.sendStatus(403);
      return;
    }
  };
}
