import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calendarSelectors } from '@app/store/calendar/calendar.selectors';
import {
  calendarSliceName,
  resetCalendarFilters,
  setDateFilter,
  setStatusFilter,
} from '@app/store/calendar/calendar.slice';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { projectSelectors } from '@app/store/project/project.selectors';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { FiltersForm } from '@entities/common/ui';
import { getCalendarCliTaskAction, getCalendarTaskAction } from '@middleware/calendar/calendar.saga';
import { infoSearchAction } from '@middleware/info/info.saga';
import { defaultRows, hasOwnKey } from '@shared/lib';
import { Collapse, Pagination, slashedFormat } from '@shared/ui';
import dayjs from 'dayjs';

import LoadingIndicator from '../../../components/Sections/LoadingIndicator/LoadingIndicator.component';

import { EventsFilter, getEventsCollapseConfig, getEventsFilterItems } from './ProjectEventsDetails.data';
import { IProjectEventsDetailsProps } from './ProjectEventsDetails.types';

import styles from './ProjectEventsDetails.module.scss';

const ProjectEventsDetails: React.FC<IProjectEventsDetailsProps> = ({
  handleOpenUpdateMeeting,
  children,
  setEventsPage,
}) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(1);

  const extCode = useSelector(projectSelectors.getProjectCodeOfSelectedProject);
  const eventsData = useSelector(calendarSelectors.getCalendarEvents);
  const { pme_state, startDate, endDate } = useSelector(calendarSelectors.getCalendarFilters);
  const statusFilterData = useSelector(infoSelectors.getInfoSearch(TypeInfoSearch.CO_TABLE, CodeInfoSearch.PME_STATE));

  const { total } = useSelector(calendarSelectors.getCalendarEventsCount);
  const isLoading = useSelector(uiSelectors.getIsRequestPending(`${calendarSliceName}/meeting/getCliTask`));

  useEffect(() => {
    dispatch(
      getCalendarCliTaskAction({
        objType: 'П',
        objId: extCode,
        pme_state,
        startDate: dayjs(startDate).format(slashedFormat),
        endDate: dayjs(endDate).format(slashedFormat),
        rows: defaultRows,
        page,
      }),
    );
  }, [extCode, pme_state, startDate, endDate, page]);

  useEffect(
    () => () => {
      dispatch(resetCalendarFilters());
    },
    [],
  );

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
    setEventsPage(page);
  }, []);

  const handleOpenEventDrawer = useCallback((id: string) => {
    dispatch(getCalendarTaskAction({ id }));
    handleOpenUpdateMeeting();
  }, []);

  const onStatusOpen = useCallback(() => {
    if (!statusFilterData.length) {
      dispatch(infoSearchAction({ type: TypeInfoSearch.CO_TABLE, code: CodeInfoSearch.PME_STATE }));
    }
  }, [statusFilterData]);

  const items = useMemo(
    () => getEventsCollapseConfig(eventsData, handleOpenEventDrawer),
    [pme_state, startDate, endDate, eventsData],
  );
  const initialValues = useMemo(
    () => ({
      [EventsFilter.STATUS]: pme_state,
      [EventsFilter.DATES]: [startDate, endDate],
    }),
    [pme_state, startDate, endDate],
  );

  const filterFormItems = useMemo(() => getEventsFilterItems(statusFilterData, onStatusOpen), [statusFilterData]);

  const onValuesChange = useCallback((values: any) => {
    if (hasOwnKey(values, EventsFilter.DATES)) {
      const [startDate, endDate] = values[EventsFilter.DATES];
      dispatch(setDateFilter({ startDate, endDate }));
    }
    if (hasOwnKey(values, EventsFilter.STATUS)) {
      dispatch(setStatusFilter(values[EventsFilter.STATUS] || ''));
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <FiltersForm
          className={styles.filters}
          initialValues={initialValues}
          onValueChange={onValuesChange}
          formItems={filterFormItems}
        />
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <div className={styles.content}>
            <Collapse items={items} />
            <Pagination current={page} total={total} onChange={handlePageChange} className={styles.pagination} />
          </div>
        )}
      </div>
      {children}
    </>
  );
};

export default memo(ProjectEventsDetails);
