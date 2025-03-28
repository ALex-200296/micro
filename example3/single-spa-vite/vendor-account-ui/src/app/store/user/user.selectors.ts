import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/root.store';

import { IContractsPreviewData, UsersLkpAccess } from './user.types';

const selectUserSlice = (state: RootState) => state.user;

const selectUserData = (state: RootState) => state.user.user;
const selectUserProfile = (state: RootState) => state.user.userProfile;
const selectContracts = (state: RootState) => state.user.contractsInfo.ContractsVendors;

export const userSelectors = {
  getUserSliceData: createSelector(selectUserSlice, (userState) => userState),
  getUserProfile: createSelector(selectUserSlice, (userState) => userState.userProfile),
  getUserData: createSelector(selectUserSlice, (userState) => userState.user),
  getUserContracts: createSelector(selectUserSlice, (userState) => userState.contractsInfo),
  getUserCompanyInfo: createSelector(selectUserSlice, (userState) => ({
    ...userState.contractsInfo,
    manufs: userState.user.manufs,
  })),
  getUserIsAuth: createSelector(selectUserSlice, (userState) => userState.isAuth),
  getUserDostupOneTeam: createSelector(selectUserSlice, (userState) => !!userState.user.rights?.dostuplkp),
  getUserError: createSelector(selectUserSlice, (userState) => userState.error),
  getVendorClients: createSelector(selectUserSlice, (userState) => userState.clients),

  getContractsPreviewData: createSelector(selectContracts, (userContractsState) =>
    userContractsState.map(
      (contract): IContractsPreviewData => ({
        contractNumber: contract.ContractNumber,
        dates: `${contract.BeginDate} - ${contract.EndDate}`,
        edo: contract.EDO,
      }),
    ),
  ),
  getContractById: (id: string | null) =>
    createSelector(selectContracts, (userContractsState) =>
      userContractsState.find((contract) => id === contract.ContractNumber),
    ),

  getUserOrgId: createSelector(selectUserData, (userDataState) => userDataState.org_id),
  getUserRights: createSelector(selectUserData, (userDataState) => ({
    rights: userDataState.rights,
  })),
  getRightCreateMeeting: createSelector(selectUserData, (userDataState) =>
    userDataState.rights ? userDataState.rights.createtaskoneteam : null,
  ),
  getProtectionForDesign: createSelector(selectUserData, (userDataState) =>
    userDataState.rights ? userDataState.rights.prosmpr || userDataState.rights.prosmresh : null,
  ),
  getProtectionForFinance: createSelector(selectUserData, (userDataState) =>
    userDataState.rights ? userDataState.rights.dostupfinrazd : null,
  ),
  getManufacturerCode: createSelector(selectUserData, (userDataState) => userDataState.manufs[0]?.code),
  getManufacturerData: createSelector(selectUserData, (userDataState) => userDataState.manufs),
  getUserInfoManager: createSelector([selectUserData, selectUserProfile], (userDataState, userProfileState) => ({
    cliCode: userDataState.clicode,
    lpr: userDataState.rights?.lpr,
    ofic: userProfileState.ofic,
    manCode: userProfileState.mancode,
    arrManagerKuCp: userProfileState.ArrManagerKuCp,
    arrEmployeeIvp: userProfileState.ArrEmployeeIvp,
  })),

  getUsersLkp: createSelector(selectUserProfile, (userProfileState) => userProfileState.users_lkp),
  getUserLkpAccess: createSelector(
    selectUserProfile,
    (userProfileState) => userProfileState.users_lkp[0].access !== UsersLkpAccess.JUN,
  ),
  getCalendarFilterData: createSelector(selectUserProfile, (userProfileState) => [
    { fio: userProfileState.manager, code: userProfileState.mancode },
    ...userProfileState.ArrManagerKuCp.map((manager) => ({ fio: manager.ManagerFIO, code: manager.ManagerCode })),
    ...userProfileState.ArrEmployeeIvp.map((manager) => ({ fio: manager.ManagerFIO, code: manager.ManagerCode })),
    ...userProfileState.ArrManagerKuRc.map((manager) => ({ fio: manager.ManagerFIO, code: manager.ManagerCode })),
  ]),
  getUserProfileOrganizationCode: createSelector(
    selectUserProfile,
    (userProfileState) => userProfileState.firms[0].code,
  ),
  getUserOrganizations: createSelector(selectUserProfile, (userProfileState) => userProfileState.firms),
};
