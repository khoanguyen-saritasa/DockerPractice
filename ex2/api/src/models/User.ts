import { client } from "../db/db-config";
import { IUser } from "../interfaces/user";
import { userMapper } from "../mappers/user.mapper";

export class User implements IUser {
  private _email: IUser["email"];
  private _password: IUser["password"];

  private static FIND_BY_EMAIL_QUERY = "SELECT * FROM users WHERE email = $1";

  public constructor(email: IUser["email"], password: IUser["password"]) {
    this._email = email;
    this._password = password;
  }
  public get email(): IUser["email"] {
    return this._email;
  }
  public get password(): IUser["password"] {
    return this._password;
  }

  public static async findByEmail(
    userEmail: IUser["email"]
  ): Promise<User | null> {
    try {
      const result = await client.query<User>(this.FIND_BY_EMAIL_QUERY, [
        userEmail,
      ]);
      if (result.rows.length === 0) {
        return null;
      }
      return userMapper.fromDto(result.rows[0]);
    } catch (error) {
      throw new Error(`Cannot find user with email: ${userEmail}`);
    }
  }
}
