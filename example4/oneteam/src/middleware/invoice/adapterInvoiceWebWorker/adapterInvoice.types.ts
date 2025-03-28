import {
  AdapterInvoiceBoxesReturnType,
  IResponseInvoice,
  IResponseInvoiceBody,
  IResponseInvoiceBoxes,
  IResponseInvoices,
  IReturnAdapterInvoice,
  IReturnAdapterInvoiceBody,
  IReturnAdapterInvoices,
} from '@middleware/invoice/invoice.types';

export interface IAdapterInvoicesPayload {
  rows: IResponseInvoices[];
  records: number;
}
export type AdapterInvoiceType = (invoice: IResponseInvoice) => IReturnAdapterInvoice;
export type AdapterInvoiceBodyType = (invoices: IResponseInvoiceBody[]) => IReturnAdapterInvoiceBody[];
export type AdapterInvoiceBoxesType = (boxes: IResponseInvoiceBoxes[]) => AdapterInvoiceBoxesReturnType;
export type AdapterInvoicesType = (payload: IAdapterInvoicesPayload) => IReturnAdapterInvoices;
