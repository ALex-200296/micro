import React from 'react';
import { Button } from '@shared/ui/atoms/Button/Button.component';
import { ColumnType, ITableProps } from '@shared/ui/molecules/BaseTable/Table.types';
import { Editable } from '@shared/ui/organisms/Table/Editable/Editable.types';
import { Table } from '@shared/ui/organisms/Table/Table.component';
import { useState } from '@storybook/preview-api';
import type { Decorator, Meta, StoryObj } from '@storybook/react';

import { dataTestId, disableProps } from '../../stories.data';
import { tableData, TableEntry } from '../Docs.data';

import { columnsConfig, propsToDisable, tableActionsConfigType, tableEditingConfigType } from './Editable.data';

const OnChangeSyncArgs: Decorator<ITableProps<TableEntry>> = (Story, context) => {
  const [open, setOpen] = useState(false);
  const columns: ColumnType<TableEntry>[] = [
    ...columnsConfig,
    ...(!open
      ? [
          {
            key: 'operation',
            title: 'Операция',
            render: () => {
              return (
                <Button dataTestId={`editable-table-${dataTestId} `} onClick={() => setOpen(true)}>
                  Открыть редактирование
                </Button>
              );
            },
          },
        ]
      : []),
  ];
  return Story({
    ...context,
    args: {
      ...context.allArgs,
      columns,
      editingConfig: {
        tableIsEditable: open,
        setTableIsEditable: () => setOpen(false),
      },
      onFinish: (values: any) => {
        alert(JSON.stringify(values));
      },
    },
  });
};

const meta: Meta<typeof Table.Editable<TableEntry>> = {
  component: Table.Editable,
  title: 'Table/Editable/Документация',
  tags: ['autodocs'],
  argTypes: {
    ...disableProps(propsToDisable),
  },
};

export default meta;
type Story = StoryObj<typeof Table.Editable<TableEntry>>;

export const Docs: Story = {
  args: {
    dataSelector: () => tableData,
    editableEntity: Editable.TABLE,
    actionsConfig: {
      position: 'bottom',
      submitButtonProps: { children: 'Подтвердить' },
      cancelButtonProps: { children: 'Отменить' },
    },
    rowKey: 'id',
    size: 'small',
    loading: false,
  },
  argTypes: {
    dataSelector: {
      table: {
        type: { summary: '(state: RootState) => readonly T[]' },
      },
      description:
        'Селектор данных для таблицы. ' +
        'Таблице отдается селектор и уже далее, в самом компоненте, данные достаются и отображаются.',
    },
    editableEntity: {
      description: 'Свойство, определяющее вид редактирования таблицы - построчно или вся таблица целиком.',
      table: {
        type: { summary: 'Editable.TABLE | Editable.ROW' },
      },
    },
    actionsConfig: {
      table: {
        type: {
          summary: 'ActionsConfig',
          detail: tableActionsConfigType,
        },
      },
      description:
        'Конфигурация кнопок(отменить и принять). Обязательный только при использвании редактировании всей таблицы',
    },
    editingConfig: {
      description: 'Конфигурация состояния таблицы. Обязательный только при использвании редактировании всей таблицы',
      table: {
        type: {
          summary: 'EditingConfig',
          detail: tableEditingConfigType,
        },
      },
    },
    onFinish: {
      description: 'Фунцкция, вызывающая при нажатии на кнопку применить',
      table: {
        type: {
          summary: '(values:Record<string, object>) => void',
        },
      },
    },
    formInstance: {
      description: 'Используется для управления редактируемыми строками в таблице',
    },
    preserve: {
      description:
        'Управление поведением редактируемых ячеек при переходе между строками (возможность редактировать ту же ячейку при переходе) ',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
  },
  decorators: [OnChangeSyncArgs],
};
