import { IncomingMessage, ServerResponse } from "http";

export type ParamDictionary = {
  [x in string]: string;
};

export interface ApiController {
  req: IncomingMessage;
  res: ServerResponse;
  body: any;
}
