import { OrderListsType } from '@app/store/orders/orders.types';

export interface ICrossDockingDrawerProps
  extends Pick<OrderListsType, 'id'>,
    Partial<Pick<OrderListsType, 'orderNum'>> {
  onClose: () => void;
  afterSubmit: () => void;
}
