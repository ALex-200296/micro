import { Dayjs } from 'dayjs';

export const UzedoTermKey = {
  upd: 'upd',
  actServices: 'actServices',
  ukd: 'ukd',
  additionalAgreements: 'additionalAgreements',
  specification: 'specification',
  powersAttorney: 'powersAttorney',
  actReconciliation: 'actReconciliation',
  actReport: 'actReport',
  actDiscrepancy: 'actDiscrepancy',
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
