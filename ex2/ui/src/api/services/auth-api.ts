import { UserSecret } from 'src/models/user-secret';
import { AxiosError } from 'axios';
import { User } from 'src/models/user';
import { Login } from 'src/models/login-values';

import { LoginDto } from '../dtos/login-dto';
import { UserDto } from '../dtos/user-dto';
import { ApiErrorDto } from '../dtos/validation-error-dto';
import { userMapper } from '../mappers/user.mapper';
import { http } from '../http';
import { UserSecretDto } from '../dtos/user-secret-dto';
import { userSecretMapper } from '../mappers/user-secret.mapper';

import { UserSecretStorageService } from './user-secret-storage';

/** Auth API. */
export namespace AuthApi {

  const loginUrl = 'auth/login/';
  const refreshSecretUrl = 'auth/token/refresh/';

  /**
   * Logs a user in with email and password.
   * @param loginData Login data.
   */
  export async function login({ email, password }: Login): Promise<User> {
    const userDto = await mockLogin(email, password);
    const user = userMapper.fromDto(userDto);

    return user;
  }

  /** Logs the current user out. */
  export async function logout(): Promise<void> {
    await UserSecretStorageService.remove();
  }

  /**
   * Refresh secret.
   * @param secret User secret.
   */
  export async function refreshSecret(secret: UserSecret): Promise<UserSecret> {
    const { data: newSecretDto } = await http.post<UserSecretDto>(
      refreshSecretUrl,
      userSecretMapper.toDto(secret),
    );

    return userSecretMapper.fromDto(newSecretDto);
  }

  // TODO (template preparation): This function was made for template. Remove it from your project.
  /**
   * Mocks user login.
   * @param email Email.
   * @param password Password.
   */
  async function mockLogin(email: string, password: string): Promise<UserDto> {
    try {
      return await http.post(loginUrl, {
        email, password,
      });
    } catch (error: unknown) {
      const axiosMockError = error as AxiosError<ApiErrorDto<LoginDto>>;
      if (!email) {
        axiosMockError.message = 'No login provided';
        throw axiosMockError;
      }

      if (!password || password.length < 5) {
        axiosMockError.message = 'Incorrect password';

        axiosMockError.response = {
          config: {},
          data: {
            data: {
              password: ['Minimum password length 5 characters'],
            },
            detail: 'Incorrect password',
          },
          headers: {},
          status: 400,
          statusText: 'Validation error.',
        };

        throw axiosMockError;
      }

      return {
        id: 1,
        name: 'Test User',
        email,
      };
    }
  }
}
