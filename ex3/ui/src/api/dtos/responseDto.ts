/** Response dto. */
export interface ResponseDto<TQuery extends string, T> {

  /** Data returned from api. */
  readonly data: {
    readonly [x in TQuery]: T
  };
}
