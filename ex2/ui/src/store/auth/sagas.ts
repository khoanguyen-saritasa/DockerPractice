import { SagaIterator } from 'redux-saga';
import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import { AppErrorMapper } from 'src/api/mappers/app-error.mapper';
import { loginMapper } from 'src/api/mappers/login.mapper';
import { AuthApi } from 'src/api/services/auth-api';
import { UserSecretStorageService } from 'src/api/services/user-secret-storage';
import { UserSecret } from 'src/models/user-secret';
import { isApiError } from 'src/utils/axios-error-guard';

import { UserActions } from '../user/dispatchers';

import { AuthActions } from './dispatchers';

/**
 * Worker saga which logs in the user.
 * @param action - Login action.
 */
function* loginUserWorker(action: ReturnType<typeof AuthActions.login>): SagaIterator {
  try {
    const userSecret: UserSecret = yield call(AuthApi.login, action.payload);
    yield call(UserSecretStorageService.save, userSecret);
    yield put(AuthActions.loginSuccess());
    yield put(UserActions.get());
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDtoWithValidationSupport(error, loginMapper);
      yield put(AuthActions.loginFailure(appError));
    }
    throw error;
  }
}

/** Worker saga which logs out the user. */
function* logoutUserWorker(): SagaIterator {
  try {
    yield call(AuthApi.logout);
    yield put(UserActions.remove());
    yield put(AuthActions.logoutSuccess());
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(AuthActions.logoutFailure(appError));
    }

    throw error;
  }
}

/** Watcher saga for auth. */
export function* authSaga(): SagaIterator {
  yield takeLatest(AuthActions.login.type, loginUserWorker);
  yield takeLatest(AuthActions.logout.type, logoutUserWorker);
}
