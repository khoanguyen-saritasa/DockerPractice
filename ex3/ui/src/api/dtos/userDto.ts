/** User DTO. */
export interface UserDto {

  /** User profile. */
  readonly userProfile: {

    /** Id. */
    readonly id: number;

    /** First name. */
    readonly firstname: string;

    /** Last name. */
    readonly lastname: string;

    /** Email. */
    readonly email: string;
  };
}
