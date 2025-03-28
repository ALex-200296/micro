import React from 'react';
import { useSelector } from 'react-redux';
import { ProTable, ProTableProps } from '@ant-design/pro-components';
import { IOnChangeData, isBoolean } from '@shared/lib';
import { SorterResult } from 'antd/es/table/interface';

import { defaultOptionsConfig, defaultPaginationConfig, defaultScrollConfig } from './Table.data';
import { ITableProps, typedMemo } from './Table.types';

import styles from './Table.module.scss';

export const BaseTable = typedMemo(
  <T extends Record<string, any>>({
    dataSelector,
    onChange,
    showSorterTooltip = false,
    scroll,
    pagination = false,
    defaultSize = 'small',
    bordered = true,
    search = false,
    options = false,
    columns,
    dataSource,
    defaultData,
    ...props
  }: ITableProps<T>) => {
    const tableData = (dataSelector ? useSelector(dataSelector) : defaultData || dataSource) || [];

    const handleChange: ProTableProps<T, string>['onChange'] = (pagination, filters, sorter, extra) => {
      const onChangeData: IOnChangeData = {
        action: extra.action,
        pagination: {
          page: pagination.current || 1,
          rows: pagination.pageSize || 10,
        },
        sort: {
          column: (sorter as SorterResult<T>).columnKey,
          order: (sorter as SorterResult<T>).order,
        },
        filter: filters,
      };
      onChange?.(onChangeData);
    };
    return (
      <ProTable
        search={search}
        bordered={bordered}
        dataSource={tableData}
        rootClassName={styles.table}
        onChange={handleChange}
        defaultSize={defaultSize}
        showSorterTooltip={showSorterTooltip}
        columns={columns as ProTableProps<T, any>['columns']}
        {...props}
        scroll={{
          ...defaultScrollConfig,
          ...scroll,
        }}
        pagination={
          pagination && {
            ...defaultPaginationConfig,
            ...pagination,
          }
        }
        options={
          options && {
            ...defaultOptionsConfig,
            ...(isBoolean(options) ? {} : options),
          }
        }
      />
    );
  },
);
