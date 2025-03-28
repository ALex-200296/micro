import { UploadResultsCell } from '@shared/ui/organisms/Table/TableCells/UploadResultsCell.component';
import { Meta, StoryObj } from '@storybook/react';

import { UploadCellArgsDescription, UploadCellDescription, UploadCellMockResult } from './UploadResultsCell.data';

const meta: Meta<typeof UploadResultsCell> = {
  component: UploadResultsCell,
  title: 'Table/Cells/UploadResultsCell/Документация',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: UploadCellDescription,
      },
    },
  },
  argTypes: UploadCellArgsDescription,
};

export default meta;

type Story = StoryObj<typeof UploadResultsCell>;

export const Docs: Story = {
  args: {
    results: UploadCellMockResult,
  },
};
