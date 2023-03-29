import { AppError } from 'src/models/app-error';
import { Login } from 'src/models/login-values';

/** Auth state. */
export interface AuthState {

  /** Whether authentication is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError<Login>;

}

export const initialState: AuthState = {
  isLoading: false,
};
