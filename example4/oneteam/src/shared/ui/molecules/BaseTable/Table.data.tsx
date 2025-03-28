import { TablePaginationConfig } from 'antd';

import { ITableProps } from './Table.types';

export const defaultScrollConfig: ITableProps<Record<string, any>>['scroll'] = {
  x: true,
};

export const defaultPaginationConfig: TablePaginationConfig = {
  defaultPageSize: 10,
  defaultCurrent: 1,
  showSizeChanger: true,
  position: ['bottomLeft'],
  size: 'default',
  pageSizeOptions: [10, 20, 30],
};

export const defaultOptionsConfig: Extract<ITableProps<Record<string, any>>['options'], object> = {
  fullScreen: true,
  density: false,
};