import { IInfoSearchState } from '@app/store/info/info.types';
import { ICliRole, IProjectDetailsData, IProjectsDataForTable } from '@app/store/project/project.types';
import { IArrManagerState, IUsersLkpState } from '@app/store/user/user.types';
import { FileType } from '@shared/lib';
import { IFormItemProps } from '@shared/ui';
import { FormInstance, UploadFile } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { Dayjs } from 'dayjs';

export const EventKeys = {
  date: 'date',
  rangeTime: 'rangeTime',
  subTheme: 'subTheme',
  project: 'project',
  client: 'client',
  responsible: 'responsible',
  exmManCode: 'exmManCode',
  status: 'status',
  task: 'task',
  files: 'files',
} as const;

export const NestedEventKeys = {
  label: 'label',
  value: 'value',
} as const;

export interface IClientinfo {
  cliCode?: string;
  cliName?: string;
}

export interface IResponsibleInfo {
  manName: string;
  manCode: string;
  classCode: string;
}

export interface ISelectOption {
  [NestedEventKeys.label]: string;
  [NestedEventKeys.value]: string;
}

export interface IEventInitialValues {
  [EventKeys.date]: Dayjs | null;
  [EventKeys.rangeTime]: [Dayjs, Dayjs] | [];
  [EventKeys.subTheme]: ISelectOption | null;
  [EventKeys.project]: string;
  [EventKeys.client]: ISelectOption | null;
  [EventKeys.responsible]: (ISelectOption & { classCode: string }) | null;
  [EventKeys.exmManCode]: (ISelectOption & { cliCode: string })[];
  [EventKeys.status]: ISelectOption | null;
  [EventKeys.task]: string;
  [EventKeys.files]: FileType;
}

type MeetingValuesType = (typeof EventKeys)[keyof typeof EventKeys];

export type FormItemsPropsType = { [key in MeetingValuesType]: Omit<IFormItemProps, 'children'> };

export interface IVisibleFields {
  [EventKeys.project]?: boolean;
  [EventKeys.client]?: boolean;
  [EventKeys.responsible]?: boolean;
  [EventKeys.exmManCode]?: boolean;
  [EventKeys.status]?: boolean;
  [EventKeys.files]?: boolean;
}

export interface IDisabledFields {
  [EventKeys.project]?: boolean;
  [EventKeys.client]?: boolean;
  [EventKeys.responsible]?: boolean;
  [EventKeys.subTheme]?: boolean;
}

export interface ILoadingFields {
  [EventKeys.project]?: boolean;
}

export interface IEventHandles {
  [EventKeys.project]?: {
    search?: (value: string) => void;
    searchChildren?: (
      value: string,
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.MouseEvent<HTMLElement, MouseEvent>
        | React.KeyboardEvent<HTMLInputElement>
        | undefined,
    ) => void;
    select?: (value: string, option: IProjectsDataForTable) => void;
  };
  [EventKeys.client]?: {
    search?: (value: string) => void;
    select?: (value: ISelectOption, option?: ISelectOption) => void;
  };
  [EventKeys.responsible]?: (value: string, option: ISelectOption & { classCode: string }) => void;
}

export interface IGetObjectForEventTask extends Omit<IEventInitialValues, 'project' | 'files'> {
  [EventKeys.project]?: IProjectDetailsData;
  [EventKeys.files]: string;
  ofic: string;
  manCode: string;
  isProject: boolean;
  pme_type: string;
  pme_theme: string;
  pr_meetingRowid: string;
  request_method?: string;
  userLkp: IUsersLkpState;
}

export type GetClientSelectOptionsType = (obj: {
  projectCliRolesHaveCliCode: ICliRole[];
  infoSearchClients: IInfoSearchState[];
  isProject: boolean;
}) => ISelectOption[];

export type GetResponsibleSelectOptionsType = (obj: {
  projectCliRolesHaveManCode: ICliRole[];
  arrManagerKuCp: IArrManagerState[];
  infoSearchMain: IInfoSearchState[];
  subTheme?: string;
}) => { responsibleSelectOptions: (ISelectOption & { classCode: string })[]; disableResponsible: boolean };

export interface IEventFormProps {
  initialValues: Omit<IEventInitialValues, 'files'> & {
    [EventKeys.files]?: {
      file: IEventInitialValues['files']['file'];
      fileList: UploadFile[] | IEventInitialValues['files']['fileList'];
    };
  };
  onFinish: (values: IEventInitialValues) => void;
  onCancel: () => void;
  btnSubmitName: string;
  subThemeOptions: DefaultOptionType[];
  form?: FormInstance<any>;
  onValuesChange?: (values: Partial<IEventInitialValues>) => void;
  visibleFields?: IVisibleFields;
  eventHandles?: IEventHandles;
  disabledFields?: IDisabledFields;
  loadingFields?: ILoadingFields;
  clientSelectOptions?: ISelectOption[];
  responsibleSelectOptions?: (ISelectOption & { classCode: string })[];
  exmManCodeSelectOptions?: (ISelectOption & { cliCode: string })[];
  statusSelectOptions?: Partial<ISelectOption>[];
  projectOptions?: IProjectsDataForTable[];
  foundClient?: { isProject: boolean; code: string };
  otherProps?: Partial<Record<(typeof EventKeys)[keyof typeof EventKeys], Omit<IFormItemProps, 'children'>>>;
}
