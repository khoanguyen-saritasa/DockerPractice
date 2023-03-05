/** User secret dto. */
export interface UserSecretDto {

  /** Authentication information. */
  readonly authenticate: {

    /** Access token. */
    readonly jwtToken: string;
  };
}
