import { EntityValidationErrors } from 'src/models/app-error';
import { Login } from 'src/models/login-values';
import { extractErrorMessage } from 'src/utils/extract-error-message';

import { LoginDto } from '../dtos/login-dto';
import { ValidationErrorDto } from '../dtos/validation-error-dto';

import { IMapper, ValidationErrorMapper } from './mappers';

/** Login mapper. */
class LoginMapper implements
  IMapper<LoginDto, Login>,
  ValidationErrorMapper<LoginDto, Login> {

  /** @inheritdoc */
  public fromDto(dto: LoginDto): Login {
    return {
      email: dto.email,
      password: dto.password,
    };
  }

  /** @inheritdoc */
  public toDto(data: Login): LoginDto {
    return {
      email: data.email,
      password: data.password,
    };
  }

  /** @inheritdoc */
  public validationErrorFromDto(
    errorDto?: ValidationErrorDto<LoginDto> | null,
  ): EntityValidationErrors<Login> {
    return {
      email: extractErrorMessage(errorDto?.email),
      password:
        extractErrorMessage(errorDto?.password) ??
        extractErrorMessage(errorDto?.non_field_errors),
    };
  }
}

export const loginMapper = new LoginMapper();
