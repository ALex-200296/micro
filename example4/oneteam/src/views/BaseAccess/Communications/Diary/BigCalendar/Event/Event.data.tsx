import React from 'react';
import { shortYearSlashedWithTimeWithoutSeconds } from '@shared/ui';
import { Descriptions } from 'antd';
import cn from 'classnames';
import dayjs from 'dayjs';

import { timeFormat } from '../BigCalendar.data';

import styles from './Event.module.scss';

const outputDayjs = (event: Date, format: string) => {
  return dayjs(event).format(format);
};
export const getPopoverContent = (direction: string, chapter: string, status: string): React.ReactNode => (
  <Descriptions
    column={1}
    size='small'
    className={styles.popover_content}
    items={[
      { label: 'Направление', children: direction },
      { label: 'Раздел', children: chapter },
      { label: 'Статус', children: status },
    ]}
  />
);

export const getPopoverTitle = (statusCode: string, start: Date, end: Date): React.ReactNode => (
  <div
    className={cn(styles.popover_header, {
      [styles[statusCode]]: statusCode,
      [styles.tag_color]: statusCode === 'appoint',
    })}
  >
    {outputDayjs(start, shortYearSlashedWithTimeWithoutSeconds)} - {outputDayjs(end, timeFormat)}
  </div>
);
