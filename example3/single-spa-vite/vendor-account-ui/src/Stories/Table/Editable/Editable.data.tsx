import React from 'react';
import { ColumnType } from '@shared/ui/molecules/BaseTable/Table.types';
import { Input } from 'antd';

import { TableEntry } from '../Docs.data';

export const tableActionsConfigType =
  'position: boolean;\n' +
  'submitButtonProps: GetVariantButtonProps;\n' +
  'cancelButtonProps: GetVariantButtonProps;\n\n' +
  'GetVariantButtonProps: {\n' +
  '  icon: React.node;\n' +
  '  disabled: boolean;\n' +
  '  primary: boolean;\n' +
  '  children: React.node;\n' +
  '  onClick: () => void;\n' +
  '};';

export const exampleObj = {
  rowKey: {
    name: 'Алексей',
    address: 'Владимирская 12к2',
  },
};

export const tableEditingConfigType = 'tableIsEditable: boolean;\n,' + 'setTableIsEditable: () => void;\n' + '};';

export const propsToDisable = ['rowKey', 'size', 'loading'];

export const columnsConfig: ColumnType<TableEntry>[] = [
  {
    title: '№',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => Number(a.id) - Number(b.id),
    defaultSortOrder: 'ascend',
  },
  {
    title: 'ФИО',
    dataIndex: 'name',
    key: 'name',
    editable: true,
    formItem: {
      name: 'name',
      children: <Input />,
    },
  },
  {
    title: 'Возраст',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => Number(a.age) - Number(b.age),
  },
  {
    title: 'Эл. почта',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: 'address',
    editable: true,
    formItem: {
      name: 'address',
      rules: [{ required: true, message: '' }],
      children: <Input />,
    },
  },
];
