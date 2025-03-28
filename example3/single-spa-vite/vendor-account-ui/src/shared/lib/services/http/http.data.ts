import { getCookie } from 'react-use-cookie';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { Response } from './http.types';

const errorStatusesRegexp = /[4-5]\d{2}/;

export const isResponseError = (dataStatus?: number | null) => dataStatus && errorStatusesRegexp.test(`${dataStatus}`);

export const getDataStatus = (code: number, message: string) => ({ code, message });

export const getInterceptorResponse = () => ({
  onFulfilled: (response: AxiosResponse<Response>) => {
    if (isResponseError(response.data.status?.code)) {
      return Promise.reject({
        ...response,
        dataStatus: getDataStatus(response.data.status?.code, response.data.status?.message),
      });
    }
    return response;
  },
  onRejected: (error: AxiosError<Response>) => {
    return Promise.reject({
      ...error,
      dataStatus: getDataStatus(error.response!.status, error.response!.statusText),
    });
  },
});

export const getInterceptorRequest = () => ({
  onFulfilled: (config: InternalAxiosRequestConfig) => {
    const sId = getCookie('session-id');
    if (config.headers && sId) {
      config.headers['Session-id'] = sId;
    }
    return config;
  },
});
