import { Login } from 'src/models/login-values';
import { UserSecret } from 'src/models/user-secret';

import { UserSecretDto } from '../dtos/user-secret-dto';
import { http } from '../http';
import { userSecretMapper } from '../mappers/user-secret.mapper';

import { UserSecretStorageService } from './user-secret-storage';

/** Auth API. */
export namespace AuthApi {

  const loginUrl = 'auth/login/';

  /**
   * Logs a user in with email and password.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<UserSecret> {
    const result = await http.post<UserSecretDto>(loginUrl, loginData);
    const userSecret = userSecretMapper.fromDto(result.data);
    await UserSecretStorageService.save(userSecret);
    return userSecret;
  }

  /** Logs the current user out. */
  export async function logout(): Promise<void> {
    await UserSecretStorageService.remove();
  }
}
