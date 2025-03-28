import { RangePickerProps as BaseRangePickerProps } from 'antd/es/date-picker';
import { Dayjs } from 'dayjs';

export interface IRangePickerProps extends BaseRangePickerProps  {
  dataTestId: string;
}
export type ValueDateRangePickerType = [Dayjs | null, Dayjs | null];
