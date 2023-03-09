import { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../configs/configs";
import { ILogin } from "../interfaces/login";
import { User } from "../models/User";
import { ApiController } from "../utils/types";

export class AuthorizationController implements ApiController {
  req: IncomingMessage;
  res: ServerResponse;
  body: ILogin;
  public constructor(data: ApiController) {
    this.body = JSON.parse(data.body);
    this.req = data.req;
    this.res = data.res;
  }
  public async login(): Promise<ServerResponse<IncomingMessage>> {
    if (this.body == null) {
      return this.res.writeHead(400).end(JSON.stringify(User.badRequest()));
    }
    const userInfo = await User.findUserWithLogin(this.body);
    if (userInfo == null) {
      return this.res
        .writeHead(401)
        .end(JSON.stringify(User.composeInvalidUserError()));
    }
    const accessToken = jwt.sign({ email: userInfo.email }, SECRET_TOKEN);
    return this.res
      .writeHead(200)
      .end(JSON.stringify({ access_token: accessToken }));
  }
}
