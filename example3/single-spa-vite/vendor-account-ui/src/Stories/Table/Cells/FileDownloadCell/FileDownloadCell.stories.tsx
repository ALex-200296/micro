import { FileDownloadCell } from '@shared/ui/organisms/Table/TableCells/FileDownloadCell.component';
import { Meta, StoryObj } from '@storybook/react';

import { FileDownloadCellArgsDescription, FileDownloadCellDescription } from './FileDownloadCell.data';

const meta: Meta<typeof FileDownloadCell> = {
  component: FileDownloadCell,
  title: 'Table/Cells/FileDownloadCell/Документация',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: FileDownloadCellDescription,
      },
    },
  },
  argTypes: FileDownloadCellArgsDescription,
};

export default meta;

type Story = StoryObj<typeof FileDownloadCell>;

export const Docs: Story = {
  args: {
    entryData: 'Пример документа.pdf',
    href: '/files/example-document.pdf',
    addDownloadAttributes: true,
    disabled: false,
    className: '',
    title: 'Скачать документ',
  },
};
