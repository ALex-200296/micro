import React, { memo } from 'react';
import { Popover } from 'antd';

import { getPopoverContent, getPopoverTitle } from './Event.data';
import { IEventProps } from './Event.types';

import styles from './Event.module.scss';

const Event: React.FC<IEventProps> = (event) => {
  const { start, end, status, chapter, direction, statusCode } = event.event;

  return (
    <Popover
      placement='right'
      arrow={false}
      trigger='hover'
      title={getPopoverTitle(statusCode, start, end)}
      content={getPopoverContent(direction, chapter, status)}
    >
      <span className={styles.popover_children}>{event.title}</span>
    </Popover>
  );
};

export default memo(Event);
