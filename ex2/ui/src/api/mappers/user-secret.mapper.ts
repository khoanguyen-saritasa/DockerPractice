import { UserSecret } from '../../models/user-secret';
import { UserSecretDto } from '../dtos/user-secret-dto';

import { IMapper } from './mappers';

/** User secret mapper. */
class UserSecretMapper implements IMapper<UserSecretDto, UserSecret> {

  /** @inheritdoc */
  public toDto(data: UserSecret): UserSecretDto {
    return {
      access_token: data.token,
    };
  }

  /** @inheritdoc */
  public fromDto(dto: UserSecretDto): UserSecret {
    return {
      token: dto.access_token,
    };
  }
}

export const userSecretMapper = new UserSecretMapper();
