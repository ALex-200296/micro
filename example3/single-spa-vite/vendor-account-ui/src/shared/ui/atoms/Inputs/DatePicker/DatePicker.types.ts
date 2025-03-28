import { PickerProps } from 'antd/es/date-picker/generatePicker';
import { Dayjs } from 'dayjs';

export interface IDatePickerProps extends PickerProps<Dayjs> {
  dataTestId: string;
}
