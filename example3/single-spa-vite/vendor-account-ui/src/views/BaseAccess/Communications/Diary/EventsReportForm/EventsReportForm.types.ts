import { IFormItemProps,ValueDateRangePickerType } from '@shared/ui';
export interface IFieldsPropsState {
  date: Omit<IFormItemProps, 'children'>;
}

export interface IEventsReportFormInfoProps {
  fileName: string;
  fileText: string;
  helperText: string;
}

export interface IInitialStateForm {
  dateRange: ValueDateRangePickerType;
}
