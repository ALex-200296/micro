import { Dayjs } from 'dayjs';

export const RightToSignKey = {
  CHARTER: 'устава',
  POWER_OF_ATTORNEY: 'доверенности',
  OGRN_IP: 'огрнип',
  RECORD_SHEET: 'листа записи',
} as const;

export const AgreementKey = {
  FIO_SAGNATORY: 'fioSignatory',
  PISITION_SIGNATORY: 'positionSignatory',
  FIO_PROPS: 'fioProps',
  POSITION_PROPS: 'positionProps',
  EMAIL_MERCH: 'emailMerch',
  LEGAL_ADDRESS: 'legalAddress',
  ACTUAL_ADDRESS: 'actualAddress',
  RIGHT_TO_SIGN: 'rightToSign',
  NUMBER: 'number',
  DATE: 'date',
  CHECKBOX: 'checkbox',
} as const;

export interface IAgreementValues {
  [AgreementKey.FIO_SAGNATORY]: string;
  [AgreementKey.PISITION_SIGNATORY]: string;
  [AgreementKey.FIO_PROPS]: string;
  [AgreementKey.POSITION_PROPS]: string;
  [AgreementKey.EMAIL_MERCH]: string;
  [AgreementKey.LEGAL_ADDRESS]: string;
  [AgreementKey.ACTUAL_ADDRESS]: string;
  [AgreementKey.RIGHT_TO_SIGN]: string;
  [AgreementKey.NUMBER]: string;
  [AgreementKey.DATE]: Dayjs | null;
  [AgreementKey.CHECKBOX]: boolean;
}
