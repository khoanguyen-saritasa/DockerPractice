import { Express } from "express";
import { verifyToken } from "../middlewares/authorization";
import { Post } from "../models/post";
import { ParamDictionary } from "../utils/types";

const posts: Post[] = [
  {
    title: "Post 1",
    content: "This is post 1.",
  },
  {
    title: "Post 2",
    content: "This is post 2.",
  },
];

export function buildPostAPI(app: Express): void {
  app.get<ParamDictionary, Post[], string>("/posts/", verifyToken(), (_, res) => {
    res.json(posts).sendStatus(200);
  });
}
