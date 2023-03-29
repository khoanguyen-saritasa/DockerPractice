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

/**
 * Working saga that gets the group by id.
 * @param action - Get group by id action.
 */
function* fetchGroupById(action: ReturnType<typeof GroupActions.getById>): SagaIterator {
  try {
    const group: Group = yield call(GroupApi.getGroupById, action.payload);
    yield put(GroupActions.getByIdSuccess(group));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(GroupActions.getByIdFailure(appError));
    }
    throw error;
  }
}

/**
 * Working saga that gets the group by user id.
 * @param action - Get group by user id action.
 */
function* fetchGroupByUserId(action: ReturnType<typeof GroupActions.getByUserId>): SagaIterator {
  try {
    const group: Group = yield call(GroupApi.getGroupByUserId, action.payload);
    yield put(GroupActions.getByUserIdSuccess(group));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(GroupActions.getByUserIdFailure(appError));
    }
    throw error;
  }
}

/** Watcher saga for group. */
export function* groupSaga(): SagaIterator {
  yield takeLatest(GroupActions.get.type, fetchGroupWorker);
  yield takeLatest(GroupActions.getById.type, fetchGroupById);
  yield takeLatest(GroupActions.getByUserId.type, fetchGroupByUserId);
}
