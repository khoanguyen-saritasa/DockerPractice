import { UserDto } from "../dtos/user.dto";
import { User } from "../models/User";

export class UserMapper {
  public fromDto({ email, password }: UserDto): User {
    return new User(email, password);
  }
}

export const userMapper = new UserMapper();
