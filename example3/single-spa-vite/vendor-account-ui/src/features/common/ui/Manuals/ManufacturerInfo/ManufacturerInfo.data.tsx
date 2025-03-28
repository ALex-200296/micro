import React from 'react';
import { IUserManufsState } from '@app/store/user/user.types';
import { ColumnType } from '@shared/ui';
import { Typography } from 'antd';
const { Paragraph } = Typography;

export const manufacturerColumnsConfig: ColumnType<IUserManufsState>[] = [
  {
    title: 'Код',
    dataIndex: 'code',
    align: 'left',
    renderText: (cell) => (
      <Paragraph
        copyable
        style={{ display: 'flex', flexDirection: 'row-reverse', marginBottom: 0, width: 'fit-content' }}
      >
        {cell}
      </Paragraph>
    ),
  },
  {
    title: 'Производитель',
    dataIndex: 'name',
    align: 'left',
  },
];
