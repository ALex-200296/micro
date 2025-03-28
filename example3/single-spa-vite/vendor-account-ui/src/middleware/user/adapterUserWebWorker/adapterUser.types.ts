import { IResponseVendorClient } from '@middleware/user/user.types';
import { IContractsInfo, IUserProfile, IUserState, IVendorClientInfo } from '@store/user/user.types';

export interface IAdapterUserDataPayload {
  userData: IUserState;
  profileInfo: IUserProfile;
  contractsInfo: IContractsInfo;
}

export interface IAdapterUserReturnData {
  userData: IUserState;
  profileInfo: IUserProfile;
  contractsInfo: IContractsInfo;
  isAuth: boolean;
  error: boolean;
}

export type AdapterUserDataType = (payload: IAdapterUserDataPayload) => IAdapterUserReturnData;
export type AdapterUserClientsType = (clients: IResponseVendorClient[]) => IVendorClientInfo[];
