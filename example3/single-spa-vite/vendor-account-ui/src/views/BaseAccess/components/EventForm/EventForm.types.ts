import { IInfoSearchState } from '@app/store/info/info.types';
import { ICliRole, IProjectDetailsData, IProjectsDataForTable } from '@app/store/project/project.types';
import { IArrManagerState, IUsersLkpState } from '@app/store/user/user.types';
import { FileType } from '@shared/lib';
import { IFormItemProps } from '@shared/ui';
import { FormInstance, UploadFile } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { Dayjs } from 'dayjs';

export const EventKeys = {
  DATE: 'date',
  RANGE_TIME: 'rangeTime',
  SUB_THEME: 'subTheme',
  PROJECT: 'project',
  CLIENT: 'client',
  RESPONSIBLE: 'responsible',
  EXM_MAN_CODE: 'exmManCode',
  STATUS: 'status',
  TASK: 'task',
  FILES: 'files',
} as const;

export const NestedEventKeys = {
  LABEL: 'label',
  VALUE: 'value',
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
  [NestedEventKeys.LABEL]: string;
  [NestedEventKeys.VALUE]: string;
}

export interface IEventInitialValues {
  [EventKeys.DATE]: Dayjs | null;
  [EventKeys.RANGE_TIME]: [Dayjs, Dayjs] | [];
  [EventKeys.SUB_THEME]: ISelectOption | null;
  [EventKeys.PROJECT]: string;
  [EventKeys.CLIENT]: ISelectOption | null;
  [EventKeys.RESPONSIBLE]: (ISelectOption & { classCode: string }) | null;
  [EventKeys.EXM_MAN_CODE]: (ISelectOption & { cliCode: string })[];
  [EventKeys.STATUS]: ISelectOption | null;
  [EventKeys.TASK]: string;
  [EventKeys.FILES]: FileType;
}

type MeetingValuesType = (typeof EventKeys)[keyof typeof EventKeys];

export type FormItemsPropsType = { [key in MeetingValuesType]: Omit<IFormItemProps, 'children'> };

export interface IVisibleFields {
  [EventKeys.PROJECT]?: boolean;
  [EventKeys.CLIENT]?: boolean;
  [EventKeys.RESPONSIBLE]?: boolean;
  [EventKeys.EXM_MAN_CODE]?: boolean;
  [EventKeys.STATUS]?: boolean;
  [EventKeys.FILES]?: boolean;
}

export interface IDisabledFields {
  [EventKeys.PROJECT]?: boolean;
  [EventKeys.CLIENT]?: boolean;
  [EventKeys.RESPONSIBLE]?: boolean;
  [EventKeys.SUB_THEME]?: boolean;
}

export interface ILoadingFields {
  [EventKeys.PROJECT]?: boolean;
}

export interface IEventHandles {
  [EventKeys.PROJECT]?: {
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
  [EventKeys.CLIENT]?: {
    search?: (value: string) => void;
    select?: (value: ISelectOption, option?: ISelectOption) => void;
  };
  [EventKeys.RESPONSIBLE]?: (value: string, option: ISelectOption & { classCode: string }) => void;
}

export interface IGetObjectForEventTask extends Omit<IEventInitialValues, 'project' | 'files'> {
  [EventKeys.PROJECT]?: IProjectDetailsData;
  [EventKeys.FILES]: string;
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
    [EventKeys.FILES]?: {
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
