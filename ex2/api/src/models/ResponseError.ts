export class ResponseError<
  Error extends Readonly<Record<string, any>> | null = null
> {
  public readonly data?: Error;
  public readonly non_field_error?: string;
  public readonly detail: string;
  public constructor(error: {
    data?: Error;
    non_field_error?: string;
    detail: string;
  }) {
    this.data = error.data;
    this.non_field_error = error.non_field_error;
    this.detail = error.detail;
  }
  public compose(): ResponseErrorType {
    if (this.data == null && this.non_field_error == null) {
      throw new Error("Invalid error.");
    }
    if (this.non_field_error == null && this.data != null) {
      return {
        data: this.data,
        detail: this.detail,
      };
    }
    if (this.data == null && this.non_field_error != null) {
      return {
        data: { non_field_error: this.non_field_error },
        detail: this.detail,
      };
    }
    return {
      data: {
        ...this.data,
        non_field_error: this.non_field_error,
      },
      detail: this.detail,
    };
  }
}

export type ResponseErrorType = {
  data: Record<string, any>;
  detail: string;
};
