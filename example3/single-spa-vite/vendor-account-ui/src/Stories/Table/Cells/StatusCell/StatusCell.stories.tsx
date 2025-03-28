import { StatusCell } from '@shared/ui/organisms/Table/TableCells/StatusCell.component';
import { Meta, StoryObj } from '@storybook/react';

import { StatusCellArgsDescription, StatusCellDescription } from './StatusCell.data';

const meta: Meta<typeof StatusCell> = {
  component: StatusCell,
  title: 'Table/Cells/StatusCell/Документация',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: StatusCellDescription,
      },
    },
  },
  argTypes: StatusCellArgsDescription,
};

export default meta;

type Story = StoryObj<typeof StatusCell>;

export const Docs: Story = {
  args: {
    entryData: '1',
    statusDesc: 'Запланировано',
  },
};
