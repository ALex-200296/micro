import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { calendarSelectors } from '@app/store/calendar/calendar.selectors';
import { infoSelectors } from '@app/store/info/info.selectors';
import { resetInfoCladr } from '@app/store/info/info.slice';
import { CodeInfoSearch, TermInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { projectSelectors } from '@app/store/project/project.selectors';
import {
  projectSliceName,
  resetProjectFilter,
  resetProjectFilters,
  setProjectsPagination,
  setSelectedProjectId,
} from '@app/store/project/project.slice';
import { IProjectsDataForTable, ProjectsComputedProperty } from '@app/store/project/project.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { userSelectors } from '@app/store/user/user.selectors';
import Manuals from '@features/common/ui/Manuals/Manuals.component';
import { infoSearchAction } from '@middleware/info/info.saga';
import { getProjectsListAction } from '@middleware/project/project.saga';
import { useFilterToTag, useOnTableChange, useRules, useToggleState } from '@shared/lib';
import { Button, Drawer, slashedFormat, Table, TagsGroup, Toolbar } from '@shared/ui';
import { filtersDrawerTitle, manualsDrawerTitle } from '@views/BaseAccess/BaseAccessPage.data';
import { EventType } from '@views/BaseAccess/Communications/Diary/DiaryPage.types';
import { EventCreationDrawer } from '@views/BaseAccess/components/EventCreation/EventCreation.component';
import { infoSearchClassParams } from '@views/BaseAccess/components/EventCreation/EventCreation.data';
import { EventKeys } from '@views/BaseAccess/components/EventForm/EventForm.types';
import EventReviewDrawer from '@views/BaseAccess/components/EventReview/EventReviewDrawer.component';
import { Alert, Flex } from 'antd';
import dayjs from 'dayjs';

import { getProjectsColumnsConfig, manualsData } from '../Projects.data';

import ProjectDetails from './ProjectDetails/ProjectDetails.component';
import ProjectEventsDetails from './ProjectDetails/ProjectEventsDetails/ProjectEventsDetails.component';
import ProjectDetailsInfo from './ProjectDetails/ProjectInfoDetails/ProjectInfoDetails.component';
import { ProjectFiltersFields } from './ProjectsFilterDrawer/SubmittedProjectFilters.data';
import SubmittedProjectsFilter from './ProjectsFilterDrawer/SubmittedProjectsFilter.component';
import { SubmittedProjectsFormValues } from './ProjectsFilterDrawer/SubmittedProjectsFilter.types';
import {
  dataTestId,
  drawerTitle,
  limitsSearchClass,
  projectFilterConfig,
  warningMessage,
} from './SubmittedProjects.data';

import styles from '../Projects.module.scss';

const SubmittedProjects: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { getActionAccess } = useRules();
  const usersLkp = useSelector(userSelectors.getUsersLkp);
  const infoSearchHelp = useSelector(infoSelectors.getInfoSearch(TypeInfoSearch.help, CodeInfoSearch.obj12));
  const addressHistory = useSelector(infoSelectors.getAddressForTag);
  const [isMeetingCreateForm, setIsMeetingCreateForm] = useState(false);
  const [isMeetingSelectedEvent, setIsMeetingSelectedEvent] = useState<boolean>(false);
  const [eventsDetailsPage, setEventsDetailsPage] = useState<number>(1);
  const extCodeToCopy = useSelector(projectSelectors.getExtCodeOfSelectedProject(ProjectsComputedProperty.projects));
  const prjCodeForUpdate = useSelector(projectSelectors.getProjectCodeOfSelectedProject);
  const { startDate, endDate } = useSelector(calendarSelectors.getCalendarFilters);

  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();
  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();
  const { isOpen: detailsOpen, handleOpen: handleDetailsOpen, handleClose: handleDetailsClose } = useToggleState();

  const { exmManCode, subPrjStatus, extCode, mnfDCode, prjName, prjSupply, prjAddr } = useSelector(
    projectSelectors.getProjectsListFilters,
  );
  const { page, records, rows } = useSelector(
    projectSelectors.getProjectsPaginationData(ProjectsComputedProperty.projects),
  );
  const filters = useSelector(projectSelectors.getProjectsListFilters);
  const isLoading = useSelector(
    uiSelectors.getIsRequestPending(`${projectSliceName}/${ProjectsComputedProperty.projects}`),
  );
  const filtersCount = useSelector(projectSelectors.getProjectsFiltersCount);

  const isCreateTask = getActionAccess('diary', 'createTask');
  const subPrjStatusOptions = useMemo(
    () => infoSearchHelp.map((elem) => ({ ...elem, label: elem.label?.split('$')[0] })),
    [infoSearchHelp],
  );

  const filterConfig = useMemo(
    () => ({
      [SubmittedProjectsFormValues.exmManCode]: {
        selectConfig: {
          options: usersLkp,
          ...projectFilterConfig.exmManCode,
        },
        currentValue: exmManCode,
        filterName: ProjectFiltersFields.exmManCode.label,
      },
      [SubmittedProjectsFormValues.subPrjStatus]: {
        selectConfig: {
          options: subPrjStatusOptions,
          ...projectFilterConfig.subPrjStatus,
        },
        currentValue: subPrjStatus,
        filterName: ProjectFiltersFields.subPrjStatus.label,
      },
      [SubmittedProjectsFormValues.extCode]: {
        currentValue: extCode,
        filterName: ProjectFiltersFields.extCode.label,
      },
      [SubmittedProjectsFormValues.mnfDCode]: {
        currentValue: mnfDCode,
        filterName: ProjectFiltersFields.mnfDCode.label,
      },
      [SubmittedProjectsFormValues.prjName]: {
        currentValue: prjName,
        filterName: ProjectFiltersFields.prjName.label,
      },
      [SubmittedProjectsFormValues.prjSupply]: {
        currentValue: prjSupply,
        filterName: ProjectFiltersFields.prjSupply.label,
      },
      [SubmittedProjectsFormValues.prjAddr]: {
        currentValue: prjAddr ? addressHistory : '',
        filterName: 'Адрес',
      },
    }),
    [usersLkp, infoSearchHelp, exmManCode, subPrjStatus, extCode, mnfDCode, prjName, prjSupply, prjAddr],
  );

  const { filterTagsData } = useFilterToTag({
    filterConfig,
    onClose: (key) => {
      dispatch(resetProjectFilter(key));
      if (key === SubmittedProjectsFormValues.prjAddr) {
        dispatch(resetInfoCladr());
      }
    },
    onCloseAll: () => {
      dispatch(resetProjectFilters());
      dispatch(resetInfoCladr());
    },
  });

  const infoSearchClass = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.class, CodeInfoSearch.code51, TermInfoSearch.bt99),
  );

  const subThemeOptions = useMemo(
    () => infoSearchClass.filter(({ code }) => limitsSearchClass.includes(code)),
    [infoSearchClass],
  );

  const columns = useMemo(() => getProjectsColumnsConfig<IProjectsDataForTable>(intl.formatNumber), []);

  const eventDrawerStateOfAction = {
    [EventType.createForm]: setIsMeetingCreateForm,
    [EventType.selectedEvent]: setIsMeetingSelectedEvent,
  };

  const handleOpenMeetingDrawer = useCallback((type: keyof typeof EventType) => {
    eventDrawerStateOfAction[type](true);
  }, []);

  const handleCloseMeetingDrawer = useCallback((type: keyof typeof EventType) => {
    eventDrawerStateOfAction[type](false);
  }, []);

  const onFiltersClose = useCallback(() => {
    if (!filters.prjAddr) {
      dispatch(resetInfoCladr());
    }
    handleFiltersClose();
  }, [filters.prjAddr]);

  const onTableChange = useOnTableChange({
    onPaginate: setProjectsPagination,
    computedProperty: ProjectsComputedProperty.projects,
  });

  useEffect(
    () => () => {
      dispatch(resetProjectFilters());
    },
    [],
  );

  useEffect(() => {
    dispatch(getProjectsListAction({ page, rows, ...filters }));
  }, [page, filters, rows]);

  useEffect(() => {
    if (!infoSearchClass.length) {
      dispatch(
        infoSearchAction({
          ...infoSearchClassParams,
          term: TermInfoSearch.bt99,
          type: TypeInfoSearch.class,
          code: CodeInfoSearch.code51,
        }),
      );
    }
  }, [infoSearchClass]);

  return (
    <>
      <Flex justify='space-between' className='margin_4_toolbar'>
        <div>{!filtersCount && <Alert message={warningMessage} type='warning' showIcon />}</div>
        <Toolbar excludeClassName>
          <Toolbar.ApplyFilter
            onClick={handleFiltersOpen}
            notification={filtersCount}
            drawerProps={{
              open: filtersOpen,
              onClose: onFiltersClose,
              title: filtersDrawerTitle,
              width: 'md',
              destroyOnClose: true,
              children: <SubmittedProjectsFilter {...filters} afterSubmit={handleFiltersClose} />,
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
      </Flex>
      <TagsGroup tagsData={filterTagsData} closable dataTestId={dataTestId} />
      <Table
        className={styles.projects_table}
        dataSelector={projectSelectors.getProjectsDataForTable}
        pagination={{ current: page, total: records, pageSize: rows }}
        onChange={onTableChange}
        rowKey='id'
        loading={isLoading}
        size='small'
        columns={columns}
        onRow={(record) => ({
          onClick: () => {
            dispatch(setSelectedProjectId({ id: record.id, computedProperty: ProjectsComputedProperty.projects }));
            handleDetailsOpen();
          },
        })}
      />
      <Drawer
        open={detailsOpen}
        onClose={handleDetailsClose}
        destroyOnClose
        width='md'
        title={drawerTitle}
        copyableTitlePart={extCodeToCopy}
      >
        <ProjectDetails
          infoComponent={<ProjectDetailsInfo />}
          meetingsComponent={
            <ProjectEventsDetails
              handleOpenUpdateMeeting={() => handleOpenMeetingDrawer(EventType.selectedEvent)}
              setEventsPage={setEventsDetailsPage}
            >
              {isCreateTask && (
                <Button
                  dataTestId={dataTestId}
                  type='primary'
                  onClick={() => handleOpenMeetingDrawer(EventType.createForm)}
                  block
                >
                  Создать событие по проекту
                </Button>
              )}
            </ProjectEventsDetails>
          }
        />
        <EventCreationDrawer
          isOpen={isMeetingCreateForm}
          onClose={() => handleCloseMeetingDrawer(EventType.createForm)}
          subThemeOptions={subThemeOptions}
          visibleFields={{
            [EventKeys.status]: false,
          }}
          disabledFields={{
            [EventKeys.project]: true,
          }}
          updateFilters={{
            objId: prjCodeForUpdate,
            objType: 'П',
            rows: 10,
            startDate: dayjs(startDate).format(slashedFormat),
            endDate: dayjs(endDate).format(slashedFormat),
            page: eventsDetailsPage,
          }}
        />
        <EventReviewDrawer
          isOpen={isMeetingSelectedEvent}
          handleClose={() => handleCloseMeetingDrawer(EventType.selectedEvent)}
          updateFormProps={{
            disabledFields: { [EventKeys.project]: true },
            updateFilters: {
              objId: prjCodeForUpdate,
              objType: 'П',
              rows: 10,
              startDate: dayjs(startDate).format(slashedFormat),
              endDate: dayjs(endDate).format(slashedFormat),
              page: eventsDetailsPage,
            },
          }}
        />
      </Drawer>
    </>
  );
};

export default memo(SubmittedProjects);
