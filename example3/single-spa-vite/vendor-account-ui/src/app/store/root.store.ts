import rootSaga from '@middleware/root.saga';
import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer, RootStateReducers } from './root.reducer';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

sagaMiddleware.run(rootSaga);

export type RootState = RootStateReducers;
export type AppDispatch = typeof store.dispatch;
