import { IResponse } from '@middleware/root.types';

export interface IClientUploadDocsPayload {
  cliUploadedCat: string;
  file?: string;
  name?: string;
  action?: () => void;
}

export interface IClientCreVendorContractPayload {
  payDelay: string;
  begDate: string;
  endDate: string;
  datePriceRegulation: string;
  dateZreq: string;
  electronicArrival: string;
  action?: (response: IClientCreVendorContractResponse) => void;
}

export interface IClientUploadDocsSagaState {
  type: string;
  payload: IClientUploadDocsPayload;
}

export interface IClientCreVendorContractSagaState {
  type: string;
  payload: IClientCreVendorContractPayload;
}

export interface IClientDocsUploadResponse extends IResponse {
  data: any;
}

export interface IClientCreVendorContractResponse extends IResponse {
  data: {
    merch_contract_name: string;
  };
}
