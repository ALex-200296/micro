import { IReturnAdapterInvoiceBody } from '@middleware/invoice/invoice.types';

export interface IProductResultsProps {
  productsData: Record<string, IReturnAdapterInvoiceBody[]>;
  boxes: string[];
}
