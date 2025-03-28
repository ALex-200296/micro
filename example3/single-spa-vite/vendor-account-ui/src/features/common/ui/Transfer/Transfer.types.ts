import { TransferProps } from 'antd';
import { TransferItem } from 'antd/es/transfer';

export interface IAdditionalTransferComponentProps<T> extends TransferProps<T> {
  leftTitle?: React.ReactNode;
  rightTitle?: React.ReactNode;
  noContentTextLeft?: React.ReactNode;
  noContentTextRight?: React.ReactNode;
  targetKeys: React.Key[];
  searchPlaceholder?: string;
}

type SelectedKeysType = string[] | number[];

interface ICheckboxBaseProps {
  hideDefaultItemCheckbox: boolean;
  selectedKeys: SelectedKeysType;
  onSelectChange: TransferProps['onSelectChange'];
}

interface ICheckboxRequiredProps extends ICheckboxBaseProps {
  hideDefaultItemCheckbox: true;
}

interface ICheckboxOptionalProps extends Partial<ICheckboxBaseProps> {
  hideDefaultItemCheckbox?: false;
}

export type ITransferComponentProps<T extends TransferItem> = IAdditionalTransferComponentProps<T> &
  (ICheckboxRequiredProps | ICheckboxOptionalProps);
