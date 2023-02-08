import { Express } from "express";
import { verifyToken } from "../middlewares/authorization";
import { IPost } from "../interfaces/post";
import { ParamDictionary } from "../utils/types";

const posts: IPost[] = [
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
  app.get<ParamDictionary, IPost[], string>("/posts/", verifyToken(), (_, res) => {
    res.json(posts).status(200);
  });
}
