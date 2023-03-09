import { User } from '../../models/user';
import { UserDto } from '../dtos/user-dto';
import { http } from '../http';
import { userMapper } from '../mappers/user.mapper';

export namespace UserApi {

  const getCurrentUserUrl = 'user/';

  /** Get current user. */
  export async function getCurrentUser(): Promise<User> {
    const userDto = await http.get<UserDto>(getCurrentUserUrl);
    return userMapper.fromDto(userDto.data);
  }
}
