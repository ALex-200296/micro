import React from 'react';
import { FormattedNumber } from 'react-intl';
import { invoiceOperations, IReturnAdapterRowsInvoices } from '@middleware/invoice/invoice.types';
import { ColumnType,slashedFormat } from '@shared/ui';
import OperationCell from '@views/BaseAccess/Orders/components/OrderCells/OperationCell.component';
import { MenuProps } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import dayjs from 'dayjs';

export const heading = 'Акты за услуги';

export const getOperations = (
  record: IReturnAdapterRowsInvoices,
  onOption: (record: IReturnAdapterRowsInvoices, operationKey: keyof typeof invoiceOperations) => void,
): MenuProps['items'] => [
  {
    key: '0',
    label: 'Открыть акт',
    onClick: () => onOption(record, invoiceOperations.printAct),
  },
  {
    key: '1',
    label: 'Получить УПД',
    onClick: () => onOption(record, invoiceOperations.downloadUPD),
  },
];

export const getServicesColumnConfig = (
  dateSort: SortOrder,
  onOption: (record: IReturnAdapterRowsInvoices, operationKey: keyof typeof invoiceOperations) => void,
): ColumnType<IReturnAdapterRowsInvoices>[] => [
  {
    title: 'Номер документа',
    dataIndex: 'orderNum',
    key: 'orderNum',
    width: '30%',
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'dateSort',
    sorter: true,
    defaultSortOrder: dateSort,
    renderText: (_: unknown, row) => dayjs(row.date).format(slashedFormat),
    width: '20%',
  },
  {
    title: 'Статус',
    dataIndex: 'statusName',
    key: 'statusName',
    width: '20%',
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    key: 'sum',
    renderText: (record) => <FormattedNumber value={record} />,
    width: '20%',
  },
  {
    renderText: (_, record) => <OperationCell menu={{ items: getOperations(record, onOption) }} />,
    width: '10%',
  },
];
