import { client } from "../db/db-config";
import { UserDto } from "../dtos/user.dto";
import { ILogin } from "../interfaces/login";
import { IUser } from "../interfaces/user";
import { userMapper } from "../mappers/user.mapper";
import { ResponseError, ResponseErrorType } from "./ResponseError";

export class User implements IUser {
  public email: IUser["email"];
  public name: IUser["name"];
  public id: IUser["id"];

  private static FIND_BY_EMAIL_QUERY = "SELECT * FROM users WHERE email = $1";

  public constructor(data: IUser) {
    this.email = data.email;
    this.name = data.name;
    this.id = data.id;
  }

  public static async findUserWithLogin(
    loginInfo: ILogin
  ): Promise<User | null> {
    try {
      const result = await client.query<UserDto>(this.FIND_BY_EMAIL_QUERY, [
        loginInfo.email,
      ]);
      if (result.rows.length === 0) {
        return null;
      }
      const userDto = result.rows[0];
      if (loginInfo.password === userDto.password) {
        return userMapper.fromDto(userDto);
      }
      return null;
    } catch (error) {
      throw new Error(`Cannot find user with email: ${loginInfo.email}`);
    }
  }

  public static async findByEmail(
    email: User["email"]
  ): Promise<User | null> {
    try {
      const result = await client.query<UserDto>(
        this.FIND_BY_EMAIL_QUERY,
        [email]
      );
      if (result.rows.length === 0) {
        return null;
      }
      const userDto = result.rows[0];
      return userMapper.fromDto(userDto);
    } catch (error) {
      throw new Error(`Cannot find user with email: ${email}`);
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
