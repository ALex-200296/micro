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
  [ReconciliationParam.START_DATE]: Dayjs | null;
  [ReconciliationParam.END_DATE]: Dayjs | null;
  afterSubmit?: () => void;
}
