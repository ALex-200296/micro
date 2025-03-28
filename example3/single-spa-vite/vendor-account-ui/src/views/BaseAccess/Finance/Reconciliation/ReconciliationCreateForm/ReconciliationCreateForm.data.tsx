import { currentMonth } from '@shared/ui';

import { IInitialValues, IReconciliationCreateFormItemProps } from './ReconciliationCreateForm.types';

export const dataTestId = 'finance-reconciliation-create-form';

export const initialValues: IInitialValues = {
  dateRange: [currentMonth.firstDay, currentMonth.lastDay],
};

export const reconciliationCreateFormItemProps: IReconciliationCreateFormItemProps = {
  dateRange: {
    name: 'dateRange',
    rules: [{ required: true, message: 'Выберите даты' }],
    help: 'При выборе для акта сверки периода, превышающего месяц, его формирование может занять некоторое время',
  },
};
