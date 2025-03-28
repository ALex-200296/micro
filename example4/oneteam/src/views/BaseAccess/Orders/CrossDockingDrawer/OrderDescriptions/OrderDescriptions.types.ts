import { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { IOrderInvoiceBody, OrderInvoiceType, OrderListsType } from '@app/store/orders/orders.types';

interface IInvoiceData extends OrderInvoiceType {
  orderNum?: OrderListsType['orderNum'];
  id?: OrderListsType['id'];
  volume?: IOrderInvoiceBody['volume'];
  weight?: IOrderInvoiceBody['weight'];
  docNum?: IOrderInvoiceBody['docNum'];
}
export interface IOrderDescriptionsProps {
  invoice: IInvoiceData;
}

export type GetOrderDescColsType = (
  invoice: IOrderDescriptionsProps['invoice'],
) => ProDescriptionsItemProps<IOrderDescriptionsProps>[];
