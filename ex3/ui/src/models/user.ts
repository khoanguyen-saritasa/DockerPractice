import { Immerable, OmitImmerable } from './immerable';

/** User. */
export class User extends I
mmerable {
  /** User id. */
  public readonly id: number;

  /** Name. */
  public readonly name: string;

  /** Name. */
  public readonly email: string;

  /** Whether user is admin or not. */
  public readonly isAdmin: boolean;

  public constructor(data: UserInitArgs) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.isAdmin = data.isAdmin;
  }
}

type UserInitArgs = OmitImmerable<User>;
