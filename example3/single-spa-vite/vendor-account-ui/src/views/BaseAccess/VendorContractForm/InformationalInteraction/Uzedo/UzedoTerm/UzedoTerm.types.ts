import { Dayjs } from 'dayjs';

export const UzedoTermKey = {
  UPD: 'upd',
  ACT_SERVICES: 'actServices',
  UKD: 'ukd',
  ADDITIONAL_AGREEMENTS: 'additionalAgreements',
  SPECIFICATION: 'specification',
  POWERS_ATTORNEY: 'powersAttorney',
  ACT_RECONSILIATION: 'actReconciliation',
  ACT_REPORT: 'actReport',
  ACT_DESCREPANCY: 'actDiscrepancy',
} as const;

export interface IUzedoTermValues {
  startDate: Dayjs | null;
  launchDate: Dayjs | null;
}

export interface IDataSource extends IUzedoTermValues {
  id: string[];
}

export interface IDescriptions {
  text: string;
  help?: string;
}
