import { IResponseVendorClient } from '@middleware/user/user.types';
import { IVendorClientInfo } from '@store/user/user.types';
import { EasyWebWorkerBody } from 'easy-web-worker';

import {
  AdapterUserClientsType,
  AdapterUserDataType,
  IAdapterUserDataPayload,
  IAdapterUserReturnData,
} from './adapterUser.types';

export const adapterUserWebWorker: EasyWebWorkerBody = ({ onMessage }) => {
  const paramsGenerator = (params: [string, any][]) => Object.fromEntries(params.filter((items) => items[1]));
  const initialUserState = {
    city: '',
    login: '',
    manufs: [],
    org_id: '',
    clicode: '',
    login_type: '',
  };
  const initialUserProfileState = {
    fio: '',
    ofic: '',
    email: '',
    phone: '',
    mancode: '',
    manager: '',
    cliName: '',
    lastname: '',
    firstname: '',
    parentname: '',
    exw_positionName: '',
    firms: [],
    users_lkp: [],
    ArrManagerKuCp: [],
    ArrEmployeeIvp: [],
    ArrManagerKuRc: [],
  };
  const initialContractsInfoState = {
    OrgInn: '',
    OrgKpp: '',
    OrgCkg: '',
    OrgCode: '',
    OrgName: '',
    OrgCkgCode: '',
    ContractsVendors: [],
  };

  const adapterUserData: AdapterUserDataType = ({ userData, profileInfo, contractsInfo }) => {
    const { rights, ...userDataRest } = userData;

    return {
      isAuth: true,
      error: false,
      userData: {
        ...initialUserState,
        ...paramsGenerator(Object.entries({ ...userDataRest })),
        rights: userDataRest.login_type !== 'WI' ? rights : null,
      },
      profileInfo: { ...initialUserProfileState, ...paramsGenerator(Object.entries(profileInfo)) },
      contractsInfo: { ...initialContractsInfoState, ...paramsGenerator(Object.entries(contractsInfo)) },
    };
  };

  const vendorClientsAdapter: AdapterUserClientsType = (clients) =>
    clients.map(({ id, cli_code, cli_name }) => ({ id, clientName: cli_name, clientCode: cli_code }));

  onMessage<IAdapterUserDataPayload, IAdapterUserReturnData>('userData', (message) => {
    const { payload } = message;
    const adaptedFilesData = adapterUserData(payload);
    message.resolve(adaptedFilesData);
  });

  onMessage<IResponseVendorClient[], IVendorClientInfo[]>('vendorClients', (message) => {
    const { payload } = message;
    const adaptedVendorClients = vendorClientsAdapter(payload);
    message.resolve(adaptedVendorClients);
  });
};
