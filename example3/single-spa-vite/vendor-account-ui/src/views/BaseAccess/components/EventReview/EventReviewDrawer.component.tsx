import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { calendarSelectors } from '@app/store/calendar/calendar.selectors';
import { Drawer } from '@shared/ui';

import { EventReview } from './EventReview.component';
import { IEventReviewProps } from './EventReview.types';

const EventReviewDrawer: React.FC<IEventReviewProps> = ({ isOpen, handleClose, updateFormProps }) => {
  const selectedEvent = useSelector(calendarSelectors.getCalendarEvent);

  return (
    <Drawer title={selectedEvent?.RO_subtheme} open={isOpen} onClose={handleClose} width='md' destroyOnClose>
      <EventReview isOpen={isOpen} handleClose={handleClose} updateFormProps={updateFormProps} />
    </Drawer>
  );
};

export default memo(EventReviewDrawer);
