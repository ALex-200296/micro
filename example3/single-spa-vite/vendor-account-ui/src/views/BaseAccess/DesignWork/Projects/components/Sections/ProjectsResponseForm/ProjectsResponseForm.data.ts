import { IFormItemProps, shortYearSlashedFormat } from '@shared/ui';
import dayjs, { Dayjs } from 'dayjs';

import { InitialValues } from './ProjectsResponseForm.types';

import styles from './ProjectsResponseForm.module.scss';

const formDate = (date: Dayjs | null) => {
  return dayjs(date).isValid() ? dayjs(date).format(shortYearSlashedFormat) : null;
};

export const formRequestBody = (values: InitialValues) => {
  const { responsible, extCode, currentStatus, dateCreate, dateChange } = values;
  const extDateCreate = formDate(dateCreate);
  const extDateChange = formDate(dateChange);
  return `exm_mancode=${responsible}&extCode=${extCode}&extStatus=${currentStatus}&extDateChange=${extDateChange}&extDateCreate=${extDateCreate}`;
};

export const dataTestId = 'projects-response-form';
const rules = [{ required: true, message: 'Обязательное поле' }];

export const ProjectResponseFields = {
  EXT_CODE: 'extCode',
  RESPONSIBLE: 'responsible',
  DATE_CREATE: 'dateCreate',
  DATE_CHANGE: 'dateChange',
  CURRENT_STATUS: 'currentStatus',
} as const;

type ProjectResponseFieldsType = (typeof ProjectResponseFields)[keyof typeof ProjectResponseFields];

export const formItemProps: Record<ProjectResponseFieldsType, Omit<IFormItemProps, 'children'>> = {
  [ProjectResponseFields.EXT_CODE]: {
    label: 'Регистрационный номер проекта',
    id: 'extCode',
    name: 'extCode',
    rules,
  },
  [ProjectResponseFields.RESPONSIBLE]: {
    label: 'Ответственный за проект',
    id: 'responsible',
    name: 'responsible',
    rules,
  },
  [ProjectResponseFields.CURRENT_STATUS]: {
    label: 'Статус ЭТМ в проекте',
    id: 'currentStatus',
    name: 'currentStatus',
    rules,
  },
  [ProjectResponseFields.DATE_CHANGE]: {
    label: 'Дата присвоения статуса ЭТМ в проекте',
    id: 'dateChange',
    name: 'dateChange',
    rules,
    className: styles.date_picker_form_item,
  },
  [ProjectResponseFields.DATE_CREATE]: {
    label: 'Дата регистрации ЭТМ в проекте',
    id: 'dateCreate',
    name: 'dateCreate',
    rules,
    className: styles.date_picker_form_item,
  },
};
