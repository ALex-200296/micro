import { TimePickerProps as AntdTimePickerProps } from 'antd';
import { Dayjs } from 'dayjs';

export interface ITimePickerProps extends AntdTimePickerProps {
  dataTestId: string;
  id: string;
  name: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  format?: string;
  label?: string;
  error?: boolean;
  className?: string;
  helperText?: string;
  minTime?: Dayjs | null;
  maxTime?: Dayjs | null;
}
