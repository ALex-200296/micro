import React, { useMemo } from 'react';
import { ProDescriptions } from '@ant-design/pro-components';
import { Card } from 'antd';

import { eventContentStyle, eventLabelStyle } from '../EventReviewSections.data';
import { IEventReviewSectionsProps } from '../EventReviewSections.types';

import { getSubDescriptionsColumns } from './EventSubInfo.data';

import styles from './EventSubInfo.module.scss';

export const EventSubInfo: React.FC<IEventReviewSectionsProps> = ({ selectedEvent }) => {
  const descriptionColumns = useMemo(() => getSubDescriptionsColumns(selectedEvent), [selectedEvent]);
  return (
    <>
      {Boolean(selectedEvent.pme_task) && (
        <Card size='small' className={styles.card}>
          {selectedEvent.pme_task}
        </Card>
      )}
      <ProDescriptions
        dataSource={selectedEvent}
        columns={descriptionColumns}
        column={1}
        size='small'
        colon={false}
        labelStyle={eventLabelStyle}
        contentStyle={eventContentStyle}
      />
    </>
  );
};

export default EventSubInfo;
