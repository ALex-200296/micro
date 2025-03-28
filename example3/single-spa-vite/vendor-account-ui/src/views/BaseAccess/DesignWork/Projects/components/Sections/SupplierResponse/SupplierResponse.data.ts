import { IFormItemProps, shortYearSlashedFormat } from '@shared/ui';
import dayjs, { Dayjs } from 'dayjs';

import { InitialValues } from './SupplierResponse.types';

const formComment = (dateChange: string | null, dateCreate: string | null, comment: string, requestNumber: string) => {
  const comm = `Комментарий: ${comment}, `;
  const regDate = dateChange ? `Дата регистрации: ${dateCreate}, ` : '';
  const requestNum = requestNumber ? `Номер запроса: ${requestNumber}, ` : '';
  return requestNum + regDate + comm;
};

const formDate = (date: Dayjs | null) => {
  return dayjs(date).isValid() ? dayjs(date).format(shortYearSlashedFormat) : null;
};

const getValueForRequest = (value: string | null, paramName: string) =>
  value === null || value === '' ? '' : `${paramName}=${value}`;

export const formRequestBody = (values: InitialValues) => {
  const {
    projectNumber,
    projectName,
    requestNumber,
    currentStatus,
    comment,
    crmDate,
    dateCreate,
    dateChange,
    responsible,
  } = values;

  const extCRMDateCreate = formDate(crmDate);
  const extDateCreate = formDate(dateCreate);
  const extDateChange = formDate(dateChange);
  const formedComment = formComment(extDateChange, extDateCreate, comment, requestNumber);

  const requestBody = [
    getValueForRequest(requestNumber, 'requestNum'),
    getValueForRequest(projectNumber, 'extCode'),
    getValueForRequest(projectName, 'extName'),
    getValueForRequest(currentStatus, 'extStatus'),
    getValueForRequest(responsible, 'exm_mancode'),
    getValueForRequest(extDateCreate, 'extDateCreate'),
    getValueForRequest(extDateChange, 'extDateChange'),
    getValueForRequest(extCRMDateCreate, 'extCRMDateCreate'),
    getValueForRequest(formedComment, 'extComment'),
  ];
  return requestBody.filter((entry) => entry !== '').join('&');
};

export const dataTestId = 'projects-supplier-response';

export const SupplierResponseFields = {
  REQUEST_NUMBER: 'requestNumber',
  PROJECT_NUMBER: 'projectNumber',
  PROJECT_NAME: 'projectName',
  RESPONSIBLE: 'responsible',
  CRM_DATE: 'crmDate',
  DATE_CREATE: 'dateCreate',
  DATE_CHANGE: 'dateChange',
  CURRENT_STATUS: 'currentStatus',
  COMMENT: 'comment',
} as const;

type SupplierResponseFieldsType = typeof SupplierResponseFields[keyof typeof SupplierResponseFields]

const rules = [{ required: true, message: 'Обязательное поле' }];
export const formItemProps: Record<SupplierResponseFieldsType, Omit<IFormItemProps, 'children'>> = {
  [SupplierResponseFields.REQUEST_NUMBER]: {
    label: 'Номер запроса(обращения)',
    labelType: 'float',
    id: SupplierResponseFields.REQUEST_NUMBER,
    name: SupplierResponseFields.REQUEST_NUMBER,
    rules,
  },
  [SupplierResponseFields.PROJECT_NUMBER]: {
    label: 'Регистрационный номер проекта',
    labelType: 'float',
    id: SupplierResponseFields.PROJECT_NUMBER,
    name: SupplierResponseFields.PROJECT_NUMBER,
    rules,
  },
  [SupplierResponseFields.PROJECT_NAME]: {
    label: 'Название проекта',
    labelType: 'float',
    id: SupplierResponseFields.PROJECT_NAME,
    name: SupplierResponseFields.PROJECT_NAME,
    rules,
  },
  [SupplierResponseFields.RESPONSIBLE]: {
    label: 'Ответственный за проект',
    labelType: 'float',
    id: SupplierResponseFields.RESPONSIBLE,
    name: SupplierResponseFields.RESPONSIBLE,
    rules,
  },
  [SupplierResponseFields.CRM_DATE]: {
    label: 'Дата внесения проекта в CRM производителя',
    labelType: 'float',
    id: SupplierResponseFields.CRM_DATE,
    name: SupplierResponseFields.CRM_DATE,
    rules,
  },
  [SupplierResponseFields.DATE_CREATE]: {
    label: 'Дата регистрации ЭТМ в проекте',
    labelType: 'float',
    id: SupplierResponseFields.DATE_CREATE,
    name: SupplierResponseFields.DATE_CREATE,
    rules,
  },
  [SupplierResponseFields.DATE_CHANGE]: {
    label: 'Дата присвоения статуса ЭТМ в проекте',
    labelType: 'float',
    id: SupplierResponseFields.DATE_CHANGE,
    name: SupplierResponseFields.DATE_CHANGE,
    rules,
  },
  [SupplierResponseFields.CURRENT_STATUS]: {
    label: 'Статус ЭТМ в проекте',
    labelType: 'float',
    id: SupplierResponseFields.CURRENT_STATUS,
    name: SupplierResponseFields.CURRENT_STATUS,
    rules,
  },
  [SupplierResponseFields.COMMENT]: {
    label: 'Комментарий',
    labelType: 'float',
    id: SupplierResponseFields.COMMENT,
    name: SupplierResponseFields.COMMENT,
    rules,
  },
};
