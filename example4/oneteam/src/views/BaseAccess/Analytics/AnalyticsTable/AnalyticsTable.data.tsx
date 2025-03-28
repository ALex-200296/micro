import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { IReportsData } from '@middleware/reports/reports.types';
import { ColumnType, FileDownloadCell } from '@shared/ui';

export const getCellName = (name: string): string | JSX.Element =>
  'Наверх ..' === name ? <ArrowLeftOutlined /> : name;
const outputRow = (cellContent: string): string => cellContent || '-';

export const getAnalyticsTableConfig = (handleChangeReportsUrl: (url: string) => void): ColumnType<IReportsData>[] => [
  {
    title: 'Дата',
    key: 'date',
    width: '10%',
    renderText: (_: unknown, row) => outputRow(row.date),
  },
  {
    title: 'Название',
    key: 'name',
    renderText: (_: unknown, row) =>
      row.is_dir ? (
        <FileDownloadCell
          onClick={(event) => {
            event?.preventDefault();
            handleChangeReportsUrl(row.url);
          }}
          entryData={getCellName(row.name)}
        />
      ) : (
        <FileDownloadCell href={row.url} addDownloadAttributes entryData={row.name} />
      ),
  },
];
