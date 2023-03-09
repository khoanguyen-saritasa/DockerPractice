/** User DTO. */
export interface UserDto {

  /** Id. */
  readonly id: number;

  /** First name. */
  readonly firstname: string;

  /** Last name. */
  readonly lastname: string;

  /** Email. */
  readonly email: string;

  /** Whether user is admin or not. */
  readonly isAdmin: boolean;
}
