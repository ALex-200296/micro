import React from 'react';
import { FormattedNumber } from 'react-intl';
import { IReconciliationData } from '@app/store/finance/finance.types';
import { FiltersFormItemsType } from '@entities/common/ui/FiltersForm/FiltersForm.types';
import { api } from '@middleware/root.data';
import { downloadFile } from '@shared/lib';
import { ColumnType, DateRangePicker, FileDownloadCell, reversedDashedFormat, slashedFormat } from '@shared/ui';
import dayjs from 'dayjs';

export const dataTestId = 'finance-reconciliation';
export const heading = 'Акты сверки';
export const createActDrawerTitle = 'Формирование акта сверки';
export enum Duty {
  provider = 'provider',
  etm = 'etm',
}

export const filtersFormItems: FiltersFormItemsType = [
  {
    name: 'dateRange',
    children: <DateRangePicker allowClear={false} dataTestId={dataTestId} />,
  },
];

const outputDate = (date: string, format = slashedFormat) => dayjs(date).format(format);

const getNumberReconciliationCell = (number: string, date: string) => `${number} от ${outputDate(date)}`;

const getPeriodReconciliationCell = (startDate: string, endDate: string) =>
  `${outputDate(startDate)} - ${outputDate(endDate)}`;

const getDutyReconciliationCell = (amount: number, duty: keyof typeof Duty) => {
  switch (duty) {
    case 'provider':
      return amount > 0 ? <FormattedNumber value={Math.abs(amount)} /> : 0;
    case 'etm':
      return amount < 0 ? <FormattedNumber value={Math.abs(amount)} /> : 0;
  }
};

const getAgreedReconciliationCell = (ReconciliationAgreed: boolean) => (ReconciliationAgreed ? 'Да' : 'Нет');

const getUrlForReconciliationCell = (number: string, orgCode: string, date: string) =>
  `${api}/client/act/${number}?OrganizationCode=${orgCode}&Date=${outputDate(date, reversedDashedFormat)}`;

const getUrlForHandleClick = (number: string, orgCode: string, date: string, sId: string) =>
  getUrlForReconciliationCell(number, orgCode, date) + `&session-id=${sId}`;

export const getReconciliationTableConfig = (orgCode: string, sId: string): ColumnType<IReconciliationData>[] => [
  {
    title: 'Номер акта сверки',
    key: 'actNumber',
    renderText: (_: unknown, row) => (
      <FileDownloadCell
        href={getUrlForReconciliationCell(row.Number, orgCode, row.Date)}
        entryData={getNumberReconciliationCell(row.Number, row.Date)}
        addDownloadAttributes
        onClick={(e) => {
          e?.preventDefault();
          downloadFile(getUrlForHandleClick(row.Number, orgCode, row.Date, sId));
        }}
      />
    ),
    width: '25%',
  },
  {
    title: 'Период сверки',
    key: 'period',
    renderText: (_: unknown, row) => getPeriodReconciliationCell(row.StartDate, row.EndDate),
    width: '20%',
  },
  {
    title: 'Долг за Поставщиком',
    key: 'vendorDebt',
    dataIndex: 'Amount',
    renderText: (amount: number) => getDutyReconciliationCell(amount, Duty.provider),
    width: '20%',
  },
  {
    title: 'Долг за ЭТМ',
    key: 'companyDebt',
    dataIndex: 'Amount',
    renderText: (amount: number) => getDutyReconciliationCell(amount, Duty.etm),
    width: '20%',
  },
  {
    title: 'Согласован',
    dataIndex: 'ReconciliationAgreed',
    renderText: (data: boolean) => getAgreedReconciliationCell(data),
    width: '15%',
  },
];
