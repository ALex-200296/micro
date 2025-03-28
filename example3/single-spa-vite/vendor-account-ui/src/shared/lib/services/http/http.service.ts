import { AxiosInstance } from 'axios';

import { PendingRequestIdHandler } from './http.types';
import HttpClient from './HttpClient.class';

export const configureHttpClient = (lockListener: PendingRequestIdHandler) => HttpClient.create(lockListener);

export const http = (screenLock: boolean = false): AxiosInstance => HttpClient.getInstance(screenLock);
