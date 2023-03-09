import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AppErrorMapper } from 'src/api/mappers/appErrorMapper';
import { VocabularyApi } from 'src/api/services/vocabularyApi';
import { Vocabulary } from 'src/models/vocabulary';
import { isApiError } from 'src/utils/axiosErrorGuard';

import { VocabularyActions } from './dispatchers';

/**
 * Working saga that gets the vocabularies by task id.
 * @param action - Get vocabularies by task id action.
 */
function* fetchVocabularyByGroupId(action: ReturnType<typeof VocabularyActions.getByTaskId>): SagaIterator {
  try {
    const vocabularies: readonly Vocabulary[] = yield call(VocabularyApi.getVocabulariesByTaskId, action.payload);
    yield put(VocabularyActions.getByTaskIdSuccess(vocabularies));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(VocabularyActions.getByTaskIdFailure(appError));
    }
    throw error;
  }
}

/** Watcher saga for vocabulary. */
export function* vocabularySaga(): SagaIterator {
  yield takeLatest(VocabularyActions.getByTaskId.type, fetchVocabularyByGroupId);
}
