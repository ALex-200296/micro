import { ICliRole } from '@app/store/project/project.types';
import { usersLkpAccess } from '@app/store/user/user.types';
import { IFilesWithNumState } from '@features/common/ui';
import { IPostCalendarActionState } from '@middleware/calendar/calendar.types';
import { FileType, getUniqueObjArray,ruleForFileSize } from '@shared/lib';
import { shortTimeDottedFormat, shortYearSlashedFormat } from '@shared/ui';
import { FormItemProps } from 'antd';
import dayjs from 'dayjs';

import {
  EventKeys,
  FormItemsPropsType,
  GetClientSelectOptionsType,
  GetResponsibleSelectOptionsType,
  IDisabledFields,
  IEventInitialValues,
  IGetObjectForEventTask,
  IVisibleFields,
  NestedEventKeys,
} from './EventForm.types';

import styles from './EventForm.module.scss';

export const initialValues: IEventInitialValues = {
  [EventKeys.date]: null,
  [EventKeys.rangeTime]: [],
  [EventKeys.subTheme]: null,
  [EventKeys.project]: '',
  [EventKeys.client]: null,
  [EventKeys.responsible]: null,
  [EventKeys.exmManCode]: [],
  [EventKeys.status]: null,
  [EventKeys.task]: '',
  [EventKeys.files]: {
    file: null,
    fileList: [],
  },
};

const projectCode: string[] = ['ВТ9920', 'ВТ9930'];
const clientCode = [
  { isProject: true, code: 'ВТ9920' },
  { isProject: false, code: 'ВТ9915' },
];

export const dataTestId = 'diary-meeting-form';

export const hasProject = (code: string) => projectCode.includes(code);
export const findClient = (code: string) => clientCode.find((client) => client.code === code);
export const hasTripartiteEvents = (code: string) => code === 'ВТ9915';
export const projectFieldNames = { label: 'name', value: 'id' };
export const successSubProjectProps: Omit<FormItemProps, 'children'> = { hasFeedback: true, validateStatus: 'success' };
export const errorSubProjectProps: Omit<FormItemProps, 'children'> = { hasFeedback: false };

type GetFormItemsPropsType = (argument: {
  exmManCodeOptions: IEventInitialValues['exmManCode'];
  foundClient?: { isProject: boolean; code: string };
  responsibleOptions?: IEventInitialValues['responsible'][];
  otherProps?: Partial<Record<(typeof EventKeys)[keyof typeof EventKeys], Omit<FormItemProps, 'children'>>>;
}) => FormItemsPropsType;

export const getFormItemsProps: GetFormItemsPropsType = ({
  foundClient,
  responsibleOptions = [],
  exmManCodeOptions = [],
  otherProps,
}) => ({
  [EventKeys.date]: {
    name: EventKeys.date,
    label: 'Дата планируемая',
    labelType: 'float',
    rules: [{ required: true, message: '' }],
  },
  [EventKeys.rangeTime]: {
    name: EventKeys.rangeTime,
    rules: [{ required: true, type: 'array', message: '' }],
  },
  [EventKeys.subTheme]: {
    name: EventKeys.subTheme,
    label: 'Раздел',
    labelType: 'float',
    rules: [{ required: true, message: '' }],
  },
  [EventKeys.project]: {
    name: EventKeys.project,
    label: 'Номер проекта',
    labelType: 'float',
    required: true,
    className: styles.project_form_item,
    rules: [
      ({ getFieldValue }) => ({
        validator: (_, value) => {
          if (getFieldValue(EventKeys.subTheme) && hasProject(getFieldValue(EventKeys.subTheme)[NestedEventKeys.value]))
            return value ? Promise.resolve() : Promise.reject('');
          return Promise.resolve();
        },
      }),
    ],
    ...(otherProps ? otherProps[EventKeys.project] : {}),
  },
  [EventKeys.client]: {
    name: EventKeys.client,
    label: 'Пригласить клиента',
    labelType: 'float',
    help: !foundClient?.isProject ? 'Введите название или ИНН клиента' : '',
    required: true,
    rules: [
      ({ getFieldValue }) => ({
        validator: (_, value) => {
          if (
            getFieldValue(EventKeys.subTheme) &&
            findClient(getFieldValue(EventKeys.subTheme)[NestedEventKeys.value])
          ) {
            return value?.[NestedEventKeys.value] ? Promise.resolve() : Promise.reject('');
          }
          return Promise.resolve();
        },
      }),
    ],
    ...(otherProps ? otherProps[EventKeys.client] : {}),
  },
  [EventKeys.responsible]: {
    name: EventKeys.responsible,
    label: 'Сотрудник ЭТМ',
    labelType: 'float',
    normalize: (value: string) => {
      const options = responsibleOptions.find((option) => option?.value === value);
      return { label: options?.label || '', value: options?.value || '', classCode: options?.classCode || '' };
    },
    rules: [{ required: true, message: '' }],
    ...(otherProps ? otherProps[EventKeys.responsible] : {}),
  },
  [EventKeys.exmManCode]: {
    name: EventKeys.exmManCode,
    label: 'Сотрудник поставщика',
    labelType: 'float',
    rules: [{ required: true, type: 'array', min: 1, message: '' }],
    normalize: (selectedOptions: IEventInitialValues['exmManCode']) => {
      return selectedOptions.map((selectedOption) =>
        exmManCodeOptions.find((option) => selectedOption.value === option.value),
      );
    },
  },
  [EventKeys.status]: {
    name: EventKeys.status,
    label: 'Статус',
    labelType: 'float',
  },
  [EventKeys.task]: {
    name: EventKeys.task,
    label: 'Текст',
    labelType: 'float',
    rules: [{ required: true, message: '' }],
  },
  [EventKeys.files]: {
    name: EventKeys.files,
    inputType: 'file',
    rules: [
      {
        validator: (_, value: FileType) => ruleForFileSize(_, value),
      },
    ],
  },
});

export const getSelectOptions = <T>(array: T[], label: keyof T, value: keyof T) =>
  array.map((option) => ({ label: option[label], value: option[value] }));

export const getVisibleFields = (obj?: IVisibleFields): IVisibleFields => ({
  [EventKeys.project]: true,
  [EventKeys.client]: true,
  [EventKeys.responsible]: true,
  [EventKeys.exmManCode]: true,
  [EventKeys.status]: true,
  [EventKeys.files]: true,
  ...obj,
});

export const getDisabledFields = (obj?: IDisabledFields): IDisabledFields => ({
  [EventKeys.project]: false,
  [EventKeys.client]: false,
  [EventKeys.responsible]: false,
  [EventKeys.subTheme]: false,
  ...obj,
});

export const getCliRolesFromProject = (cliRole?: ICliRole[]) => {
  const object = { projectCliRolesHaveManCode: [], projectCliRolesHaveCliCode: [] };
  if (cliRole)
    return cliRole.reduce<{ projectCliRolesHaveManCode: ICliRole[]; projectCliRolesHaveCliCode: ICliRole[] }>(
      (accum, elem) => {
        if (elem.manCode) return { ...accum, projectCliRolesHaveManCode: [...accum.projectCliRolesHaveManCode, elem] };
        if (elem.cliCode) return { ...accum, projectCliRolesHaveCliCode: [...accum.projectCliRolesHaveCliCode, elem] };
        return accum;
      },
      object,
    );
  return object;
};

export const getClientSelectOptions: GetClientSelectOptionsType = ({
  infoSearchClients,
  projectCliRolesHaveCliCode,
  isProject,
}) => {
  const selectOptions = isProject
    ? projectCliRolesHaveCliCode.map(({ cliCode, cliName }) => ({ label: cliName || '', value: cliCode || '' }))
    : infoSearchClients.map(({ code, name }) => ({ label: name || '', value: code || '' }));
  return getUniqueObjArray(selectOptions, NestedEventKeys.value);
};

export const getPmeComDocForTask = (files: File[], numForFiles: IFilesWithNumState[]) => {
  const getNameFile = (file?: IFilesWithNumState) =>
    `${file?.attach}$${file?.parentName}_${file?.numId}.${file?.extension}`;

  return files
    .map((file) => `${getNameFile(numForFiles.find(({ parentName }) => file.name.includes(parentName)))}`)
    .join(',');
};

export const getResponsibleSelectOptions: GetResponsibleSelectOptionsType = ({
  arrManagerKuCp,
  infoSearchMain,
  projectCliRolesHaveManCode,
  subTheme = '',
}) => {
  if (hasProject(subTheme))
    return {
      responsibleSelectOptions: projectCliRolesHaveManCode.map(({ manCode, manName, departCode }) => ({
        label: manName || '',
        value: manCode || '',
        classCode: departCode || '',
      })),
      disableResponsible: !projectCliRolesHaveManCode.length,
    };
  if (subTheme === 'ВТ9915')
    return {
      responsibleSelectOptions: infoSearchMain.map(({ code, value, class37 }) => ({
        label: value || '',
        value: code || '',
        classCode: class37 || '',
      })),
      disableResponsible: !infoSearchMain.length,
    };

  return {
    responsibleSelectOptions: arrManagerKuCp.map(({ ManagerFIO, ManagerCode, ClassCode37 }) => ({
      label: ManagerFIO || '',
      value: ManagerCode || '',
      classCode: ClassCode37 || '',
    })),
    disableResponsible: false,
  };
};

export const getObjectForEventTask = ({
  date,
  rangeTime,
  subTheme,
  project,
  client,
  exmManCode,
  responsible,
  status,
  task,
  files,
  manCode,
  ofic,
  pme_theme,
  pme_type,
  pr_meetingRowid,
  request_method,
  isProject,
  userLkp,
}: IGetObjectForEventTask): IPostCalendarActionState => {
  const exmManCodeData =
    userLkp.access !== usersLkpAccess.Jun ? exmManCode : [{ cliCode: userLkp['cli-code'], value: userLkp.exm_mancode }];
  return {
    pme_datep: dayjs(date).format(shortYearSlashedFormat),
    pme_timep: rangeTime[0] ? dayjs(rangeTime[0]).format(shortTimeDottedFormat) : '',
    pme_endtimep: dayjs(rangeTime[1]).format(shortTimeDottedFormat),
    pme_subtheme: subTheme ? subTheme.value : '',
    obj_type: isProject ? 'П' : '',
    obj_id: isProject ? project?.prj_code || '' : '',
    cli_code: [...exmManCodeData.map(({ cliCode }) => cliCode), ...(client ? [client.value] : [])].join(','),
    man_code: isProject ? responsible?.value || '' : `${manCode},${responsible?.value || ''}`,
    pmp_class37: isProject ? '' : `${ofic},${responsible ? responsible.classCode.substring(0, 5) : ''}`,
    exm_mancode: exmManCodeData.map(({ value }) => value).join(','),
    pme_state: status ? status.value : 'appoint',
    pme_task: task,
    pme_comdoc: files,
    pme_extuser: 'Yes',
    pme_type: pme_type,
    pme_theme: pme_theme,
    pr_meetingRowid: pr_meetingRowid,
    request_method: request_method,
  };
};
