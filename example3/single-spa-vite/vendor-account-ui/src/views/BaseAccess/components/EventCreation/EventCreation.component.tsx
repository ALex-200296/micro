import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calendarSelectors } from '@app/store/calendar/calendar.selectors';
import { infoSelectors } from '@app/store/info/info.selectors';
import { setInfoSearchData } from '@app/store/info/info.slice';
import { CodeInfoSearch, IInfoSearchState, TermInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { projectSelectors } from '@app/store/project/project.selectors';
import { projectSliceName, resetProjectsData, setSelectedProjectId } from '@app/store/project/project.slice';
import { IProjectDetailsData, IProjectsDataForTable, ProjectsComputedProperty } from '@app/store/project/project.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { userSelectors } from '@app/store/user/user.selectors';
import { UsersLkpAccess } from '@app/store/user/user.types';
import { convertNameFiles, getNumForFiles, getNumForFilesWithAttach } from '@features/common/ui';
import { updateCaledarTaskAction } from '@middleware/calendar/calendar.saga';
import { infoSearchAction } from '@middleware/info/info.saga';
import { getProjectRequestDetailsAction, getProjectsListAction } from '@middleware/project/project.saga';
import { postTemplateAction } from '@middleware/template/template.saga';
import { hasOwnKey } from '@shared/lib';
import { Drawer } from '@shared/ui';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib';

import EventForm from '../EventForm/EventForm.component';
import {
  errorSubProjectProps,
  findClient,
  getClientSelectOptions,
  getCliRolesFromProject,
  getObjectForEventTask,
  getPmeComDocForTask,
  getResponsibleSelectOptions,
  getSelectOptions,
  hasProject,
  hasTripartiteEvents,
  initialValues as eventInitialValues,
  successSubProjectProps,
} from '../EventForm/EventForm.data';
import { EventKeys, IEventInitialValues, NestedEventKeys } from '../EventForm/EventForm.types';

import { btnSubmitName, infoSearchClassParams, infoSearchClientParams } from './EventCreation.data';
import { IEventCreationDrawerProps, IEventCreationFormProps } from './EventCreation.types';

export const EventCreationForm: React.FC<IEventCreationFormProps> = memo(
  ({
    onClose,
    subThemeOptions: subThemeOptionsProp,
    disabledFields,
    visibleFields,
    updateFilters,
  }: IEventCreationFormProps) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const computedSubTheme = Form.useWatch<IEventInitialValues['subTheme']>(EventKeys.SUB_THEME, form);

    const isProjectLoading: boolean = useSelector(
      uiSelectors.getIsRequestPending(`${projectSliceName}/${ProjectsComputedProperty.PROJECTS}`),
    );

    const filters = useSelector(calendarSelectors.getCalendarFilters);

    const projectInfoById = useSelector(projectSelectors.getProjectDetailsById(ProjectsComputedProperty.PROJECTS));
    const selectedProjectId = useSelector(projectSelectors.getSelectedProjectId(ProjectsComputedProperty.PROJECTS));
    const subProjectList = useSelector(projectSelectors.getProjectsDataForTable);

    const infoSearchClients = useSelector(infoSelectors.getInfoSearch(TypeInfoSearch.CLIENTS, CodeInfoSearch.DICT));
    const infoSearchMain = useSelector(infoSelectors.getInfoSearch(TypeInfoSearch.MAIN_37, CodeInfoSearch.ZERO));
    const infoSearchStatus = useSelector(
      infoSelectors.getInfoSearch(TypeInfoSearch.CO_TABLE, CodeInfoSearch.PME_STATE),
    );
    const infoSearchClass = useSelector(
      infoSelectors.getInfoSearch(TypeInfoSearch.CLASS, CodeInfoSearch.CODE_51, TermInfoSearch.BT_99),
    );

    const usersLkp = useSelector(userSelectors.getUsersLkp);
    const { arrManagerKuCp, ofic, manCode } = useSelector(userSelectors.getUserInfoManager);

    const initialValues: IEventInitialValues = useMemo(
      () => ({
        ...eventInitialValues,
        [EventKeys.PROJECT]: projectInfoById ? projectInfoById.extCode : '',
        [EventKeys.EXM_MAN_CODE]: [
          {
            [NestedEventKeys.LABEL]: usersLkp[0].fio,
            [NestedEventKeys.VALUE]: usersLkp[0].exm_mancode,
            cliCode: usersLkp[0]['cli-code'],
          },
        ],
        [EventKeys.FILES]: {
          file: null,
          fileList: [],
        },
      }),
      [],
    );
    const visibleProjectField = hasProject(computedSubTheme?.value || '');
    const visibleExmManCodeField = usersLkp[0].access !== UsersLkpAccess.JUN;

    const subthemeOptions = useMemo(
      () =>
        subThemeOptionsProp || infoSearchClass.length
          ? getSelectOptions<IInfoSearchState>(subThemeOptionsProp || infoSearchClass, 'label', 'code')
          : [],
      [subThemeOptionsProp, infoSearchClass],
    );

    const [otherProps, setOtherProps] =
      useState<Partial<Record<(typeof EventKeys)[keyof typeof EventKeys], Omit<FormItemProps, 'children'>>>>();

    const { projectCliRolesHaveCliCode, projectCliRolesHaveManCode } = useMemo(
      () => getCliRolesFromProject(projectInfoById?.cliRole),
      [projectInfoById],
    );
    const foundClient = useMemo(() => findClient(computedSubTheme?.[NestedEventKeys.VALUE] || ''), [computedSubTheme]);
    const clientSelectOptions = useMemo(
      () =>
        getClientSelectOptions({
          infoSearchClients,
          projectCliRolesHaveCliCode,
          isProject: foundClient?.isProject || false,
        }),
      [infoSearchClients, projectCliRolesHaveCliCode, foundClient],
    );

    const { responsibleSelectOptions, disableResponsible } = useMemo(
      () =>
        getResponsibleSelectOptions({
          arrManagerKuCp,
          infoSearchMain,
          projectCliRolesHaveManCode,
          subTheme: computedSubTheme?.[NestedEventKeys.VALUE],
        }),
      [arrManagerKuCp, infoSearchMain, projectCliRolesHaveManCode, computedSubTheme],
    );

    const exmManCodeSelectOptions = useMemo(
      () =>
        usersLkp.length
          ? usersLkp.map(({ 'cli-code': cliCode, exm_mancode, fio }) => ({ cliCode, label: fio, value: exm_mancode }))
          : [],
      [usersLkp],
    );
    const statusSelectOptions = useMemo(
      () => (infoSearchStatus.length ? getSelectOptions(infoSearchStatus, 'label', 'code') : []),
      [infoSearchStatus],
    );

    const disabledClientField = useMemo(
      () => foundClient?.isProject && !clientSelectOptions.length,
      [foundClient, clientSelectOptions],
    );

    const getResponseSubProject = useCallback((data?: IProjectDetailsData) => {
      setOtherProps((prev) => ({
        ...prev,
        [EventKeys.CLIENT]: data ? successSubProjectProps : errorSubProjectProps,
        [EventKeys.RESPONSIBLE]: data ? successSubProjectProps : errorSubProjectProps,
      }));
    }, []);

    const getResponseProject = useCallback((isProject: boolean) => {
      setOtherProps((prev) => ({
        ...prev,
        [EventKeys.PROJECT]: {
          help: isProject ? 'Проверьте результат поиска' : ' Проект не найден, повторите поиск',
        },
      }));
    }, []);

    useEffect(() => {
      if (!projectInfoById && !!selectedProjectId) {
        dispatch(
          getProjectRequestDetailsAction({
            id: selectedProjectId,
            detailsType: ProjectsComputedProperty.PROJECTS,
            getResponse: getResponseSubProject,
          }),
        );
      }
      if (projectInfoById && selectedProjectId && !disabledFields?.[EventKeys.PROJECT]) {
        setOtherProps((prev) => ({
          ...prev,
          [EventKeys.CLIENT]: successSubProjectProps,
          [EventKeys.RESPONSIBLE]: successSubProjectProps,
        }));
      }
    }, [projectInfoById, selectedProjectId]);

    useEffect(() => {
      if (!infoSearchClass.length && !subThemeOptionsProp) {
        dispatch(
          infoSearchAction({
            ...infoSearchClassParams,
            term: TermInfoSearch.BT_99,
            type: TypeInfoSearch.CLASS,
            code: CodeInfoSearch.CODE_51,
          }),
        );
      }
    }, [infoSearchClass, subThemeOptionsProp]);

    useEffect(() => {
      if (!infoSearchStatus.length) {
        dispatch(infoSearchAction({ type: TypeInfoSearch.CO_TABLE, code: CodeInfoSearch.PME_STATE }));
      }
    }, [infoSearchStatus]);

    useEffect(
      () => () => {
        if (!disabledFields?.[EventKeys.PROJECT]) {
          dispatch(setSelectedProjectId({ id: '', computedProperty: ProjectsComputedProperty.PROJECTS }));
          dispatch(resetProjectsData(ProjectsComputedProperty.PROJECTS));
        }
        dispatch(setInfoSearchData({ type: TypeInfoSearch.CLIENTS, code: CodeInfoSearch.DICT, data: [] }));
      },
      [],
    );

    const handleSearchProject = useCallback(() => {
      if (selectedProjectId)
        dispatch(setSelectedProjectId({ id: '', computedProperty: ProjectsComputedProperty.PROJECTS }));
      setOtherProps(() => ({
        [EventKeys.PROJECT]: { help: 'Осуществите поиск по номеру проекта' },
      }));
    }, [form, selectedProjectId]);

    const handleSearchChildrenProject = useCallback(
      (
        value: string,
        event:
          | React.ChangeEvent<HTMLInputElement>
          | React.MouseEvent<HTMLElement, MouseEvent>
          | React.KeyboardEvent<HTMLInputElement>
          | undefined,
      ) => {
        event?.preventDefault();
        if (value) {
          dispatch(setSelectedProjectId({ id: '', computedProperty: ProjectsComputedProperty.PROJECTS }));
          dispatch(resetProjectsData(ProjectsComputedProperty.PROJECTS));
          dispatch(getProjectsListAction({ extCode: value, page: 1, rows: 10, getResponse: getResponseProject }));
          form.setFieldsValue({ [EventKeys.CLIENT]: null, [EventKeys.RESPONSIBLE]: '' });
          form.validateFields([EventKeys.PROJECT]);
        }
      },
      [],
    );

    const handleSelectProject = useCallback(
      (value: string, option: IProjectsDataForTable) => {
        form.setFieldValue(EventKeys.PROJECT, option.reg_code);
        dispatch(setSelectedProjectId({ id: option.id, computedProperty: ProjectsComputedProperty.PROJECTS }));
      },
      [form],
    );

    const handleSearchClient = useCallback(
      (value: string) => {
        if (!foundClient?.isProject && value.length >= 3) {
          dispatch(
            infoSearchAction({
              ...infoSearchClientParams,
              type: TypeInfoSearch.CLIENTS,
              cyrillicComplexTerm: value,
              code: CodeInfoSearch.DICT,
            }),
          );
        }
      },
      [foundClient],
    );

    const handleSelectClient = useCallback(
      (value: { label: string; value: string }) => {
        const { value: code } = value;
        if (code && hasTripartiteEvents(computedSubTheme?.[NestedEventKeys.VALUE] || '')) {
          dispatch(
            infoSearchAction({
              type: TypeInfoSearch.MAIN_37,
              code: CodeInfoSearch.ZERO,
              cli: code,
              message: 'Ответственный клиента не найден, обратитесь к своему менеджеру',
            }),
          );
          form.setFieldValue(EventKeys.RESPONSIBLE, null);
        }
      },
      [computedSubTheme],
    );

    const onValuesChange = useCallback(
      (values: Partial<IEventInitialValues>) => {
        if (hasOwnKey(values, EventKeys.SUB_THEME)) {
          dispatch(
            setInfoSearchData({
              type: TypeInfoSearch.MAIN_37,
              code: CodeInfoSearch.ZERO,
              data: [],
            }),
          );
          form.setFieldsValue({ [EventKeys.CLIENT]: null, [EventKeys.RESPONSIBLE]: '' });
          setOtherProps((prev) => ({
            ...prev,
            [EventKeys.CLIENT]: errorSubProjectProps,
            [EventKeys.RESPONSIBLE]: errorSubProjectProps,
          }));
        }
        if (hasOwnKey(values, EventKeys.PROJECT)) {
          form.setFieldsValue({ [EventKeys.CLIENT]: null, [EventKeys.RESPONSIBLE]: '' });
        }
      },
      [form, selectedProjectId],
    );

    const preCallValidation = useCallback(
      (values: IEventInitialValues) => {
        const { subTheme } = values;
        const errorObject: { name: IEventInitialValues | string[]; errors: string[] }[] = [];
        if (!projectInfoById && hasProject(subTheme ? subTheme.value : ''))
          errorObject.push({ name: [EventKeys.PROJECT], errors: ['Проект не найден'] });
        return errorObject.length ? (errorObject as any) : false;
      },
      [form, projectInfoById],
    );

    const onFinish = useCallback(
      (values: IEventInitialValues) => {
        const error = preCallValidation(values);

        if (error) return form.setFields(error);

        const convertedFileList = convertNameFiles(values[EventKeys.FILES]['fileList']);
        const numForFiles = getNumForFiles(convertedFileList);
        const meetingFileNames = getPmeComDocForTask(convertedFileList, getNumForFilesWithAttach(numForFiles));

        const objectForCreate = getObjectForEventTask({
          [EventKeys.DATE]: values[EventKeys.DATE],
          [EventKeys.RANGE_TIME]: values[EventKeys.RANGE_TIME],
          [EventKeys.SUB_THEME]: values[EventKeys.SUB_THEME],
          [EventKeys.PROJECT]: projectInfoById,
          [EventKeys.CLIENT]: values[EventKeys.CLIENT],
          [EventKeys.RESPONSIBLE]: values[EventKeys.RESPONSIBLE],
          [EventKeys.EXM_MAN_CODE]: values[EventKeys.EXM_MAN_CODE],
          [EventKeys.status]: values[EventKeys.status],
          [EventKeys.task]: values[EventKeys.task],
          [EventKeys.FILES]: meetingFileNames,
          ofic,
          manCode,
          pme_type: 'ВМ90',
          pme_theme: 'ВТ99',
          pr_meetingRowid: '',
          isProject: hasProject(computedSubTheme?.value || ''),
          userLkp: usersLkp[0],
        });

        if (convertedFileList.length)
          dispatch(postTemplateAction({ files: convertedFileList, rc: 'diary', num: numForFiles }));
        dispatch(
          updateCaledarTaskAction({
            post: objectForCreate,
            getEvents: {
              ...filters,
              startDate: filters.startVisibleDate,
              endDate: filters.endVisibleDate,
              ...updateFilters,
            },
          }),
        );
        onClose();
      },
      [preCallValidation, ofic, manCode, computedSubTheme, filters, updateFilters, usersLkp],
    );

    return (
      <EventForm
        form={form}
        initialValues={initialValues}
        onFinish={onFinish}
        onCancel={onClose}
        btnSubmitName={btnSubmitName}
        subThemeOptions={subthemeOptions}
        onValuesChange={onValuesChange}
        foundClient={foundClient}
        eventHandles={{
          [EventKeys.PROJECT]: {
            select: handleSelectProject,
            search: handleSearchProject,
            searchChildren: handleSearchChildrenProject,
          },
          [EventKeys.CLIENT]: {
            search: handleSearchClient,
            select: handleSelectClient,
          },
        }}
        visibleFields={{
          [EventKeys.PROJECT]: visibleProjectField,
          [EventKeys.CLIENT]: !!foundClient,
          [EventKeys.RESPONSIBLE]: !!computedSubTheme,
          [EventKeys.EXM_MAN_CODE]: visibleExmManCodeField,
          [EventKeys.status]: false,
          ...visibleFields,
        }}
        loadingFields={{ [EventKeys.PROJECT]: isProjectLoading }}
        disabledFields={{
          [EventKeys.CLIENT]: disabledClientField,
          [EventKeys.RESPONSIBLE]: disableResponsible,
          ...disabledFields,
        }}
        clientSelectOptions={clientSelectOptions}
        responsibleSelectOptions={responsibleSelectOptions}
        exmManCodeSelectOptions={exmManCodeSelectOptions}
        statusSelectOptions={statusSelectOptions}
        projectOptions={subProjectList}
        otherProps={otherProps}
      />
    );
  },
);

export const EventCreationDrawer: React.FC<IEventCreationDrawerProps> = memo(
  ({ isOpen, onClose, ...props }: IEventCreationDrawerProps) => (
    <Drawer title='Создание события' open={isOpen} onClose={onClose} destroyOnClose>
      <EventCreationForm onClose={onClose} {...props} />
    </Drawer>
  ),
);

EventCreationForm.displayName = 'EventCreationForm';
EventCreationDrawer.displayName = 'EventCreationDrawer';
