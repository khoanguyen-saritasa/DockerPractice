import { UserSecret } from 'src/models/userSecret';

import { UserSecretDto } from '../dtos/userSecretDto';

import { IMapperFromDto } from './mappers';

/** User secret mapper. */
class UserSecretMapper implements IMapperFromDto<UserSecretDto, UserSecret> {

  /** @inheritdoc */
  public fromDto(dto: UserSecretDto): UserSecret {
    return {
      token: dto.jwtToken,
    };
  }
}

export const userSecretMapper = new UserSecretMapper();
