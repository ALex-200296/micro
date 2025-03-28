import React, { memo } from 'react';
import { DatePicker } from 'antd';
import cn from 'classnames';

import { dottedFormat } from '../DatePicker/DatePicker.formats';

import { IRangePickerProps } from './DateRangePicker.types';

import styles from './DateRangePicker.module.scss';

const { RangePicker } = DatePicker;

export const DateRangePicker: React.FC<IRangePickerProps> = memo(({
  format = dottedFormat,
  className,
  dataTestId,
  needConfirm = false,
  ...props
}) => {
  return (
    <RangePicker
      format={format}
      needConfirm={needConfirm}
      className={cn(styles.range_picker, className)}
      data-testid={`date-range-picker-${dataTestId}`}
      {...props}
    />
  );
});
DateRangePicker.displayName = 'DateRangePicker'
