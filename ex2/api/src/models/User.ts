import { client } from "../db/db-config";
import { IUser } from "../interfaces/user";
import { userMapper } from "../mappers/user.mapper";
import { ResponseError, ResponseErrorType } from "./ResponseError";

export class User implements IUser {
  public email: IUser["email"];
  public password: IUser["password"];

  private static FIND_BY_EMAIL_QUERY = "SELECT * FROM users WHERE email = $1";

  public constructor(data: IUser) {
    this.email = data.email;
    this.password = data.password;
  }

  public static async findUser(userInfo: User): Promise<User | null> {
    try {
      const result = await client.query<User>(this.FIND_BY_EMAIL_QUERY, [
        userInfo.email,
      ]);
      if (result.rows.length === 0) {
        return null;
      }
      const user = result.rows[0];
      if (userInfo.password === user.password) {
        return userMapper.fromDto(user);
      }
      return null;
    } catch (error) {
      throw new Error(`Cannot find user with email: ${userInfo.email}`);
    }
  }

  public static composeUnauthorizedError(): ResponseErrorType {
    return new ResponseError({ non_field_error: "Unauthorized" }).compose();
  }

  public static composeInvalidUserError(): ResponseErrorType {
    return new ResponseError({
      non_field_error: "Email or password is incorrect",
    }).compose();
  }
}
