import { QueryResult } from "pg";
import { Login } from "../models/login";
import { User } from "../models/user";
import { client } from "./db";

export namespace UserQueries {
  export async function getUser(
    loginInfo: Login
  ): Promise<QueryResult<User>> {
    return client.query<User>("SELECT * FROM users WHERE email = $1", [
      loginInfo.email,
    ]);
  }
}
