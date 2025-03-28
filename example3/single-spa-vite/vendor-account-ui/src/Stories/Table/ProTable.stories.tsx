import React from 'react';
import { BaseTable } from '@shared/ui/molecules/BaseTable/Table.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Flex, Typography } from 'antd';

import { getLinkToAntDesignPro } from '../stories.data';

import { proConfigWithFormats, proTableData, storyArgs, TableEntry } from './Docs.data';
import { Docs } from './Docs.stories';
const { Link } = Typography;

const meta: Meta<typeof BaseTable<TableEntry>> = {
  ...Docs,
  title: 'Table/ProTable',
};

export default meta;
type Story = StoryObj<typeof BaseTable<TableEntry>>;

export const ProTable: Story = {
  args: { ...storyArgs, pagination: false },
  render: (args) => {
    return (
      <Flex vertical gap='middle'>
        <Card title='Встроенные форматы ячеек'>
          <BaseTable
            rowKey='id'
            dataSelector={() => proTableData}
            columns={proConfigWithFormats}
            footer={() => (
              <Flex vertical>
                <Link href={getLinkToAntDesignPro('schema#valuetype-lists')}>Остальные типы полей</Link>
                <Link href={getLinkToAntDesignPro('table?tab=api&current=1&pageSize=5#value-type-examples')}>
                  Примеры из документации
                </Link>
              </Flex>
            )}
          />
        </Card>
        <Card title='Конфигуратор таблицы'>
          <BaseTable
            {...args}
            options={{
              density: true,
              reload: () => alert('Нажали релоад'),
              search: {
                onSearch: (keyword) => {
                  alert('Поисковое значение ' + keyword);
                  return true;
                },
              },
            }}
          />
        </Card>
      </Flex>
    );
  },
};
