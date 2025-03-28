import { CodeInfoSearch, TermInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { infoClassAction, infoSearchAction } from '@middleware/info/info.saga';

import { IGetInfoClassSagaState } from './info.types';

export const getCode = (code: (typeof CodeInfoSearch)[keyof typeof CodeInfoSearch]) =>
  code === 'zero' ? '' : `${code}`;

export const infoSearchKeyToTerm = {
  [TermInfoSearch.bt99]: 'ВТ99',
  [TermInfoSearch.bt98]: 'ВТ98',
  [TermInfoSearch.noTerm]: '',
};

export const defaultCity = Number(process.env.VITE_APP_CITY_CODE);

export const getInfoSearchPendingRequestId = (
  type: (typeof TypeInfoSearch)[keyof typeof TypeInfoSearch],
  code: (typeof CodeInfoSearch)[keyof typeof CodeInfoSearch],
  term?: (typeof TermInfoSearch)[keyof typeof TermInfoSearch],
) => {
  const termStr = term ? `term=${term}` : '';
  return infoSearchAction.type + `?type=${type}&code=${code}` + termStr;
};

export const getInfoClassPendingRequestId = ({ code, city, id }: IGetInfoClassSagaState['payload']) => {
  const cityStr = city ? `city=${city}` : '';
  const idStr = id ? `id ${id}` : '';
  return infoClassAction.type + `?code=${code}&city=${cityStr}&id=${idStr}`;
};
