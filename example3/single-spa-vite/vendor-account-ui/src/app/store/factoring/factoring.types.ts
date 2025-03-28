import { IUuidData } from '@middleware/reports/reports.types';

export interface IFactoringInitialState {
  uuid: IUuidData;
}

export interface ISetUuidData {
  data: IUuidData;
}
