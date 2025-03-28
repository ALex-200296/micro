import React, { memo, useCallback, useMemo, useState } from 'react';
import { spaceFormat } from '@shared/ui';
import { Divider, Popover } from 'antd';
import cn from 'classnames';
import dayjs from 'dayjs';

import Event from '../Event/Event.component';

import { IPopupProps } from './Popup.types';

import styles from './Popup.module.scss';

dayjs.locale('ru');

const Popup: React.FC<IPopupProps> = ({ date, events, total, onClickEvent }) => {
  const [open, setOpen] = useState(false);
  const title = useMemo(() => dayjs(date).format(spaceFormat), [date]);
  const content = useMemo(
    () => (
      <>
        <Divider className={styles.divider} />
        {events.map((event) => (
          <div
            key={event.id}
            className={cn('rbc-event', `${event.statusCode}`)}
            onClick={() => {
              onClickEvent(event);
              setOpen(false);
            }}
          >
            <Event event={event} title={event.title} />
          </div>
        ))}
      </>
    ),
    [events],
  );

  const onOpenChange = useCallback((flag: boolean) => {
    setOpen(flag);
  }, []);

  return (
    <Popover
      title={title}
      trigger='click'
      open={open}
      overlayClassName={styles.popup}
      onOpenChange={onOpenChange}
      content={content}
    >
      <span>+{total}</span>
    </Popover>
  );
};

export default memo(Popup);
