import { AppError } from 'src/models/app-error';
import { Login } from 'src/models/login-values';
import { createComposeActionFn } from 'src/utils/create-compose-action-fn';

export namespace AuthActions {
  const composeAction = createComposeActionFn('auth');

  export const login = composeAction<Login>('login');
  export const loginSuccess = composeAction('loginSuccess');
  export const loginFailure = composeAction<AppError<Login>>('loginFailure');
  export const logout = composeAction('logout');
  export const logoutSuccess = composeAction('logoutSuccess');
  export const logoutFailure = composeAction<AppError>('logoutFailure');
  export const reset = composeAction('reset');
}
