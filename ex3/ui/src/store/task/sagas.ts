import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AppErrorMapper } from 'src/api/mappers/appErrorMapper';
import { TaskApi } from 'src/api/services/taskApi';
import { Task } from 'src/models/task';
import { isApiError } from 'src/utils/axiosErrorGuard';

import { TaskActions } from './dispatchers';

/** Working saga that gets the tasks. */
function* fetchTaskWorker(): SagaIterator {
  try {
    const tasks: readonly Task[] = yield call(TaskApi.getTasks);
    yield put(TaskActions.getSuccess(tasks));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(TaskActions.getFailure(appError));
    }

    throw error;
  }
}

/**
 * Working saga that gets the task by group id.
 * @param action - Get tasks by group id action.
 */
function* fetchTaskByGroupId(action: ReturnType<typeof TaskActions.getByGroupId>): SagaIterator {
  try {
    const tasks: readonly Task[] = yield call(TaskApi.getTasksByGroupId, action.payload);
    yield put(TaskActions.getByGroupIdSuccess(tasks));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(TaskActions.getByGroupIdFailure(appError));
    }
    throw error;
  }
}

/** Watcher saga for user. */
export function* taskSaga(): SagaIterator {
  yield takeLatest(TaskActions.get.type, fetchTaskWorker);
  yield takeLatest(TaskActions.getByGroupId.type, fetchTaskByGroupId);
}
