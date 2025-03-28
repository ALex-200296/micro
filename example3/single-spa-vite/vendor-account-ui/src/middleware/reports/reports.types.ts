import { analyticsSliceName } from '@app/store/analytics/analytics.slice';
import { catalogSliceName } from '@app/store/catalog/catalog.slice';
import { CatalogComputedPropertyState } from '@app/store/catalog/catalog.types';
import { financeSliceName } from '@app/store/finance/finance.slice';
import { FinanceComputedPropertyState } from '@app/store/finance/finance.types';
import { integrationSliceName } from '@app/store/integration/integration.slice';
import { IntegrationComputedPropertyKeyType } from '@app/store/integration/integration.types';
import { logisticsSliceName } from '@app/store/logistics/logistics.slice';
import { LogisticsComputedPropertyState } from '@app/store/logistics/logistics.types';
import { pricingSliceName } from '@app/store/pricing/pricing.slice';
import { PricingComputedPropertyState } from '@app/store/pricing/pricing.types';
import { IResponse } from '@middleware/root.types';
import { IResponseFile } from '@middleware/template/template.types';

import { IFilesWithNumState } from '../../features/common/ui/Form/FileLoadForm/FileLoadForm.types';

export interface IObjectFile {
  id: string;
  name: string;
  URL: string;
  cat: string;
  credate: string;
  file: string;
  cta_code: string;
}

export interface IReportsFilesData {
  id: string;
  state: string;
  state_desc: string;
  timecre: string;
  whencre: string;
  file_server: string;
  parameters: string;
  login: string;
  login_fio: string;
  ob_File: IObjectFile;
  ext_param?: string;
  cli_name: string;
}

export interface IReportsFiles {
  date: string;
  day: string;
  id: string;
  is_dir: boolean;
  month: string;
  name: string;
  time: string;
  url: string;
}

export interface IUuidData {
  orgName: string;
  orgInn: string;
  orgKpp: string;
  loginFio: string;
  completed: boolean;
}

export interface IGetReportsFilesActionState {
  page: number;
  rows: number;
  status?: string;
  date?: string;
  sortStatus?: string;
  sortDate?: string;
  sidx: string;
  type: number;
  computedProperty:
    | (typeof CatalogComputedPropertyState)[keyof typeof CatalogComputedPropertyState]
    | (typeof LogisticsComputedPropertyState)[keyof typeof LogisticsComputedPropertyState]
    | (typeof PricingComputedPropertyState)[keyof typeof PricingComputedPropertyState]
    | (typeof FinanceComputedPropertyState)[keyof typeof FinanceComputedPropertyState]
    | IntegrationComputedPropertyKeyType;
  sliceName:
    | typeof catalogSliceName
    | typeof logisticsSliceName
    | typeof integrationSliceName
    | typeof financeSliceName
    | typeof pricingSliceName;
}

export interface IGetReportsFilesSagaState {
  payload: IGetReportsFilesActionState;
  type: string;
}

export interface IPostTaskActionState {
  nameFile: IFilesWithNumState[];
  type: number;
  codeNotification?: number;
  oneRequest?: boolean;
  actions?: { type: string; payload?: any }[];
  pExtParam?: string;
}

export interface IGetJobUuidActionState {
  uuid: string;
}

export interface IPostTaskSagaState {
  payload: IPostTaskActionState;
  type: string;
}

export interface IResponseGetFile extends IResponse {
  data: {
    rows: IReportsFilesData[];
    records: number;
  };
}

export type SliceNameType = typeof catalogSliceName | typeof analyticsSliceName | typeof pricingSliceName;

export interface IGetReportsActionState {
  currDirCrRep?: string;
  sliceName: SliceNameType;
  computedProperty?:
    | (typeof CatalogComputedPropertyState)[keyof typeof CatalogComputedPropertyState]
    | (typeof PricingComputedPropertyState)[keyof typeof PricingComputedPropertyState];
}

export interface IReportsData {
  id: string;
  url: string;
  name: string;
  is_dir: boolean;
  month: string;
  day: string;
  time: string;
  date: string;
}

export interface IResponseGetReports extends IResponse {
  data: {
    rows: IReportsData[];
    records: number;
    total: number;
  };
}

export interface IReportsUuid extends IUuidData {
  login_fio: string;
  org_name: string;
  org_inn: string;
  org_kpp: string;
}

export interface IResponseGetJobUuid extends IResponse {
  data: {
    rows: IReportsUuid[];
  };
}

export interface IGetJobUuidSagaState {
  payload: IGetJobUuidActionState;
  type: string;
}

export interface IGetReportsSagaState {
  payload: IGetReportsActionState;
  type: string;
}

export interface IPostUuidActionState {
  uuid: string;
  files: IResponseFile[];
  action?: () => void;
}

export interface IPostUuidSagaState {
  payload: IPostUuidActionState;
  type: string;
}

export interface IResponsePostUuid extends IResponse {
  data: any;
}
