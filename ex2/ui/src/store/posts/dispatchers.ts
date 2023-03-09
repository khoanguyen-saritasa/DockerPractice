import { AppError } from 'src/models/app-error';
import { Post } from 'src/models/post';
import { createComposeActionFn } from 'src/utils/create-compose-action-fn';

export namespace PostsActions {
  const composeAction = createComposeActionFn('posts');

  export const get = composeAction('get');
  export const getSuccess = composeAction<Post[]>('getSuccess');
  export const getFailure = composeAction<AppError>('getFailure');
  export const cancelGet = composeAction('cancelGet');
}
