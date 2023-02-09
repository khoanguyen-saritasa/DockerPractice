import { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../configs/configs";
import { User } from "../models/User";
import { ApiController } from "../utils/types";

export class UserController implements ApiController {
  req: IncomingMessage;
  res: ServerResponse;
  body: unknown;
  public constructor(data: ApiController) {
    this.body = data.body;
    this.req = data.req;
    this.res = data.res;
  }
  public async getProfile(): Promise<ServerResponse<IncomingMessage>> {
    const { authorization } = this.req.headers;
    const token = authorization != null ? authorization.split(" ")[1] : null;
    const unauthorizedError = JSON.stringify(User.composeUnauthorizedError());
    if (token != null) {
      const decodedToken = jwt.verify(token, SECRET_TOKEN);
      const user = await User.findByEmail(
        (decodedToken as Pick<User, "email">).email
      );
      if (user == null) {
        return this.res.writeHead(401).end(unauthorizedError);
      }
      return this.res.writeHead(200).end(JSON.stringify(user));
    }
    return this.res.writeHead(400).end(unauthorizedError);
  }
}
