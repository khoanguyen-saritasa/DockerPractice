import { UserDto } from "../dtos/user.dto";
import { User } from "../models/User";

export class UserMapper {
  public fromDto(data: UserDto): User {
    return new User(data);
  }
}

export const userMapper = new UserMapper();
