import React from 'react';
import { EditableCell } from '@shared/ui/organisms/Table/TableCells/EditableCell.component';
import { Meta, StoryObj } from '@storybook/react';
import { Input } from 'antd';

import { EditableCellArgsDescription, EditableCellDescription } from './EditableCell.data';

const meta: Meta<typeof EditableCell> = {
  component: EditableCell,
  title: 'Table/Cells/EditableCell/Документация',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: EditableCellDescription,
      },
    },
  },
  argTypes: EditableCellArgsDescription,
};

export default meta;

type Story = StoryObj<typeof EditableCell>;

export const Docs: Story = {
  args: {
    editing: false,
    formItem: {
      label: 'Название',
      name: 'name',
      children: <Input />,
    },
    children: 'Текст в обычном режиме',
  },
};
