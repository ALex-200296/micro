import { ITableProps } from '@shared/ui/molecules/BaseTable/Table.types';
import { Table } from '@shared/ui/organisms/Table/Table.component';
import { useArgs } from '@storybook/preview-api';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { disableProps } from '../stories.data';

import {
  columnsConfig,
  propsToDisable,
  tableData,
  tableDocsActionsSection,
  tableDocsConfigsSection,
  tableDocsDataSection,
  tableDocsLooksSection,
  tableDocsSectionsSection,
  TableEntry,
} from './Docs.data';

const OnChangeSyncArgs: Decorator<ITableProps<TableEntry>> = (Story, context) => {
  const [, setArgs] = useArgs();

  return Story({
    ...context,
    args: {
      ...context.allArgs,
      onChange: (data) => {
        setArgs({
          ...context.args,
          pagination: { ...context.args.pagination, current: data.pagination.page, pageSize: data.pagination.rows },
        });
      },
    },
  });
};

const meta: Meta<typeof Table<TableEntry>> = {
  component: Table,
  title: 'Table/Документация',
  tags: ['autodocs'],
  argTypes: {
    ...disableProps(propsToDisable),
  },
  decorators: [OnChangeSyncArgs],
};

export default meta;
export type TableStory = StoryObj<typeof Table<TableEntry>>;

export const Docs: TableStory = {
  args: {
    dataSelector: () => tableData,
    columns: columnsConfig,
    rowKey: 'id',
    defaultSize: 'small',
    loading: false,
    sortDirections: ['ascend', 'descend'],
    scroll: { x: true },
    sticky: false,
    pagination: { current: 1, total: tableData.length, pageSize: 5 },
    indentSize: 15,
    bordered: false,
    showSorterTooltip: false,
    style: {},
    footer: () => 'Это footer таблицы',
    title: () => 'Это title таблицы',
    summary: () => 'Это summary таблицы',
    caption: 'Это caption таблицы',
    ghost: false,
    headerTitle: 'Это header title таблицы',
    onRow: fn(),
    onHeaderRow: fn(),
  },
  argTypes: {
    rowKey: {
      description:
        'Ключ строки в таблице. То же самое, что key в react. ' +
        'Указывается уникальное поле из получаемых в селекторе данных.',
      control: 'text',
      table: {
        type: {
          summary: 'keyof T',
        },
      },
    },
    loading: {
      description: 'Индикатор загрузки данных таблицы.',
      control: 'boolean',
    },
    formRef: {
      description: 'Ref на сущность формы',
    },
    actionRef: {
      description: 'Ref на экшены таблицы. Может быть использован для самостоятельного вызова экшенов.',
    },
    debounceTime: {
      description: 'Задержка на отправку request',
      table: {
        defaultValue: { summary: '10' },
      },
    },
    revalidateOnFocus: {
      description: 'Запускать ли валидацию при смене фокуса при type="form"',
    },
    ...tableDocsDataSection,
    ...tableDocsConfigsSection,
    ...tableDocsLooksSection,
    ...tableDocsSectionsSection,
    ...tableDocsActionsSection,
  },
};
