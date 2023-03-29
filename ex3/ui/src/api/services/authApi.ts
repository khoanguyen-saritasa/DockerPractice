import { Login } from 'src/models/loginValues';
import { UserSecret } from 'src/models/userSecret';
import { composeQuery } from 'src/utils/composeQuery';

import { ResponseDto } from '../dtos/responseDto';
import { UserSecretDto } from '../dtos/userSecretDto';
import { http } from '../http';
import { responseMapper } from '../mappers/responseMapper';
import { userSecretMapper } from '../mappers/userSecretMapper';

import { UserSecretStorageService } from './userSecretStorage';

/** Auth queries. */
namespace AuthQueries {

  /**
   * Login mutation.
   * @param loginInfo Login info of user.
   */
  export function authenticate(loginInfo: Login) {
    return `
      mutation
        {
          authenticate(input: {email: "${loginInfo.email}", password: "${loginInfo.password}"}) {
            jwtToken
          }
        }
      `;
  }
}

/** Auth API. */
export namespace AuthApi {

  /**
   * Logs a user in with email and password.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<UserSecret> {
    const result = await http.post<ResponseDto<'authenticate', UserSecretDto>>(
      '',
      composeQuery(AuthQueries.authenticate(loginData)),
    );
    return responseMapper.fromDto(result.data, userSecretMapper, 'authenticate');
  }

  /** Logs the current user out. */
  export async function logout(): Promise<void> {
    await UserSecretStorageService.remove();
  }
}
