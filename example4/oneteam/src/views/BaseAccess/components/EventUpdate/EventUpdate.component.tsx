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
import { usersLkpAccess } from '@app/store/user/user.types';
import { convertNameFiles, getNumForFiles, getNumForFilesWithAttach } from '@features/common/ui';
import { updateCaledarTaskAction } from '@middleware/calendar/calendar.saga';
import { infoSearchAction } from '@middleware/info/info.saga';
import { getProjectRequestDetailsAction, getProjectsListAction } from '@middleware/project/project.saga';
import { postTemplateAction } from '@middleware/template/template.saga';
import { hasOwnKey } from '@shared/lib';
import { Drawer, IFormItemProps } from '@shared/ui';
import { Form } from 'antd';

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

import {
  btnSubmitName,
  getFilesUploadedAndForUpload,
  getInitialValuesForUpdate,
  infoSearchClassParams,
  infoSearchClientParams,
} from './EventUpdate.data';
import { EventUpdateFormProps, IEventUpdateDrawerProps } from './EventUpdate.types';

export const EventUpdateForm: React.FC<EventUpdateFormProps> = memo(
  ({
    initialValues,
    setInitialValues,
    onClose,
    subThemeOptions: subThemeOptionsProp,
    disabledFields,
    visibleFields,
    updateFilters,
  }: EventUpdateFormProps) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const computedSubTheme = Form.useWatch<IEventInitialValues['subTheme']>(EventKeys.subTheme, form);

    const isProjectLoading: boolean = useSelector(
      uiSelectors.getIsRequestPending(`${projectSliceName}/${ProjectsComputedProperty.projects}`),
    );

    const filters = useSelector(calendarSelectors.getCalendarFilters);

    const infoSearchClass = useSelector(
      infoSelectors.getInfoSearch(TypeInfoSearch.class, CodeInfoSearch.code51, TermInfoSearch.bt99),
    );
    const infoSearchClients = useSelector(infoSelectors.getInfoSearch(TypeInfoSearch.clients, CodeInfoSearch.dict));
    const infoSearchMain = useSelector(infoSelectors.getInfoSearch(TypeInfoSearch.main37, CodeInfoSearch.zero));
    const infoSearchStatus = useSelector(
      infoSelectors.getInfoSearch(TypeInfoSearch.co_table, CodeInfoSearch.pme_state),
    );

    const selectedProjectId = useSelector(projectSelectors.getSelectedProjectId(ProjectsComputedProperty.projects));
    const projectInfoById = useSelector(projectSelectors.getProjectDetailsById(ProjectsComputedProperty.projects));
    const subProjectList = useSelector(projectSelectors.getProjectsDataForTable);

    const usersLkp = useSelector(userSelectors.getUsersLkp);
    const { arrManagerKuCp, ofic, manCode } = useSelector(userSelectors.getUserInfoManager);

    const [otherProps, setOtherProps] =
      useState<Partial<Record<(typeof EventKeys)[keyof typeof EventKeys], Omit<IFormItemProps, 'children'>>>>();

    const updateInitialValues = useMemo(
      () =>
        initialValues
          ? getInitialValuesForUpdate({ ...initialValues, usersLkp })
          : { ...eventInitialValues, [EventKeys.files]: { file: null, fileList: [] } },
      [initialValues, usersLkp],
    );
    const visibleProjectField = hasProject(computedSubTheme?.value || '');
    const visibleExmManCodeField = usersLkp[0].access !== usersLkpAccess.Jun;

    const subthemeOptions = useMemo(
      () =>
        subThemeOptionsProp || infoSearchClass.length
          ? getSelectOptions<IInfoSearchState>(subThemeOptionsProp || infoSearchClass, 'label', 'code')
          : [],
      [subThemeOptionsProp, infoSearchClass],
    );

    const { projectCliRolesHaveCliCode, projectCliRolesHaveManCode } = useMemo(
      () => getCliRolesFromProject(projectInfoById?.cliRole),
      [projectInfoById],
    );
    const foundClient = useMemo(() => findClient(computedSubTheme?.[NestedEventKeys.value] || ''), [computedSubTheme]);
    const clientSelectOptions = useMemo(
      () =>
        getClientSelectOptions({
          infoSearchClients,
          projectCliRolesHaveCliCode,
          isProject: foundClient?.isProject || false,
        }),
      [infoSearchClients, projectCliRolesHaveCliCode, foundClient],
    );
    const disabledClientField = useMemo(
      () => foundClient?.isProject && !clientSelectOptions.length,
      [foundClient, clientSelectOptions],
    );

    const { responsibleSelectOptions, disableResponsible } = useMemo(
      () =>
        getResponsibleSelectOptions({
          arrManagerKuCp,
          infoSearchMain,
          projectCliRolesHaveManCode,
          subTheme: computedSubTheme?.[NestedEventKeys.value],
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

    const getResponseSubProject = useCallback((data?: IProjectDetailsData) => {
      setOtherProps((prev) => ({
        ...prev,
        [EventKeys.client]: data ? successSubProjectProps : errorSubProjectProps,
        [EventKeys.responsible]: data ? successSubProjectProps : errorSubProjectProps,
      }));
    }, []);

    const getResponseProject = useCallback((isProject: boolean) => {
      setOtherProps((prev) => ({
        ...prev,
        [EventKeys.project]: {
          help: isProject ? 'Проверьте результат поиска' : ' Проект не найден, повторите поиск',
        },
      }));
    }, []);

    useEffect(() => {
      if (!projectInfoById && !!selectedProjectId) {
        dispatch(
          getProjectRequestDetailsAction({
            id: selectedProjectId,
            detailsType: ProjectsComputedProperty.projects,
            pendingRequest: EventKeys.project,
            getResponse: getResponseSubProject,
          }),
        );
      }
      if (projectInfoById && selectedProjectId && !disabledFields?.[EventKeys.project]) {
        setOtherProps((prev) => ({
          ...prev,
          [EventKeys.client]: successSubProjectProps,
          [EventKeys.responsible]: successSubProjectProps,
        }));
      }
    }, [projectInfoById, selectedProjectId]);

    useEffect(() => {
      if (!infoSearchClass.length && !subThemeOptionsProp) {
        dispatch(
          infoSearchAction({
            ...infoSearchClassParams,
            term: TermInfoSearch.bt99,
            type: TypeInfoSearch.class,
            code: CodeInfoSearch.code51,
          }),
        );
      }
    }, [infoSearchClass, subThemeOptionsProp]);

    useEffect(() => {
      if (!infoSearchStatus.length) {
        dispatch(infoSearchAction({ type: TypeInfoSearch.co_table, code: CodeInfoSearch.pme_state }));
      }
    }, [infoSearchStatus]);

    useEffect(() => {
      if (
        updateInitialValues?.[EventKeys.client]?.[NestedEventKeys.value] &&
        hasTripartiteEvents(updateInitialValues?.[EventKeys.subTheme]?.[NestedEventKeys.value] || '')
      ) {
        dispatch(
          infoSearchAction({
            type: TypeInfoSearch.main37,
            code: CodeInfoSearch.zero,
            cli: updateInitialValues?.[EventKeys.client]?.[NestedEventKeys.value] || '',
            message: 'Ответственный клиента не найден, обратитесь к своему менеджеру',
          }),
        );
      }
      if (updateInitialValues?.[EventKeys.project] && !disabledFields?.[EventKeys.project]) {
        dispatch(
          getProjectsListAction({
            mnfDCode: updateInitialValues?.[EventKeys.project],
            page: 1,
            rows: 10,
            isSetId: true,
          }),
        );
      }
      return () => {
        if (!disabledFields?.[EventKeys.project]) {
          dispatch(setSelectedProjectId({ id: '', computedProperty: ProjectsComputedProperty.projects }));
          dispatch(resetProjectsData(ProjectsComputedProperty.projects));
        }
        dispatch(setInfoSearchData({ type: TypeInfoSearch.clients, code: CodeInfoSearch.dict, data: [] }));
      };
    }, []);

    const handleClose = useCallback(() => {
      setInitialValues?.(null);
      onClose();
    }, []);

    const handleSearchProject = useCallback(() => {
      if (selectedProjectId)
        dispatch(setSelectedProjectId({ id: '', computedProperty: ProjectsComputedProperty.projects }));
      setOtherProps(() => ({
        [EventKeys.project]: { help: 'Осуществите поиск по номеру проекта' },
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
          dispatch(setSelectedProjectId({ id: '', computedProperty: ProjectsComputedProperty.projects }));
          dispatch(resetProjectsData(ProjectsComputedProperty.projects));
          dispatch(getProjectsListAction({ extCode: value, page: 1, rows: 10, getResponse: getResponseProject }));
          form.setFieldsValue({ [EventKeys.client]: null, [EventKeys.responsible]: '' });
          form.validateFields([EventKeys.project]);
        }
      },
      [],
    );

    const handleSelectProject = useCallback(
      (value: string, option: IProjectsDataForTable) => {
        form.setFieldValue(EventKeys.project, option.reg_code);
        dispatch(setSelectedProjectId({ id: option.id, computedProperty: ProjectsComputedProperty.projects }));
      },
      [form],
    );

    const handleSearchClient = useCallback(
      (value: string) => {
        if (!foundClient?.isProject && value.length >= 3) {
          dispatch(
            infoSearchAction({
              ...infoSearchClientParams,
              type: TypeInfoSearch.clients,
              cyrillicComplexTerm: value,
              code: CodeInfoSearch.dict,
            }),
          );
        }
      },
      [foundClient],
    );

    const handleSelectClient = useCallback(
      (value: { label: string; value: string }) => {
        const { value: code } = value;
        if (code && hasTripartiteEvents(computedSubTheme?.[NestedEventKeys.value] || '')) {
          dispatch(
            infoSearchAction({
              type: TypeInfoSearch.main37,
              code: CodeInfoSearch.zero,
              cli: code,
              message: 'Ответственный клиента не найден, обратитесь к своему менеджеру',
            }),
          );
          form.setFieldValue(EventKeys.responsible, null);
        }
      },
      [computedSubTheme],
    );

    const onValuesChange = useCallback(
      (values: Partial<IEventInitialValues>) => {
        if (hasOwnKey(values, EventKeys.subTheme)) {
          dispatch(
            setInfoSearchData({
              type: TypeInfoSearch.main37,
              code: CodeInfoSearch.zero,
              data: [],
            }),
          );
          form.setFieldsValue({ [EventKeys.client]: null, [EventKeys.responsible]: '' });
          setOtherProps((prev) => ({
            ...prev,
            [EventKeys.client]: errorSubProjectProps,
            [EventKeys.responsible]: errorSubProjectProps,
          }));
        }
        if (hasOwnKey(values, EventKeys.project)) {
          form.setFieldsValue({ [EventKeys.client]: null, [EventKeys.responsible]: '' });
        }
      },
      [form, selectedProjectId],
    );

    const preCallValidation = useCallback(
      (values: IEventInitialValues) => {
        const { subTheme } = values;
        const errorObject: { name: IEventInitialValues | string[]; errors: string[] }[] = [];
        if (!projectInfoById && hasProject(subTheme ? subTheme.value : ''))
          errorObject.push({ name: [EventKeys.project], errors: ['Проект не найден'] });
        return errorObject.length ? (errorObject as any) : false;
      },
      [form, projectInfoById],
    );

    const onFinish = useCallback(
      (values: IEventInitialValues) => {
        const error = preCallValidation(values);

        if (error) return form.setFields(error);
        const { uploadedFiles, uploadFiles } = getFilesUploadedAndForUpload(values[EventKeys.files]['fileList']);
        const convertedFileList = convertNameFiles(uploadFiles);
        const numForFiles = getNumForFiles(convertedFileList);
        const EventFileNames = getPmeComDocForTask(
          convertedFileList,
          getNumForFilesWithAttach(numForFiles, uploadedFiles.length + 1),
        );

        const objectForUpdate = getObjectForEventTask({
          [EventKeys.date]: values[EventKeys.date],
          [EventKeys.rangeTime]: values[EventKeys.rangeTime],
          [EventKeys.subTheme]: values[EventKeys.subTheme],
          [EventKeys.project]: projectInfoById,
          [EventKeys.client]: values[EventKeys.client],
          [EventKeys.responsible]: values[EventKeys.responsible],
          [EventKeys.exmManCode]: values[EventKeys.exmManCode],
          [EventKeys.status]: values[EventKeys.status],
          [EventKeys.task]: values[EventKeys.task],
          [EventKeys.files]: [
            ...(uploadedFiles.length ? [uploadedFiles.map(({ uid }) => uid)] : []),
            ...(EventFileNames && [EventFileNames]),
          ].join(','),
          ofic,
          manCode,
          pme_type: initialValues?.pme_type || '',
          pme_theme: initialValues?.pme_theme || '',
          pr_meetingRowid: initialValues?.id || '',
          request_method: 'PUT',
          isProject: hasProject(computedSubTheme?.value || ''),
          userLkp: usersLkp[0],
        });

        if (convertedFileList.length)
          dispatch(postTemplateAction({ files: convertedFileList, rc: 'diary', num: numForFiles }));
        dispatch(
          updateCaledarTaskAction({
            post: objectForUpdate,
            getEvent: {
              id: initialValues?.id || '',
            },
            getEvents: {
              ...filters,
              startDate: filters.startVisibleDate,
              endDate: filters.endVisibleDate,
              ...updateFilters,
            },
          }),
        );
        handleClose();
      },
      [preCallValidation, ofic, manCode, initialValues, computedSubTheme, filters, updateFilters, usersLkp],
    );
    return (
      <EventForm
        onCancel={onClose}
        form={form}
        initialValues={updateInitialValues}
        onFinish={onFinish}
        btnSubmitName={btnSubmitName}
        subThemeOptions={subthemeOptions}
        onValuesChange={onValuesChange}
        foundClient={foundClient}
        eventHandles={{
          [EventKeys.project]: {
            select: handleSelectProject,
            search: handleSearchProject,
            searchChildren: handleSearchChildrenProject,
          },
          [EventKeys.client]: {
            search: handleSearchClient,
            select: handleSelectClient,
          },
        }}
        visibleFields={{
          [EventKeys.project]: visibleProjectField,
          [EventKeys.client]: !!foundClient,
          [EventKeys.responsible]: !!computedSubTheme,
          [EventKeys.exmManCode]: visibleExmManCodeField,
          ...visibleFields,
        }}
        loadingFields={{ [EventKeys.project]: isProjectLoading }}
        disabledFields={{
          [EventKeys.subTheme]: true,
          [EventKeys.client]: disabledClientField,
          [EventKeys.responsible]: disableResponsible,
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

export const EventUpdateDrawer: React.FC<IEventUpdateDrawerProps> = memo(
  ({ isOpen, onClose, ...props }: IEventUpdateDrawerProps) => (
    <Drawer title='Редактирование события' open={isOpen} onClose={onClose} destroyOnClose>
      <EventUpdateForm onClose={onClose} {...props} />
    </Drawer>
  ),
);

EventUpdateForm.displayName = 'EventUpdateForm';
EventUpdateDrawer.displayName = 'EventUpdateDrawer';
