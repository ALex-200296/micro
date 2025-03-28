import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/root.store';

import {
  CodeInfoClass,
  CodeInfoSearch,
  InfoParamsGroup,
  InfoParamsOper,
  InfoParamsType,
  TermInfoSearch,
  TypeInfoSearch,
  TypeInfoSesSearch,
} from './info.types';

const selectInfoSlice = (state: RootState) => state.info;
const selectInfoSearch = (state: RootState) => state.info.infoSearch;
const selectInfoCladrHistory = (state: RootState) => state.info.infoCladr.addressHistory;
const selectInfoClass = (state: RootState) => state.info.infoClass;

export const infoSelectors = {
  getInfoCladr: createSelector(selectInfoSlice, (infoState) => infoState.infoCladr),
  getInfoParams: (
    oper: (typeof InfoParamsOper)[keyof typeof InfoParamsOper],
    type: (typeof InfoParamsType)[keyof typeof InfoParamsType] = InfoParamsType.NO_TYPE,
    group: (typeof InfoParamsGroup)[keyof typeof InfoParamsGroup] = InfoParamsGroup.NO_GROUP,
  ) => createSelector(selectInfoSlice, (infoState) => infoState.infoParams[oper][type][group] || []),
  getInfoClient: createSelector(selectInfoSlice, (infoState) => infoState.infoClient),
  getInfoClientSubs: createSelector(selectInfoSlice, (infoState) => infoState.infoClient[0]?.subs || []),

  getInfoSearch: (
    type: (typeof TypeInfoSearch)[keyof typeof TypeInfoSearch],
    code: (typeof CodeInfoSearch)[keyof typeof CodeInfoSearch],
    term: (typeof TermInfoSearch)[keyof typeof TermInfoSearch] = TermInfoSearch.NO_TERM,
  ) => createSelector(selectInfoSearch, (infoSearchState) => infoSearchState?.[type]?.[code]?.[term] || []),

  getAddressForTag: createSelector(selectInfoCladrHistory, (infoCladrHistoryState) =>
    (Number(infoCladrHistoryState.at(-1)?.clicode) === 15
      ? infoCladrHistoryState.slice(-2)
      : [infoCladrHistoryState.at(-1)]
    )
      .map((el) => el?.value)
      .join(', '),
  ),
  getInfoClass: (code: (typeof CodeInfoClass)[keyof typeof CodeInfoClass]) =>
    createSelector(selectInfoClass, (infoClass) => infoClass[code]),
  getInfoSesSearch: (type: (typeof TypeInfoSesSearch)[keyof typeof TypeInfoSesSearch] = TypeInfoSesSearch.R_MANUF) =>
    createSelector(selectInfoSlice, (infoState) => infoState.infoSesSearch[type] || []),
};
