import { createComposeActionFn } from 'src/utils/create-compose-action-fn';

import { User } from '../../models/user';
import { AppError } from '../../models/app-error';

export namespace UserActions {
  const composeAction = createComposeActionFn('user');

  export const get = composeAction('get');
  export const getSuccess = composeAction<User>('getSuccess');
  export const getFailure = composeAction<AppError>('getFailure');
  export const remove = composeAction('remove');
}
