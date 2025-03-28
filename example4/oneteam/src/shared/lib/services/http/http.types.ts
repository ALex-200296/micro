import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    requestId?: string;
  }
}

type ApiMethod = AxiosInstance[keyof Pick<
  AxiosInstance,
  'request' | 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch' | 'postForm' | 'putForm' | 'patchForm'
>];

export type ApiMethodParameters = Parameters<ApiMethod>;

export interface ApiExecutor {
  apply: <T, R = AxiosResponse<T>>(target: AxiosInstance, args: ApiMethodParameters) => Promise<R>;
}

export interface PendingRequestIdHandler {
  wait: (requestId: string) => void;
  notify: (request: string) => void;
}

export interface Response {
  status: {
    code: number;
    message: string;
  };
}

export interface ResponseError extends AxiosError<Response> {
  dataStatus: {
    code: number;
    message: string;
  };
}
