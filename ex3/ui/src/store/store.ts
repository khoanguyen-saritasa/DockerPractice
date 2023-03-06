import {
  configureStore, createImmutableStateInvariantMiddleware,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { authSlice } from './auth/slice';
import { groupSlide } from './group/slice';
import { rootSaga } from './rootSaga';
import { taskSlide } from './task/slice';
import { userSlice } from './user/slice';

const sagaMiddleware = createSagaMiddleware();
const immutableStateInvariantMiddleware = createImmutableStateInvariantMiddleware();

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    group: groupSlide.reducer,
    task: taskSlide.reducer,
  },
  middleware: [
    sagaMiddleware,
    immutableStateInvariantMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
