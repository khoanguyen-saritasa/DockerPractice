import { AppError } from 'src/models/appError';
import { Vocabulary } from 'src/models/vocabulary';
import { createComposeActionFn } from 'src/utils/createComposeAction';

export namespace VocabularyActions {
  const composeAction = createComposeActionFn('vocabulary');

  export const getByTaskId = composeAction<Vocabulary['id']>('getByTaskId');
  export const getByTaskIdSuccess = composeAction<readonly Vocabulary[]>('getByTaskIdSuccess');
  export const getByTaskIdFailure = composeAction<AppError>('getByTaskIdFailure');
}
