import { AdapterInvoiceBoxesReturnType, IReturnAdapterInvoiceBody } from '@middleware/invoice/invoice.types';
import { TransferDirection } from 'antd/es/transfer';
import { TransferKey } from 'antd/es/transfer/interface';

export type RightStateType = Record<string, IReturnAdapterInvoiceBody[]>

export interface ICrossDockingTransfer {
  data: { leftData: IReturnAdapterInvoiceBody[]; rightData: AdapterInvoiceBoxesReturnType };
  onClose: () => void;
  id: string;
  afterSubmit: () => void;
}

export type OnMoveType = (
  transferKeys: TransferKey[],
  activeBox: string,
  stateToSplit?: IReturnAdapterInvoiceBody[],
) => void;

export type OnMoveDirectionType = (
  transferKeys: TransferKey[],
  activeBox: string,
  direction?: TransferDirection,
) => void;

export type ProductsBodyType = Record<string, { linenum: number; extra2_HU: string }>;
export interface INoContents {
  noContentTextLeft: string;
  noContentTextRight: string;
}
