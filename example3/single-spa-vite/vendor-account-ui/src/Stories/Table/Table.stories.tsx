import React from 'react';
import { BaseTable } from '@shared/ui/molecules/BaseTable/Table.component';
import { ITableProps } from '@shared/ui/molecules/BaseTable/Table.types';
import { useArgs, useState } from '@storybook/preview-api';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { Card, Space, Typography } from 'antd';

import { getLinkToAntDesign } from '../stories.data';

import { paginationStoryTabs, storyArgs, TableEntry } from './Docs.data';
import { Docs } from './Docs.stories';
const { Link, Text, Paragraph, Title } = Typography;

const OnChangeSyncArgs: Decorator<ITableProps<TableEntry>> = (Story, context) => {
  const [, setArgs] = useArgs();

  return Story({
    ...context,
    args: {
      ...context.allArgs,
      onChange: (data) => {
        if (data.action === 'paginate') {
          setArgs({
            ...context.args,
            pagination: { ...context.args.pagination, current: data.pagination.page, pageSize: data.pagination.rows },
          });
        }
      },
    },
  });
};

const meta: Meta<typeof BaseTable<TableEntry>> = {
  ...Docs,
  title: 'Table/Table',
  decorators: [OnChangeSyncArgs],
};

export default meta;
type Story = StoryObj<typeof BaseTable<TableEntry>>;

export const Table: Story = {
  args: storyArgs,
  render: (args) => {
    const [activeTab, setActiveTab] = useState('1');
    const contentTab: Record<string, any> = {
      '1': <BaseTable {...args} pagination={{ ...args.pagination, pageSize: 1 }} />,
      '2': <BaseTable {...args} pagination={{ ...args.pagination, showQuickJumper: true, pageSize: 1 }} />,
      '3': <BaseTable {...args} pagination={{ ...args.pagination, simple: true, pageSize: 1 }} />,
      '4': <BaseTable {...args} pagination={{ ...args.pagination, size: 'small', pageSize: 1 }} />,
      '5': (
        <BaseTable
          {...args}
          pagination={{
            ...args.pagination,
            showTotal: (total) => `Всего ${total} страниц`,
            pageSize: 1,
          }}
        />
      ),
    };
    return (
      <Space direction='vertical'>
        <Card title='Обычный вид таблицы'>
          <BaseTable {...args} pagination={false} />
        </Card>
        <Card title='Вызов экшенов onChange, onRow, onHeaderRow'>
          <BaseTable
            {...args}
            onChange={(data) => {
              args.onChange?.(data);
              alert(`Вызов onChange! Сюда пришли данные: ${JSON.stringify(data)}`);
            }}
            onRow={(data) => ({ onClick: () => alert(`Вызов onRowClick! Id кликнутой строки ${data.id}`) })}
            onHeaderRow={() => ({ onClick: () => alert('Вызов onHeaderRowClick!') })}
          />
        </Card>
        <Card title='Expandable таблица'>
          <BaseTable
            {...args}
            pagination={false}
            expandable={{
              expandedRowRender: (record) => (
                <Text>
                  Раcкрываются строки, id которых кратен 2. <Text mark>Id строки {record.id}</Text>
                </Text>
              ),
              rowExpandable: (record) => !(Number(record.id) % 2),
            }}
          />
        </Card>
        <Card
          title='Варианты пагинации'
          activeTabKey={activeTab}
          onTabChange={(key) => setActiveTab(key)}
          tabList={paginationStoryTabs}
        >
          {contentTab[activeTab]}
        </Card>
        <Card title='О таблице'>
          <Paragraph>
            <Title level={5}>Отличия данного варианта таблицы от оригинального компонента Ant Design:</Title>
            <Paragraph>
              Переработан onChange. Как и в оригинальном варианте, onChange отвечает за все действия, производимые с
              таблицей, а именно: пагинация, фильтрация, сортировка. Отличие состоит в том, какой объект приходит в
              onChange (см документацию). Урезана фильтрация, нет возможности фильтровать встроенными средствами таблицы
              из заголовков колонок. Изменена пагинация, нет возможности по onChange менять pageSize таблицы.{' '}
            </Paragraph>
            <Paragraph>
              На скролл и пагинацию есть внутренне заданые дефолтные конфигурации (см документацию).
            </Paragraph>
            <Paragraph>
              Также изменен способ предоставления данных таблице - в нашем случае мы отдаем сам селектор, а не набор
              данных как в оригинале.
            </Paragraph>
            <Paragraph>
              Для настройки фильтра и пагинации рекомендуется использовать хук <Text mark>useOnTableChange</Text>.
            </Paragraph>
            <Paragraph>
              Для настройки фильтра в стобце необходимо использовать <Text mark>getColumnFilterProps</Text>.
            </Paragraph>
          </Paragraph>
        </Card>
        <Card>
          Ссылка на <Link href={getLinkToAntDesign('table')}>компонент Ant Design</Link>
        </Card>
      </Space>
    );
  },
};
