import { IReturnAdapterInvoiceBody } from '@middleware/invoice/invoice.types';
import { TransferDirection } from 'antd/es/transfer';
import { TransferKey } from 'antd/es/transfer/interface';

export interface ITransferCard {
  item: IReturnAdapterInvoiceBody;
  listSelectedKeys: React.Key[];
  onItemSelect: (key: TransferKey, check: boolean, e?: React.MouseEvent<Element, MouseEvent>) => void;
  selectedKeys: string[];
  activeBoxNumber: number;
  direction: TransferDirection;
  onFinishProductDivision: (item: IReturnAdapterInvoiceBody, count: number, direction: TransferDirection) => void;
}
