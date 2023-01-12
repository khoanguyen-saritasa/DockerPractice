import { Express } from "express";
import jwt from "jsonwebtoken";
import { Login } from "../models/login";
import { Token } from "../models/token";
import { User } from "../models/user";

const users: readonly User[] = [
  {
    email: "khoanguyen",
    id: 1,
  },
  {
    email: "test",
    id: 2,
  },
];

export function buildAuthorizationAPI(app: Express): void {
  app.post<unknown, Token, Login>("/auth/login/", (req, res) => {
    if (req.body == null) {
      return res.sendStatus(400);
    }
    const email = req.body.email;
    const user = users.find((user) => user.email === email);
    if (user == null) {
      return res.sendStatus(401);
    }
    const accessToken = jwt.sign(user, "secret-token");
    res.json({ accessToken });
  });
}
