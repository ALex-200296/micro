import { Dayjs } from 'dayjs';

export const RightToSignKey = {
  charter: 'устава',
  powerOfAttorney: 'доверенности',
  ogrnip: 'огрнип',
  recordSheet: 'листа записи',
} as const;
export const AgreementKey = {
  fioSignatory: 'fioSignatory',
  positionSignatory: 'positionSignatory',
  fioProps: 'fioProps',
  positionProps: 'positionProps',
  emailMerch: 'emailMerch',
  legalAddress: 'legalAddress',
  actualAddress: 'actualAddress',
  rightToSign: 'rightToSign',
  number: 'number',
  date: 'date',
  checkbox: 'checkbox',
} as const;

export interface IAgreementValues {
  [AgreementKey.fioSignatory]: string;
  [AgreementKey.positionSignatory]: string;
  [AgreementKey.fioProps]: string;
  [AgreementKey.positionProps]: string;
  [AgreementKey.emailMerch]: string;
  [AgreementKey.legalAddress]: string;
  [AgreementKey.actualAddress]: string;
  [AgreementKey.rightToSign]: string;
  [AgreementKey.number]: string;
  [AgreementKey.date]: Dayjs | null;
  [AgreementKey.checkbox]: boolean;
}
