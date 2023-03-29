export type ResponseErrorType = {
  data: Record<string, any>;
  detail: string;
};

type InputError<Error extends Readonly<Record<string, any>> | null = null> = {
  readonly data?: Error;
  readonly non_field_error?: string;
  readonly detail: string;
};

export function generateError<
  T extends Readonly<Record<string, any>> | null = null
>(error: InputError<T>): ResponseErrorType {
  if (error.data == null) {
    return {
      data: {
        non_field_error: error.non_field_error,
      },
      detail: error.detail,
    };
  }
  return {
    data: {
      ...error.data,
      non_field_error: error.non_field_error,
    },
    detail: error.detail,
  };
}
