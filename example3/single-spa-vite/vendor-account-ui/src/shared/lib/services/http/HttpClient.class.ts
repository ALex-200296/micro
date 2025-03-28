import { createId } from '@shared/lib/utils/helpers/string.helpers';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { getInterceptorRequest, getInterceptorResponse } from './http.data';
import { ApiExecutor, ApiMethodParameters, PendingRequestIdHandler } from './http.types';

export default class HttpClient {
  private static INSTANCE: HttpClient;
  private static CONFIG_INDEX: Map<keyof AxiosInstance, number> = new Map([
    ['request', 0],
    ['get', 1],
    ['delete', 1],
    ['head', 1],
    ['options', 1],
    ['post', 2],
    ['put', 2],
    ['patch', 2],
    ['postForm', 2],
    ['putForm', 2],
    ['patchForm', 2],
  ]);

  private readonly coreClient: AxiosInstance;
  private readonly lockingClient: AxiosInstance;

  public static create(requestIdHandler: PendingRequestIdHandler) {
    if (!HttpClient.INSTANCE) {
      const instance = (HttpClient.INSTANCE = new HttpClient());

      instance.lockingClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        const { requestId } = config;
        if (requestId !== void 0) {
          requestIdHandler.wait(requestId);
        }
        return config;
      });

      const release = (config: InternalAxiosRequestConfig) => {
        if (config?.requestId !== void 0) {
          requestIdHandler.notify(config?.requestId);
        }
      };
      instance.lockingClient.interceptors.response.use(
        (response: AxiosResponse) => {
          release(response.config);
          return response;
        },
        (error) => {
          release(error.config);
          return Promise.reject(error);
        },
      );
    }
  }

  public static getInstance(applyingLock: boolean) {
    const instance = HttpClient.INSTANCE;
    return applyingLock ? instance.lockingClient : instance.coreClient;
  }

  private constructor() {
    this.coreClient = axios.create();
    const { onFulfilled: onFulfilledRequest } = getInterceptorRequest();
    const { onFulfilled: onFulfilledResponse, onRejected } = getInterceptorResponse();

    this.coreClient.interceptors.request.use(onFulfilledRequest);
    this.coreClient.interceptors.response.use(onFulfilledResponse, onRejected);

    this.lockingClient = new Proxy(this.coreClient, {
      get(target: AxiosInstance, propKey: keyof AxiosInstance) {
        const origin = target[propKey];
        return HttpClient.CONFIG_INDEX.has(propKey)
          ? function (...args: any[]) {
              const argIndexConfig = HttpClient.CONFIG_INDEX.get(propKey)!;
              const config = args[argIndexConfig] ?? ({} as AxiosRequestConfig);
              if (config.requestId === void 0) {
                config.requestId = createId();
                args[argIndexConfig] = config;
              }
              const httpFn = origin as ApiExecutor;
              return httpFn.apply(target, args as ApiMethodParameters);
            }
          : origin;
      },
    });
  }
}
