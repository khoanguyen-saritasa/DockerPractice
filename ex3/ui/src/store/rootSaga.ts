import { all, call, spawn } from 'redux-saga/effects';

import { authSaga } from './auth/sagas';
import { groupSaga } from './group/sagas';
import { taskSaga } from './task/sagas';
import { userSaga } from './user/sagas';

/**
 * Root saga.
 */
export function* rootSaga() {
  const sagas = [authSaga, userSaga, groupSaga, taskSaga];

  yield all(
    sagas.map(saga =>
      spawn(function* spawnFunction() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (error: unknown) {
            console.error(error);
          }
        }
      })),
  );
}
