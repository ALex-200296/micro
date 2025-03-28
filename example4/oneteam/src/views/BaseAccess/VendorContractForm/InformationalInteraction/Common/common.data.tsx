import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { IInfoSearchState } from '@app/store/info/info.types';
import { ColumnType, DatePicker, disabledPastDate } from '@shared/ui';
import { Flex, Select, Tooltip, Typography } from 'antd';

import { dataTestId } from '../../VendorContractForm.data';

import { IDescriptions } from './common.types';

const { Text } = Typography;

export const getColumns = <T,>(
  descriptions: Record<string, IDescriptions>,
  firstColumnTitle: string,
  transferOptions: IInfoSearchState[] = [],
  isTransfer: boolean = false,
  startDateTooltipText: string,
  launchDateTooltipText: string,
): ColumnType<T & { id: string[] }>[] => [
  {
    title: firstColumnTitle,
    width: '40%',
    renderText: (_, record) => {
      const { text, help } = descriptions[record.id.at(-1) as keyof IDescriptions];
      return (
        <Flex align='center'>
          <Text>{text}</Text>
          {!!help && (
            <Tooltip title={help}>
              <QuestionCircleOutlined data-testid={`tooltip-${dataTestId}`} style={{ marginLeft: '0.3rem' }} />
            </Tooltip>
          )}
        </Flex>
      );
    },
  },
  ...(isTransfer
    ? [
        {
          title: 'Способ передачи',
          dataIndex: 'transfer',
          key: 'transfer',
          width: '20%',
          editable: true,
          formItem: {
            name: 'transfer',
            rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
            children: <Select options={transferOptions} />,
          },
        },
      ]
    : []),
  {
    title: 'Срок начала реализации работ',
    tooltip: startDateTooltipText,
    dataIndex: 'startDate',
    key: 'startDate',
    width: isTransfer ? '20%' : '30%',
    editable: true,
    formItem: {
      name: 'startDate',
      rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
      children: <DatePicker disabledDate={disabledPastDate} dataTestId={`start-${dataTestId}`} />,
    },
  },
  {
    title: 'Срок реализации (запуска)',
    tooltip: launchDateTooltipText,
    dataIndex: 'launchDate',
    width: isTransfer ? '20%' : '30%',
    key: 'launchDate',
    editable: true,
    formItem: {
      name: 'launchDate',
      rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
      children: <DatePicker disabledDate={disabledPastDate} dataTestId={`launch-${dataTestId}`} />,
    },
  },
];
