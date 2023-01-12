import { Express } from "express";
import { verifyToken } from "../middlewares/authorization";
import { Post } from "../models/post";

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

export function buildTestAuthAPI(app: Express): void {
  app.get<any, Post[], string>("/posts/", verifyToken(), (req, res) => {
    res.json(posts);
  });
}
