import React from 'react';
import { Loading3QuartersOutlined as LoadingIcon } from '@ant-design/icons';
import { IInfoSearchState, ITreeInfoParams } from '@app/store/info/info.types';
import { FiltersFormItemsType } from '@entities/common/ui';
import { getCalendarTaskAction } from '@middleware/calendar/calendar.saga';
import { IObjectFile, IReportsFilesData } from '@middleware/reports/reports.types';
import {
  ColumnType,
  dashedFormat,
  DatePicker,
  DateRangePicker,
  FileDownloadCell,
  ShowTaskCell,
  StatusCell,
  UploadResultsCell,
} from '@shared/ui';
import { ReportsFilter } from '@store/root.types';
import { Flex, Input, Select, TreeSelect, Typography } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import dayjs from 'dayjs';

import { FilterLabels, InvoiceFilters, IReportsFilterConfig } from './BaseAccessPage.types';

import styles from './BaseAccessPage.module.scss';

const { Text } = Typography;

export const dataTestId = 'filter-form';
const { SHOW_PARENT } = TreeSelect;
export const docsPath = import.meta.env.VITE_APP_LINK_TO_DOCS;
export const msDelayWorkerInterval: number = 25000;

export const manualsDrawerTitle = 'Документация ЭТМ';
export const filtersDrawerTitle = 'Фильтр';

export const lastMonthDate = () => {
  return dayjs(`${dayjs().year()}-${dayjs().month()}-${dayjs().date()}`).format(dashedFormat);
};

export const getUploadedTaskFiles = (data: IObjectFile[]): IObjectFile[] | undefined =>
  data?.filter((file) => file.cta_code === '0');

export const getUploadResults = (data: IObjectFile[]): IObjectFile[] => data?.filter((file) => file.cta_code !== '0');

export const getFilterFormItems = (statusMenuList: IInfoSearchState[]): FiltersFormItemsType => {
  return [
    {
      name: 'date',
      label: FilterLabels[ReportsFilter.DATE],
      labelType: 'float',
      children: <DatePicker allowClear={false} dataTestId={dataTestId} />,
    },
    {
      name: 'status',
      label: FilterLabels[ReportsFilter.STATUS],
      labelType: 'float',
      children: <Select options={statusMenuList} fieldNames={{ value: 'code' }} allowClear />,
    },
  ];
};

export const getFilterConfig = ({ date, status }: IReportsFilterConfig, statusOptions: IInfoSearchState[]) => ({
  [ReportsFilter.DATE]: {
    currentValue: date,
    filterName: FilterLabels[ReportsFilter.DATE],
  },
  [ReportsFilter.STATUS]: {
    selectConfig: {
      options: statusOptions,
      valuePropName: 'code',
      labelPropName: 'label',
    },
    currentValue: status,
    filterName: FilterLabels[ReportsFilter.STATUS],
  },
});

export const getReportsColumnsConfig = (
  statusSort: SortOrder,
  dateSort: SortOrder,
  showMeeting: boolean = true,
  showUploadResults: boolean = false,
  showBankName: boolean = false,
): ColumnType<IReportsFilesData>[] => [
  {
    title: 'Статус',
    dataIndex: 'state',
    key: 'state',
    renderText: (text: string, row) => <StatusCell entryData={text} statusDesc={row.state_desc} />,
    defaultSortOrder: statusSort,
    sorter: true,
    width: '14%',
  },
  {
    title: 'Дата обновления',
    key: 'datetime',
    renderText: (_: unknown, row) => (
      <span>
        {row.whencre} {row.timecre}
      </span>
    ),
    sorter: true,
    defaultSortOrder: dateSort,
    width: '13%',
  },
  ...(showBankName
    ? [
        {
          title: 'Банк',
          key: 'cli_name',
          dataIndex: 'cli_name',
          width: '14%',
        },
      ]
    : []),
  {
    title: 'Название файла',
    dataIndex: 'ob_File',
    key: 'ob_File',
    ellipsis: { showTitle: false },
    width: '14%',
    renderText: (data: IObjectFile[]) => {
      const files = data && getUploadedTaskFiles(data);
      return files?.length ? (
        files?.map((file) => (
          <FileDownloadCell
            key={file.id}
            entryData={file.name}
            href={file.URL}
            disabled={!file.URL}
            className={styles.file_upload_cell}
            addDownloadAttributes
            title={file.name}
          />
        ))
      ) : (
        <Flex gap='small'>
          <LoadingIcon spin className={styles.loading_icon} />
          <Text type='secondary' className={styles.loading_text}>
            Файл обрабатывается
          </Text>
        </Flex>
      );
    },
  },
  {
    title: 'ФИО',
    dataIndex: 'login_fio',
    key: 'login_fio',
    width: '20%',
  },
  {
    title: 'Автор',
    dataIndex: 'login',
    key: 'login',
    width: '10%',
  },
  ...(showUploadResults
    ? [
        {
          title: 'Результат',
          dataIndex: 'ob_File',
          key: 'uploadResults',
          width: '10%',
          renderText: (entryData: IObjectFile[]) => <UploadResultsCell results={getUploadResults(entryData)} />,
        },
      ]
    : []),
  ...(showMeeting
    ? [
        {
          title: 'Задача',
          dataIndex: 'ext_param',
          key: 'showTask',
          width: '5%',
          renderText: (ext_param: string) => (
            <ShowTaskCell entryData={ext_param} onClickAction={getCalendarTaskAction} />
          ),
        },
      ]
    : []),
];

export const getInvoiceFiltersFormItems = (statusOptions: ITreeInfoParams[]): FiltersFormItemsType => [
  {
    name: InvoiceFilters.DATE_RANGE,
    children: <DateRangePicker allowClear={false} dataTestId={dataTestId} />,
  },
  {
    label: 'Статус документа',
    labelType: 'float',
    name: InvoiceFilters.STATUS,
    children: (
      <TreeSelect
        treeCheckable
        treeDefaultExpandAll
        multiple
        showCheckedStrategy={SHOW_PARENT}
        fieldNames={{ value: 'id', label: 'name' }}
        treeData={statusOptions}
        showSearch={false}
      />
    ),
  },
  {
    label: 'Номер документа',
    labelType: 'float',
    name: InvoiceFilters.ORDER_CODE,
    children: <Input />,
    help: 'Должен содержать не менее 5 символов',
    rules: [
      {
        validateTrigger: ['onSubmit'],
        validator: (_, value) => {
          if (value) {
            return value.length >= 5 ? Promise.resolve() : Promise.reject();
          }
          return Promise.resolve();
        },
      },
    ],
  },
];
