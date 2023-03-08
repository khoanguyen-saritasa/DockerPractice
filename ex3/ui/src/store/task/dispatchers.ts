import { TaskApi } from 'src/api/services/taskApi';
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
  export const getByGroupIdSuccess = composeAction<readonly Task[]>('getByGroupBySuccess');
  export const getByGroupIdFailure = composeAction<AppError>('getByGroupByFailure');

  export const removeFromGroup = composeAction<TaskApi.RemoveOrAddTaskFromGroupInput>('removeFromGroup');
  export const removeFromGroupSuccess = composeAction<void>('removeFromGroupSuccess');
  export const removeFromGroupFailure = composeAction<AppError>('removeFromGroupFailure');

  export const addToGroup = composeAction<TaskApi.RemoveOrAddTaskFromGroupInput>('addToGroupGroup');
  export const addToGroupSuccess = composeAction<void>('addToGroupSuccess');
  export const addToGroupFailure = composeAction<AppError>('addToGroupFailure');
}
