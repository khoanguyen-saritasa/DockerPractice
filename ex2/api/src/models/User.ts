import { client } from "../db/db-config";
import { UserDto } from "../dtos/user.dto";
import { ILogin } from "../interfaces/login";
import { IUser } from "../interfaces/user";
import { userMapper } from "../mappers/user.mapper";
import { ResponseError, ResponseErrorType } from "./ResponseError";

export class User implements IUser {
  public readonly email: IUser["email"];
  public readonly name: IUser["name"];
  public readonly id: IUser["id"];
  public readonly password: IUser["password"];

  private static readonly FIND_BY_EMAIL_QUERY =
    "SELECT * FROM Users WHERE email = $1";

  public constructor(data: IUser) {
    this.email = data.email;
    this.name = data.name;
    this.id = data.id;
    this.password = data.password;
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
  ): Promise<Omit<User, "password"> | null> {
    try {
      const result = await client.query<UserDto>(this.FIND_BY_EMAIL_QUERY, [
        email,
      ]);
      if (result.rows.length === 0) {
        return null;
      }
      const userDto = result.rows[0];
      const user = userMapper.fromDto(userDto);
      return { id: user.id, email: user.email, name: user.name };
    } catch (error) {
      throw new Error(`Cannot find user with email: ${email}`);
    }
  }

  public static composeUnauthorizedError(): ResponseErrorType {
    return new ResponseError({
      non_field_error: "Unauthorized",
      detail: "Unauthorized",
    }).compose();
  }

  public static composeInvalidUserError(): ResponseErrorType {
    return new ResponseError({
      non_field_error: "Email or password is incorrect",
      detail: "Unauthorized",
    }).compose();
  }
}
