import { User } from 'src/models/user';
import { composeQuery } from 'src/utils/composeQuery';

import { ResponseDto } from '../dtos/responseDto';
import { UserDto } from '../dtos/userDto';
import { http } from '../http';
import { responseMapper } from '../mappers/responseMapper';
import { userMapper } from '../mappers/userMapper';

/** User queries. */
namespace UserQueries {

  /** User profile query. */
  export function getUserProfile() {
    return `
      query {
        userProfile {
          id
          email
          firstname
          lastname
        }
      }
    `;
  }
}

export namespace UserApi {

  /** Get current user. */
  export async function getCurrentUser(): Promise<User> {
    const result = await http.post<ResponseDto<UserDto>>('', composeQuery(UserQueries.getUserProfile()));
    return responseMapper.fromDto(result.data, userMapper);
  }
}
