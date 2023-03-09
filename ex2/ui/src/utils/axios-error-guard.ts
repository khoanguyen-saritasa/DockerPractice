import { GeneralApiError } from 'src/api/dtos/api-error-dto';
import { ApiErrorDto } from 'src/api/dtos/validation-error-dto';

/**
 * Type guard for AxiosError.
 * @param error Source object.
 * @returns GeneralApiError type predicate.
 */
// See app-error.ts to find out why this rule is disabled.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isApiError<TDto extends Record<string, any>>(
  error: unknown,
): error is GeneralApiError<ApiErrorDto<TDto>> {
  return (error as GeneralApiError<ApiErrorDto<TDto>>).isAxiosError === true;
}
