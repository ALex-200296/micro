import React, { useState } from 'react';
import { ColumnType } from '@shared/ui/molecules/BaseTable/Table.types';
import { Editable as EditableConst, IActionsConfig } from '@shared/ui/organisms/Table/Editable/Editable.types';
import { Table } from '@shared/ui/organisms/Table/Table.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Space, Switch, Typography } from 'antd';

import { getLinkToAntDesign } from '../../stories.data';
import { tableData, TableEntry } from '../Docs.data';

import { columnsConfig, exampleObj } from './Editable.data';
const { Link, Text, Paragraph, Title } = Typography;

const meta: Meta<typeof Table.Editable<TableEntry>> = {
  component: Table.Editable,
  title: 'Table/Editable/Editable',
};

export default meta;
type Story = StoryObj<typeof Table.Editable<TableEntry>>;

const EditableTableRow = () => {
  const columns: ColumnType<TableEntry>[] = [...columnsConfig, { key: EditableConst.row }];
  return (
    <Table.Editable
      columns={columns}
      editableEntity={EditableConst.row}
      dataSelector={() => tableData}
      rowKey='id'
      size='small'
      onFinish={(values) => alert(JSON.stringify(values))}
    />
  );
};

const EditablePositionButtonGroup = () => {
  const [position, setPosition] = useState<IActionsConfig['position']>('bottom');

  const onChange = (checked: boolean) => {
    setPosition(checked ? 'top' : 'bottom');
  };
  return (
    <>
      <Switch onChange={onChange} checkedChildren='Top' unCheckedChildren='bottom' />
      <Table.Editable
        columns={columnsConfig}
        editableEntity={EditableConst.table}
        editingConfig={{ tableIsEditable: true, setTableIsEditable: () => false }}
        actionsConfig={{
          position: position,
          submitButtonProps: { children: 'Подтвердить' },
          cancelButtonProps: { children: 'Отменить' },
        }}
        dataSelector={() => tableData}
        rowKey='id'
        size='small'
        onFinish={(values) => alert(JSON.stringify(values))}
      />
    </>
  );
};

export const Editable: Story = {
  render: () => (
    <Space direction='vertical'>
      <Card title='Вид редактированной таблицы построчнно'>
        <Text>
          Для того чтобы редактирование работало построчнно в пропс columns нужно добавить колонку с операций и в
          параметр ключа передать константу Editable.ROW.
        </Text>
        <EditableTableRow />
      </Card>
      <Card title='Позиционирование кнопок'>
        <EditablePositionButtonGroup />
      </Card>
      <Card title='О таблице'>
        <Paragraph>
          <Title level={5}>Редактируемая таблица является надстройкой над общей таблицей</Title>
          <Paragraph>
            Переработан Columns. Дополнительно принимает параметр editing указывающий на редактирование ячейки и
            formItem.
          </Paragraph>
          <Paragraph>
            onFinish = Функция вызывающаяся при клике на кнопку submit, возвращает обьект ключ-значение, у которого ключ
            берется от rowKey таблицы, а значение это редактируемые поля(берется name у formItem) пример:
            <pre>{JSON.stringify(exampleObj, null, 2)}</pre>
          </Paragraph>
        </Paragraph>
      </Card>
      <Card>
        Ссылка на <Link href={getLinkToAntDesign('table')}>компонент Ant Design</Link>
      </Card>
    </Space>
  ),
};
