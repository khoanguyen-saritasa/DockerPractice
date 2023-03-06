import { AppError } from 'src/models/appError';
import { Group } from 'src/models/group';
import { Task } from 'src/models/task';
import { createComposeActionFn } from 'src/utils/createComposeAction';

export namespace TaskActions {
  const composeAction = createComposeActionFn('task');

  export const get = composeAction('get');
  export const getSuccess = composeAction<readonly Task[]>('getSuccess');
  export const getFailure = composeAction<AppError>('getFailure');

  export const getByGroupId = composeAction<Group['id']>('getByGroupId');
  export const getByGroupIdSuccess = composeAction<readonly Task[]>('getGroupByIdSuccess');
  export const getByGroupIdFailure = composeAction<AppError>('getGroupByIdFailure');
}
