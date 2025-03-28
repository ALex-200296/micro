import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calendarSelectors } from '@app/store/calendar/calendar.selectors';
import { resetCalendarEvent } from '@app/store/calendar/calendar.slice';
import { ICalendarEventState } from '@app/store/calendar/calendar.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { updateCaledarTaskActionType } from '@middleware/calendar/calendar.saga';
import { useToggleState } from '@shared/lib';
import { Button } from '@shared/ui';
import { Flex, Spin } from 'antd';

import { EventUpdateDrawer } from '../EventUpdate/EventUpdate.component';

import EventGeneralInfo from './EventReviewSections/EventGeneralInfo/EventGeneralInfo.component';
import EventManInfo from './EventReviewSections/EventManInfo/EventManInfo.component';
import EventSubInfo from './EventReviewSections/EventSubInfo/EventSubInfo.component';
import { dataTestId, hasUpdate } from './EventReview.data';
import { IEventReviewProps } from './EventReview.types';

import styles from './EventReview.module.scss';

export const EventReview: React.FC<IEventReviewProps> = ({ updateFormProps }) => {
  const dispatch = useDispatch();

  const selectedEvent = useSelector(calendarSelectors.getCalendarEvent);
  const { id, pme_theme } = selectedEvent;
  const isLoading = useSelector(uiSelectors.getIsRequestPending(updateCaledarTaskActionType));
  const [initialUpdateValues, setInitialUpdateValues] = useState<ICalendarEventState | null>(null);
  const hasMeeting = useMemo(() => id && !isLoading, [id, isLoading]);

  const {
    isOpen: isOpenUpdateForm,
    handleOpen: handleOpenUpdateForm,
    handleClose: handleCloseUpdateForm,
  } = useToggleState();

  useEffect(
    () => () => {
      dispatch(resetCalendarEvent());
    },
    [],
  );

  const handleUpdateEvent = useCallback(() => {
    setInitialUpdateValues?.(selectedEvent);
    handleOpenUpdateForm();
  }, [selectedEvent]);

  return (
    <>
      {hasMeeting ? (
        <Flex vertical justify='space-between' className={styles.container}>
          <Flex vertical gap='middle'>
            <EventGeneralInfo selectedEvent={selectedEvent} />
            <EventManInfo selectedEvent={selectedEvent} />
            <EventSubInfo selectedEvent={selectedEvent} />
          </Flex>
          {hasUpdate(pme_theme, !!handleOpenUpdateForm) && (
            <Button dataTestId={dataTestId} type='primary' onClick={handleUpdateEvent} className={styles.button}>
              Редактировать
            </Button>
          )}
          <EventUpdateDrawer
            isOpen={isOpenUpdateForm}
            onClose={handleCloseUpdateForm}
            initialValues={initialUpdateValues}
            setInitialValues={setInitialUpdateValues}
            {...updateFormProps}
          />
        </Flex>
      ) : (
        <Flex className={styles.container} justify='center' align='center'>
          <Spin />
        </Flex>
      )}
    </>
  );
};

export default memo(EventReview);
