import { User } from 'src/models/user';

import { UserDto } from '../dtos/userDto';

import { IMapperFromDto } from './mappers';

/** User mapper. */
class UserMapper implements IMapperFromDto<UserDto, User> {
  /** @inheritdoc */
  public fromDto(dto: UserDto): User {
    return new User({
      id: dto.userProfile.id,
      name: `${dto.userProfile.lastname} ${dto.userProfile.firstname}`,
      email: dto.userProfile.email,
    });
  }
}

export const userMapper = new UserMapper();
