import { AppError } from 'src/models/appError';
import { Group } from 'src/models/group';
import { createComposeActionFn } from 'src/utils/createComposeAction';

export namespace GroupActions {
  const composeAction = createComposeActionFn('group');

  export const get = composeAction('get');
  export const getSuccess = composeAction<readonly Group[]>('getSuccess');
  export const getFailure = composeAction<AppError>('getFailure');

  export const getById = composeAction<Group['id']>('getGroupById');
  export const getByIdSuccess = composeAction<Group>('getGroupByIdSuccess');
  export const getByIdFailure = composeAction<AppError>('getGroupByIdFailure');
}
