import React, { useState } from 'react';
import Transfer from '@features/common/ui/Transfer/Transfer.component';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { Card, TransferProps, Typography } from 'antd';
import { TransferItem } from 'antd/es/transfer';

import { disableProps } from '../stories.data';

import { mockedData, propsToDisable, TransferArgDescriptions } from './Transfer.data';
import { ILabelCount, IRecordType } from './Transfer.types';

const { Text } = Typography;

const OnChangeSyncArgs: Decorator<TransferItem> = (Story, context) => {
  const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>([]);
  const handleChange: TransferProps['onChange'] = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };
  const filterOption = (inputValue: string, option: IRecordType) =>
    option.description
      ? option.description.indexOf(inputValue) > -1 || option.title.indexOf(inputValue) > -1
      : option.title.indexOf(inputValue) > -1;
      
  return Story({
    ...context,
    args: {
      ...context.allArgs,
      showSearch: true,
      dataSource: mockedData,
      targetKeys: targetKeys,
      onChange: handleChange,
      filterOption: filterOption,
      leftTitle: <Text>Левый заголовок</Text>,
      rightTitle: <Text>Правый заголовок</Text>,
      render: (item: IRecordType) => (
        <Card>
          <p>{item.title}</p> <p>{item.description}</p>
        </Card>
      ),
      selectAllLabels: [
        ({ selectedCount, totalCount }: ILabelCount) => (
          <Text>
            {selectedCount} / {totalCount}
          </Text>
        ),
        ({ selectedCount, totalCount }: ILabelCount) => (
          <Text>
            {selectedCount} / {totalCount}
          </Text>
        ),
      ],
    },
  });
};

const meta: Meta<typeof Transfer> = {
  component: Transfer,
  title: 'Transfer/Документация',
  tags: ['autodocs'],
  decorators: [OnChangeSyncArgs],
  argTypes: {
    ...disableProps(propsToDisable),
    ...TransferArgDescriptions,
  },
};

export default meta;
type Story = StoryObj<typeof Transfer>;

export const Docs: Story = {
  render: (args) => <Transfer {...args} />,
};
