import { financeSliceName } from '@app/store/finance/finance.slice';
import { ordersSliceName } from '@app/store/orders/orders.slice';
import { formDataGenerator } from '@shared/lib/utils/helpers/formDataGenerator.helpers';
import { slashedFormat } from '@shared/ui/atoms/Inputs/DatePicker/DatePicker.formats';
import dayjs from 'dayjs';

import { IInvoiceBodyParams, InvoiceOperations, InvoiceProcedure, IReturnAdapterInvoiceBody } from './invoice.types';

export const invoiceDownloadFilePath = '/ns2000/print/';

export const actionTypeForInvoices: Record<typeof ordersSliceName | typeof financeSliceName, string> = {
  [financeSliceName]: `${financeSliceName}/setServicesActsList`,
  [ordersSliceName]: `${ordersSliceName}/setOrderLists`,
};

export const actionTypeForInvoice: Record<typeof ordersSliceName, string> = {
  [ordersSliceName]: `${ordersSliceName}/setOrderInvoice`,
};

export const actionTypeForInvoiceBody: Record<typeof ordersSliceName, string> = {
  [ordersSliceName]: `${ordersSliceName}/setOrderInvoiceBody`,
};

export const getInvoiceBody = (
  body: unknown,
  procedure: (typeof InvoiceProcedure)[keyof typeof InvoiceProcedure],
  datalist?: IReturnAdapterInvoiceBody[],
  email?: string,
) => {
  switch (procedure) {
    case InvoiceProcedure[InvoiceOperations.MERCH_ACCEPT]: {
      const lines = Object.entries(body as IInvoiceBodyParams[typeof procedure]).map(([key, value]) => ({
        linenum: key,
        extra2_MerchDate: dayjs(value.supplierDate).format(slashedFormat),
      }));
      return JSON.stringify({ lines: lines });
    }
    case InvoiceProcedure[InvoiceOperations.MERCH_REJECT]: {
      const lines = Object.entries(body as IInvoiceBodyParams[typeof procedure]).map(([key, value]) => ({
        linenum: key,
        extra2_MerchDate: dayjs(value.supplierDate).format(slashedFormat),
        extra2_Rejection: value.rejectionReason,
        extra2_Comment: value.comment,
      }));
      return JSON.stringify({ lines: lines });
    }
    case InvoiceProcedure[InvoiceOperations.MERCH_1C]:
      return formDataGenerator([['mail', email]]);
    case InvoiceProcedure[InvoiceOperations.MERCH_SPLIT]:
      return datalist
        ? formDataGenerator([
            [
              'gds',
              Object.entries(body as IInvoiceBodyParams[typeof procedure])
                .map(([key]) => {
                  const rowInfo = datalist.find(({ lineNum }) => lineNum === +key);
                  return `${rowInfo?.id};${rowInfo?.productCount}`;
                })
                .join(';'),
            ],
          ])
        : null;
    case InvoiceProcedure[InvoiceOperations.UPDATE_CDK]:
      return JSON.stringify({ lines: body });
    default:
      return null;
  }
};

export const blobConfig = [
  {},
  {
    responseType: 'blob',
    headers: {
      Accept: 'application/pdf',
    },
  },
];
