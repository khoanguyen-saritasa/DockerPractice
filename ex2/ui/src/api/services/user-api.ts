import { User } from '../../models/user';
import { UserDto } from '../dtos/user-dto';
import { userMapper } from '../mappers/user.mapper';

// TODO (template preparation): This service was made for template. Remove it from your project.
export namespace UserApi {

  /** Get mock user. */
  function getMockUser(): Promise<UserDto> {
    return new Promise(resolve => {
      const userDto: UserDto = { email: 'mockemail@gg.com', id: 1, name: 'Mock User' };
      resolve(userDto);
   });
  }

  /** Get current user. */
  export async function getCurrentUser(): Promise<User> {
    const userDto = await getMockUser();
    return userMapper.fromDto(userDto);
  }
}
