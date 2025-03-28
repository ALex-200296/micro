import { globalHandlerError } from '@middleware/root.data';
import { AnyAction } from '@reduxjs/toolkit';
import { http } from '@shared/lib/services';;
import { ResponseError } from '@services/http/http.types';
import { store } from '@store/root.store';
import { runSaga } from 'redux-saga';

import { ISagaRequest } from './makeSagaRequest.types';

export function* sagaRequest(
  url: string,
  method: 'get' | 'post' | 'put',
  params?: Record<string, string | number>,
  data?: FormData,
): Generator {
  try {
    return yield http()[method](url, { params } || data);
  } catch (error) {
    const err = error as ResponseError;
    yield globalHandlerError(err);
  }
}

const executeSaga = async (saga: any, ...args: any[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    const task = runSaga(
      {
        dispatch: (action: AnyAction) => store.dispatch(action),
        getState: store.getState,
      },
      saga,
      ...args,
    );

    task.toPromise().then(resolve).catch(reject);
  });
};

export const makeSagaRequest = async ({ url, method, params, data }: ISagaRequest): Promise<any> => {
  return executeSaga(sagaRequest, url, method, params, data);
};
