import React, { memo, useMemo } from 'react';
import { ProDescriptions } from '@ant-design/pro-components';

import StatusTag from '../../../StatusTag/StatusTag.component';
import { eventContentStyle, eventLabelStyle } from '../EventReviewSections.data';
import { IEventReviewSectionsProps } from '../EventReviewSections.types';

import { getDescriptionsColumns } from './EventGeneralInfo.data';
const EventGeneralInfo: React.FC<IEventReviewSectionsProps> = ({ selectedEvent }) => {
  const { pme_state, RO_state } = selectedEvent;
  const descriptionsColumns = useMemo(() => getDescriptionsColumns(selectedEvent), [selectedEvent]);
  return (
    <ProDescriptions
      title={<StatusTag statusCode={pme_state} status={RO_state} />}
      dataSource={selectedEvent}
      columns={descriptionsColumns}
      column={1}
      size='small'
      colon={false}
      labelStyle={eventLabelStyle}
      contentStyle={eventContentStyle}
    />
  );
};

export default memo(EventGeneralInfo);
