import React from 'react';
import { FormattedNumber } from 'react-intl';
import { OrderListsType } from '@app/store/orders/orders.types';
import { invoiceOperations } from '@middleware/invoice/invoice.types';
import { ColumnType, slashedFormat } from '@shared/ui';
import { MenuProps } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import dayjs from 'dayjs';

import OperationCell from './components/OrderCells/OperationCell.component';
import { InitialOperationStateType, OnOperationType } from './Orders.types';

import theme from '@styles/themeExports.module.scss';

export const drawerTitle = 'Отгрузка товаров (кросс-докинг)';

export const initialOperationState: Partial<InitialOperationStateType> = {
  [invoiceOperations.merchAccept]: false,
  [invoiceOperations.merchReject]: false,
  [invoiceOperations.merchShipment]: false,
  [invoiceOperations.merchSplit]: false,
  [invoiceOperations.merch1C]: false,
};

export const getOperations = (
  record: OrderListsType,
  onExpand: (expanded: boolean, record: OrderListsType, operationKey?: keyof typeof invoiceOperations) => void,
  onOperation: OnOperationType,
): MenuProps['items'] => [
  {
    key: '0',
    label: <span style={{ color: theme.primaryBlack, fontWeight: 500 }}>Обработка</span>,
    type: 'group',
    children: [
      {
        key: 'confirm',
        label: 'Подтвердить',
        disabled: !record.operations[invoiceOperations.merchAccept],
        onClick: () => onExpand(true, record, invoiceOperations.merchAccept),
      },
      {
        key: 'divide',
        label: 'Разделить',
        disabled: !record.operations[invoiceOperations.merchSplit],
        onClick: () => onExpand(true, record, invoiceOperations.merchSplit),
      },
      {
        key: 'reject',
        label: 'Отклонить',
        disabled: !record.operations[invoiceOperations.merchReject],
        onClick: () => onExpand(true, record, invoiceOperations.merchReject),
      },
      {
        key: 'send_to_1C',
        label: 'Отправить в 1С',
        disabled: !record.operations[invoiceOperations.merch1C],
        onClick: () => onExpand(true, record, invoiceOperations.merch1C),
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: '1',
    label: <span style={{ color: theme.primaryBlack, fontWeight: 500 }}>Отгрузка</span>,
    type: 'group',
    children: [
      {
        key: 'direct_delivery',
        label: 'Прямая доставка',
        disabled: !record.operations[invoiceOperations.merchShipment],
        onClick: () => onExpand(true, record, invoiceOperations.merchShipment),
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    label: <span style={{ color: theme.primaryBlack, fontWeight: 500 }}>Отгрузка кросс-докинг</span>,
    type: 'group',
    children: [
      {
        key: 'merch_kdk',
        label: 'Распределить по коробкам',
        disabled: !record.operations[invoiceOperations.merchKdk],
        onClick: () => onOperation(invoiceOperations.merchKdk, { id: record.id }),
      },
      {
        key: 'merch_printlabel',
        label: 'Сформировать этикетки',
        disabled: !record.operations[invoiceOperations.merchPrintlabel],
        onClick: () => onOperation(invoiceOperations.merchPrintlabel, { id: record.id }),
      },
      {
        key: 'merch_shipkdk',
        label: 'Отгрузить',
        disabled: !record.operations[invoiceOperations.merchShipkdk],
        onClick: () => onExpand(true, record, invoiceOperations.merchShipkdk),
      },
    ],
  },
];

export const rowKey: keyof OrderListsType = 'id';
export const ordersFilterTitle = 'Фильтр';
export const ordersTitle = 'Заказы';

export const getOrdersColumnsConfig = (
  dateSort: SortOrder,
  onExpand: (expanded: boolean, record: OrderListsType, operationKey?: keyof typeof invoiceOperations) => void,
  onOperation: OnOperationType,
): ColumnType<OrderListsType>[] => [
  {
    title: 'Номер документа',
    dataIndex: 'orderNum',
    key: 'orderNum',
    width: '25%',
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'dateSort',
    sorter: true,
    defaultSortOrder: dateSort,
    renderText: (_: unknown, row) => dayjs(row.date).format(slashedFormat),
    width: '15%',
  },
  {
    title: 'Статус',
    dataIndex: 'statusName',
    key: 'statusName',
    width: '35%',
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    key: 'sum',
    renderText: (record) => <FormattedNumber value={record} />,
    width: '10%',
  },
  {
    renderText: (_, record) => {
      const disabled: boolean = Object.values(record.operations).every((value) => !value);
      return <OperationCell disabled={disabled} menu={{ items: getOperations(record, onExpand, onOperation) }} />;
    },
    width: '10%',
  },
];
