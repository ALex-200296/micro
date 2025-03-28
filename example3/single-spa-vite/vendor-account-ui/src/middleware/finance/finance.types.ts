import { IReconciliationData } from '@app/store/finance/finance.types';
import { IResponse } from '@middleware/root.types';

export interface IGetFinanceClientsActActionState {
  organizationCode: string;
  startDate: string;
  endDate: string;
}

export interface IPostFinanceClientsAct {
  organizationCode: string;
  startDate: string;
  endDate: string;
}

export interface IUpdateFinanceClientsAct {
  post: IPostFinanceClientsAct;
  get: IGetFinanceClientsActActionState;
}

export interface IResponseGetFinanceClientsAct extends IResponse {
  Data: IReconciliationData[];
}

export interface IResponsePostFinanceClientsAct extends IResponse {
  data: any;
}

export interface IGetFinanceClientsActSagaState {
  payload: IGetFinanceClientsActActionState;
  type: string;
}

export interface IPostFinanceClientsActSagaState {
  payload: IPostFinanceClientsAct;
  type: string;
}

export interface IUpdateFinanceClientsActSagaState {
  payload: IUpdateFinanceClientsAct;
  type: string;
}
