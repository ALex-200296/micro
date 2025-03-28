import React, { memo } from 'react';
import { TimePicker } from 'antd';
import cn from 'classnames';

import { IRangePickerProps } from '../DateRangePicker/DateRangePicker.types';
import { shortTimeDottedFormat } from '../TimePicker/TimePicker.data';

import styles from './TimeRangePicker.module.scss';

const { RangePicker } = TimePicker;

export const TimeRangePicker: React.FC<IRangePickerProps> = ({
  changeOnBlur = true,
  format = shortTimeDottedFormat,
  className,
  dataTestId,
  needConfirm = false,
  ...props
}) => {
  return (
    <RangePicker
      changeOnBlur={changeOnBlur}
      format={format}
      needConfirm={needConfirm}
      className={cn(styles.range_picker, className)}
      data-testid={`time-range-picker-${dataTestId}`}
      {...props}
    />
  );
};

export default memo(TimeRangePicker);
