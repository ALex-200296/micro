import { IFormItemProps,shortYearSlashedFormat } from '@shared/ui';
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
  extCode: 'extCode',
  responsible: 'responsible',
  dateCreate: 'dateCreate',
  dateChange: 'dateChange',
  currentStatus: 'currentStatus',
} as const;

export const formItemProps: Record<keyof typeof ProjectResponseFields, Omit<IFormItemProps, 'children'>> = {
  [ProjectResponseFields.extCode]: {
    label: 'Регистрационный номер проекта',
    id: 'extCode',
    name: 'extCode',
    rules,
  },
  [ProjectResponseFields.responsible]: {
    label: 'Ответственный за проект',
    id: 'responsible',
    name: 'responsible',
    rules,
  },
  [ProjectResponseFields.currentStatus]: {
    label: 'Статус ЭТМ в проекте',
    id: 'currentStatus',
    name: 'currentStatus',
    rules,
  },
  [ProjectResponseFields.dateChange]: {
    label: 'Дата присвоения статуса ЭТМ в проекте',
    id: 'dateChange',
    name: 'dateChange',
    rules,
    className: styles.date_picker_form_item,
  },
  [ProjectResponseFields.dateCreate]: {
    label: 'Дата регистрации ЭТМ в проекте',
    id: 'dateCreate',
    name: 'dateCreate',
    rules,
    className: styles.date_picker_form_item,
  },
};
