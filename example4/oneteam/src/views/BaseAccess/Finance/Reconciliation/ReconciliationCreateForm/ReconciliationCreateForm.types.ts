import { ReconciliationParam } from '@app/store/finance/finance.types';
import { FormItemProps } from 'antd';
import { Dayjs } from 'dayjs';

export interface IInitialValues {
  dateRange: [Dayjs | null, Dayjs | null];
}

export interface IReconciliationCreateFormItemProps {
  dateRange: Omit<FormItemProps, 'children'>;
}

export interface IReconciliationCreateFormProps {
  organizationCode: string;
  [ReconciliationParam.startDate]: Dayjs | null;
  [ReconciliationParam.endDate]: Dayjs | null;
  afterSubmit?: () => void;
}
