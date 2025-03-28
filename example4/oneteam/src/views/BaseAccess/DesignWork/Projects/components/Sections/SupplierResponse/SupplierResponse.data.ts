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
  requestNumber: 'requestNumber',
  projectNumber: 'projectNumber',
  projectName: 'projectName',
  responsible: 'responsible',
  crmDate: 'crmDate',
  dateCreate: 'dateCreate',
  dateChange: 'dateChange',
  currentStatus: 'currentStatus',
  comment: 'comment',
} as const;

const rules = [{ required: true, message: 'Обязательное поле' }];
export const formItemProps: Record<keyof typeof SupplierResponseFields, Omit<IFormItemProps, 'children'>> = {
  [SupplierResponseFields.requestNumber]: {
    label: 'Номер запроса(обращения)',
    labelType: 'float',
    id: SupplierResponseFields.requestNumber,
    name: SupplierResponseFields.requestNumber,
    rules,
  },
  [SupplierResponseFields.projectNumber]: {
    label: 'Регистрационный номер проекта',
    labelType: 'float',
    id: SupplierResponseFields.projectNumber,
    name: SupplierResponseFields.projectNumber,
    rules,
  },
  [SupplierResponseFields.projectName]: {
    label: 'Название проекта',
    labelType: 'float',
    id: SupplierResponseFields.projectName,
    name: SupplierResponseFields.projectName,
    rules,
  },
  [SupplierResponseFields.responsible]: {
    label: 'Ответственный за проект',
    labelType: 'float',
    id: SupplierResponseFields.responsible,
    name: SupplierResponseFields.responsible,
    rules,
  },
  [SupplierResponseFields.crmDate]: {
    label: 'Дата внесения проекта в CRM производителя',
    labelType: 'float',
    id: SupplierResponseFields.crmDate,
    name: SupplierResponseFields.crmDate,
    rules,
  },
  [SupplierResponseFields.dateCreate]: {
    label: 'Дата регистрации ЭТМ в проекте',
    labelType: 'float',
    id: SupplierResponseFields.dateCreate,
    name: SupplierResponseFields.dateCreate,
    rules,
  },
  [SupplierResponseFields.dateChange]: {
    label: 'Дата присвоения статуса ЭТМ в проекте',
    labelType: 'float',
    id: SupplierResponseFields.dateChange,
    name: SupplierResponseFields.dateChange,
    rules,
  },
  [SupplierResponseFields.currentStatus]: {
    label: 'Статус ЭТМ в проекте',
    labelType: 'float',
    id: SupplierResponseFields.currentStatus,
    name: SupplierResponseFields.currentStatus,
    rules,
  },
  [SupplierResponseFields.comment]: {
    label: 'Комментарий',
    labelType: 'float',
    id: SupplierResponseFields.comment,
    name: SupplierResponseFields.comment,
    rules,
  },
};
