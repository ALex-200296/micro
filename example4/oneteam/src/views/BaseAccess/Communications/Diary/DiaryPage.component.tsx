import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calendarFilterLabels, calendarFilters } from '@app/store/calendar/calendar.data';
import { calendarSelectors } from '@app/store/calendar/calendar.selectors';
import {
  resetCalendarExportFileName,
  resetCalendarFilter,
  resetCalendarFilters,
  setCalendarFilters,
} from '@app/store/calendar/calendar.slice';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TermInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { resetProjects } from '@app/store/project/project.slice';
import { setNotification } from '@app/store/ui/ui.slice';
import { INotificationState } from '@app/store/ui/ui.types';
import { userSelectors } from '@app/store/user/user.selectors';
import { FiltersForm } from '@entities/common/ui';
import { Manuals } from '@features/common/ui';
import { subscribeToCalendarAction } from '@middleware/calendar/calendar.saga';
import { infoSearchAction } from '@middleware/info/info.saga';
import { replaceUndefinedObjectFields, useFilterToTag, useRules, useToggleState } from '@shared/lib';
import { Modal, PageTitle, TagsGroup, Toolbar } from '@shared/ui';
import { filtersDrawerTitle, manualsDrawerTitle } from '@views/BaseAccess/BaseAccessPage.data';
import { EventCreationDrawer } from '@views/BaseAccess/components/EventCreation/EventCreation.component';
import { EventKeys } from '@views/BaseAccess/components/EventForm/EventForm.types';
import EventReviewDrawer from '@views/BaseAccess/components/EventReview/EventReviewDrawer.component';
import { Space } from 'antd';

import BigCalendar from './BigCalendar/BigCalendar.component';
import EventsCount from './EventsCount/EventsCount.component';
import EventsReportFormInfo from './EventsReportForm/EventsReportForm.component';
import {
  calendarFilterConfig,
  dairyPageTitle,
  getCalendarFilterFormItems,
  heading,
  manualsData,
  partitionFilterRequestData,
  ruCollator,
} from './DiaryPage.data';
import { EventType, IInitialFiltersValues } from './DiaryPage.types';

const DiaryPage: React.FC = () => {
  const dispatch = useDispatch();
  const { getActionAccess } = useRules();
  const [isCalendarCreateForm, setCalendarCreateForm] = useState<boolean>(false);
  const [isCalendarSelectedEvent, setIsCalendarSelectedEvent] = useState<boolean>(false);

  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();
  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();
  const {
    isOpen: excelModalOpen,
    handleOpen: handleExcelModalOpen,
    handleClose: handleExcelModalClose,
  } = useToggleState();

  const { exmManCode, pme_state, pme_subtheme } = useSelector(calendarSelectors.getCalendarFilters);
  const usersLkp = useSelector(userSelectors.getUsersLkp);
  const statusFilterData = useSelector(infoSelectors.getInfoSearch(TypeInfoSearch.co_table, CodeInfoSearch.pme_state));
  const bt99List = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.class, CodeInfoSearch.code51, TermInfoSearch.bt99),
  );
  const bt98List = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.class, CodeInfoSearch.code51, TermInfoSearch.bt98),
  );

  const filtersCount = useSelector(calendarSelectors.getCalendarFiltersCount);

  const [isCreateTask, isExcelDownload] = [
    getActionAccess('diary', 'createTask'),
    getActionAccess('diary', 'excelDownload'),
  ];

  const optionsList = useMemo(
    () =>
      [...bt99List, ...bt98List]
        .sort((option, nextOption) => ruCollator.compare(option?.label || '', nextOption?.label || ''))
        .map((partition) => ({ value: partition.code, label: partition.label || '' })),
    [bt99List, bt98List],
  );

  const filterConfig = useMemo(
    () => ({
      [calendarFilters.exmManCode]: {
        selectConfig: {
          options: usersLkp,
          ...calendarFilterConfig.exmManCode,
        },
        currentValue: exmManCode,
        filterName: calendarFilterLabels.exmManCode,
      },
      [calendarFilters.pme_state]: {
        selectConfig: {
          options: statusFilterData,
          ...calendarFilterConfig.pme_state,
        },
        currentValue: pme_state,
        filterName: calendarFilterLabels.pme_state,
      },
      [calendarFilters.pme_subtheme]: {
        selectConfig: {
          options: optionsList,
          ...calendarFilterConfig.pme_subtheme,
        },
        currentValue: pme_subtheme,
        filterName: calendarFilterLabels.pme_subtheme,
      },
    }),
    [usersLkp, statusFilterData, optionsList, pme_state, pme_subtheme, exmManCode],
  );

  const { filterTagsData } = useFilterToTag({
    filterConfig,
    onClose: (key) => dispatch(resetCalendarFilter(key)),
    onCloseAll: () => dispatch(resetCalendarFilters()),
  });

  const formItems = useMemo(
    () =>
      getCalendarFilterFormItems({
        vendorEmployeeListOptions: usersLkp,
        statusListOptions: statusFilterData,
        partitionListOptions: optionsList,
      }),
    [usersLkp, statusFilterData, optionsList],
  );

  const initialFiltersValues: IInitialFiltersValues = useMemo(
    () => ({
      [calendarFilters.exmManCode]: exmManCode,
      [calendarFilters.pme_state]: pme_state,
      [calendarFilters.pme_subtheme]: pme_subtheme,
    }),
    [exmManCode, pme_state, pme_subtheme],
  );

  const onExcelModalClose = useCallback(() => {
    handleExcelModalClose();
    dispatch(resetCalendarExportFileName());
  }, []);

  const drawerStateOfAction = {
    [EventType.createForm]: setCalendarCreateForm,
    [EventType.selectedEvent]: setIsCalendarSelectedEvent,
  };

  const handleOpen = useCallback((type: keyof typeof EventType) => {
    drawerStateOfAction[type](true);
  }, []);

  const handleClose = useCallback((type: keyof typeof EventType) => {
    drawerStateOfAction[type](false);
  }, []);

  const afterSubscribeCalendar = useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    handleManualsOpen();
  }, []);

  const subscribeToCalendar = useCallback(() => {
    dispatch(
      subscribeToCalendarAction({
        actions: [
          {
            type: setNotification.type,
            payload: {
              message: {
                title: 'Ссылка на ваш календарь направлена вам на email. Инструкция по подписке на календарь в разделе',
                link: {
                  text: 'Документация',
                  onClick: afterSubscribeCalendar,
                },
              },
              variant: 'warning',
              autoHide: false,
            } as INotificationState,
          },
        ],
      }),
    );
  }, []);

  const onFilterFinish = useCallback((value: Partial<IInitialFiltersValues>) => {
    dispatch(setCalendarFilters(replaceUndefinedObjectFields(value)));
    handleFiltersClose();
  }, []);

  const handleFiltersReset = useCallback(() => {
    dispatch(resetCalendarFilters());
  }, []);

  useEffect(() => {
    dispatch(resetCalendarFilters());
    dispatch(resetProjects());
    return () => {
      dispatch(resetProjects());
    };
  }, []);

  useEffect(() => {
    if (!statusFilterData.length) {
      dispatch(infoSearchAction({ type: TypeInfoSearch.co_table, code: CodeInfoSearch.pme_state }));
    }
  }, [statusFilterData.length]);

  useEffect(() => {
    !bt98List.length &&
      dispatch(infoSearchAction({ ...partitionFilterRequestData, term: TermInfoSearch.bt98, lenLim: 6 }));
  }, [bt98List.length]);

  useEffect(() => {
    !bt99List.length &&
      dispatch(infoSearchAction({ ...partitionFilterRequestData, term: TermInfoSearch.bt99, lenLim: 6 }));
  }, [bt99List.length]);

  return (
    <div>
      <PageTitle heading={heading} />
      <Space className='margin_4_toolbar'>
        <EventsCount />
        <Toolbar excludeClassName>
          {isCreateTask && <Toolbar.CreateTask onClick={() => handleOpen(EventType.createForm)} />}
          {isExcelDownload && <Toolbar.DownloadAsExcel onClick={handleExcelModalOpen} />}
          <Toolbar.SubscribeToCalendar onClick={subscribeToCalendar} />
          <Toolbar.ApplyFilter
            notification={filtersCount}
            onClick={handleFiltersOpen}
            drawerProps={{
              open: filtersOpen,
              onClose: handleFiltersClose,
              destroyOnClose: true,
              title: filtersDrawerTitle,
              children: (
                <FiltersForm
                  initialValues={initialFiltersValues}
                  formItems={formItems}
                  onReset={handleFiltersReset}
                  onFinish={onFilterFinish}
                />
              ),
            }}
          />
          <Toolbar.OpenDocumentation
            onClick={handleManualsOpen}
            drawerProps={{
              open: manualsOpen,
              onClose: handleManualsClose,
              title: manualsDrawerTitle,
              children: <Manuals manualsData={manualsData} showManufacturerInfo />,
            }}
          />
        </Toolbar>
      </Space>
      <TagsGroup tagsData={filterTagsData} closable dataTestId='communications-diary-page' />
      <BigCalendar handleOpen={() => handleOpen(EventType.selectedEvent)} />
      <EventCreationDrawer
        isOpen={isCalendarCreateForm}
        onClose={() => handleClose(EventType.createForm)}
        visibleFields={{ [EventKeys.status]: false }}
      />
      <EventReviewDrawer isOpen={isCalendarSelectedEvent} handleClose={() => handleClose(EventType.selectedEvent)} />
      <Modal title={dairyPageTitle} open={excelModalOpen} onCancel={onExcelModalClose}>
        <EventsReportFormInfo />
      </Modal>
    </div>
  );
};

export default memo(DiaryPage);
