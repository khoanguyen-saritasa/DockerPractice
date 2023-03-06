import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AppErrorMapper } from 'src/api/mappers/appErrorMapper';
import { GroupApi } from 'src/api/services/groupApi';
import { Group } from 'src/models/group';
import { isApiError } from 'src/utils/axiosErrorGuard';

import { GroupActions } from './dispatchers';

/** Working saga that gets the current group. */
function* fetchGroupWorker(): SagaIterator {
  try {
    const groups: readonly Group[] = yield call(GroupApi.getGroups);
    yield put(GroupActions.getSuccess(groups));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(GroupActions.getFailure(appError));
    }

    throw error;
  }
}

/** Watcher saga for user. */
export function* groupSaga(): SagaIterator {
  yield takeLatest(GroupActions.get.type, fetchGroupWorker);
}
