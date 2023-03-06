import { all, call, spawn } from 'redux-saga/effects';

import { authSaga } from './auth/sagas';
import { groupSaga } from './group/sagas';
import { userSaga } from './user/sagas';

/**
 * Root saga.
 */
export function* rootSaga() {
  const sagas = [authSaga, userSaga, groupSaga];

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
