import { getCookie } from 'react-use-cookie';
import { Routes } from '@app/routes/root.types';
import { resetPendingRequests, setNotification } from '@app/store/ui/ui.slice';
import { serverError } from '@entities/common/ui/Result/Result.data';
import { ResponseError } from '@shared/lib';
import { cacheRules } from '@shared/lib/utils/helpers/cache';
import { call, put } from 'redux-saga/effects';

import { globalNavigate } from '../entities/common/ui/GlobalHistory/globalHistory';

export const resetStoreAction = { type: 'root/resetStore' };
export const api = process.env.VITE_APP_API;
export const patternErrorPage = /(4\d{2}|5\d{2}|600)\b/;
const statusesOfUnauthorizedUser = [401, 403];

export const isAuth = (status: number) => !statusesOfUnauthorizedUser.includes(status);

export const globalHandlerError = function* (error: ResponseError) {
  yield put(resetPendingRequests());
  if (!isAuth(error?.dataStatus?.code)) {
    const sId = getCookie('session-id');
    if (!sId) yield put(resetStoreAction);
    yield put(setNotification({ code: error.dataStatus.code, message: { title: error.dataStatus.message } }));
    cacheRules.clear();
    globalNavigate(Routes.Login);
    return;
  }
  if (serverError.test(`${error?.dataStatus?.code}`)) globalNavigate(`/${error?.dataStatus?.code}`);

  yield put(
    setNotification({
      code: error?.dataStatus?.code || 500,
      message: { title: error?.dataStatus?.message || 'ошибка' },
    }),
  );
};

export const safe = (saga: any, handlerError: any = null, ...args: any) =>
  function* (action: any) {
    try {
      yield call(saga, ...args, action);
    } catch (error) {
      const err = error as ResponseError;
      if (handlerError) yield call(handlerError, ...args, action, err);
      yield call(globalHandlerError, err);
    }
  };
