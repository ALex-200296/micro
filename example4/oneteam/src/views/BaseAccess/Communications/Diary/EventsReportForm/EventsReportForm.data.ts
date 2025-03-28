import { currentMonth } from '@shared/ui';

import { IFieldsPropsState, IInitialStateForm } from './EventsReportForm.types';

export const buttonText = 'Сформировать отчёт';
export const dataTestId = 'diary-events-report-form';

export const initialState: IInitialStateForm = {
  dateRange: [currentMonth.firstDay, currentMonth.lastDay],
};

export const fieldsProps: IFieldsPropsState = {
  date: {
    name: 'dateRange',
    rules: [{ required: true, message: 'Необходимо выбрать период' }],
  },
};

export const eventsReportFormInfo = {
  helperText: 'При выборе для отчёта периода, превышающего месяц, его формирование может занять некоторое время',
  fileText: 'Отчёт сформирован, вы можете скачать его ',
};
