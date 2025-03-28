import { NavigateFunction } from 'react-router-dom';
import { IContractsInfo, IUserProfile, IUserState } from '@app/store/user/user.types';
import { IResponse } from '@middleware/root.types';

export const LoginType = {
  WI: 'WI',
} as const;
export interface IPostUserActionState {
  login: string;
  password: string;
  action?: () => void;
}

export interface IPostUserSagaState {
  payload: IPostUserActionState;
  type: string;
}

export interface ILogoutUserActionState {
  navigate: NavigateFunction;
}

export interface ILogoutUserSagaState {
  payload: ILogoutUserActionState;
  type: string;
}

export interface IResponsePostUserLogin extends IResponse {
  data: IUserState;
}
export interface IResponseGetUserLogin extends IResponse {
  data: IUserState;
}

export interface IResponseGetUserProfile extends IResponse {
  data: IUserProfile;
}

export interface IResponseGetUserContracts extends IResponse {
  data: IContractsInfo;
}

export interface IResponseVendorClient {
  id: string;
  cli_code: string;
  cli_name: string;
}
export interface IResponseGetVendorClients extends IResponse {
  data: {
    rows: Array<IResponseVendorClient>;
  };
}
