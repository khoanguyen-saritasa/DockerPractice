import dotenv from "dotenv";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { AuthorizationController } from "./src/apis/authorization-controller";
import { UserController } from "./src/apis/user-controller";
import { PORT } from "./src/configs/configs";
import { client } from "./src/db/db-config";
import { appRoutes } from "./src/routes/routes";
import { generateError } from "./src/utils/generate-error";

// Config env.
dotenv.config();
client.connect();

async function listenEndpont(
  req: IncomingMessage,
  res: ServerResponse,
  body: any
) {
  switch (req.url) {
    case appRoutes.login:
      const authorizationController = new AuthorizationController({
        req,
        res,
        body,
      });
      await authorizationController.login();
      break;
    case appRoutes.profile:
      const userController = new UserController({ req, res, body });
      await userController.getProfile();
      break;
    default:
      res
        .writeHead(404)
        .end(JSON.stringify(generateError({ detail: "Not found" })));
      break;
  }
}

async function requestListener(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const body: Uint8Array[] = [];
  req
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", async () => {
      const _body = Buffer.concat(body).toString();
      await listenEndpont(req, res, _body);
    });
}
const server = createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
