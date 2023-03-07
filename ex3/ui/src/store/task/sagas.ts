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

/**
 * Working saga that add task to group.
 * @param action - Add task to group action.
 */
function* addTaskToGroup(action: ReturnType<typeof TaskActions.addToGroup>): SagaIterator {
  try {
    yield call(TaskApi.addTaskToGroup, action.payload);
    yield put(TaskActions.addToGroupSuccess());
    yield put(TaskActions.getByGroupId(action.payload.groupId));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(TaskActions.addToGroupFailure(appError));
    }
    throw error;
  }
}

/**
 * Working saga that remove task from group.
 * @param action - Remove task from group action.
 */
function* removeTaskFromGroup(action: ReturnType<typeof TaskActions.removeFromGroup>): SagaIterator {
  try {
    yield call(TaskApi.removeTaskFromGroup, action.payload);
    yield put(TaskActions.removeFromGroupSuccess());
    yield put(TaskActions.getByGroupId(action.payload.groupId));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(TaskActions.removeFromGroupFailure(appError));
    }
    throw error;
  }
}

/** Watcher saga for user. */
export function* taskSaga(): SagaIterator {
  yield takeLatest(TaskActions.get.type, fetchTaskWorker);
  yield takeLatest(TaskActions.getByGroupId.type, fetchTaskByGroupId);
  yield takeLatest(TaskActions.removeFromGroup.type, removeTaskFromGroup);
  yield takeLatest(TaskActions.addToGroup.type, addTaskToGroup);
}
