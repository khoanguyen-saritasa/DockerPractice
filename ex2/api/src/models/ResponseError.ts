export class ResponseError<
  Error extends Readonly<Record<string, any>> | null = null
> {
  public data?: Error;
  public non_field_error?: string;
  public constructor(error: { data?: Error; non_field_error?: string }) {
    this.data = error.data;
    this.non_field_error = error.non_field_error;
  }
  public compose(): ResponseErrorType {
    if (this.data == null && this.non_field_error == null) {
      throw new Error("Invalid error.");
    }
    if (this.non_field_error == null && this.data != null) {
      return this.data;
    }
    if (this.data == null && this.non_field_error != null) {
      return { non_field_error: this.non_field_error };
    }
    return {
      ...this.data,
      non_field_error: this.non_field_error,
    };
  }
}

export type ResponseErrorType = Record<string, any>;
