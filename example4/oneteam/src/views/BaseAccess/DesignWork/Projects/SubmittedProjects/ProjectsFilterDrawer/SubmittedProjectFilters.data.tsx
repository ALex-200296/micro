import React from 'react';
import { IInfoSearchState } from '@app/store/info/info.types';
import { AddressList, FiltersFormItemsType } from '@entities/common/ui';
import { dottedFormat, filterOption } from '@shared/ui';
import { DatePicker, Input, InputRef, Select } from 'antd';

import { ProjectFiltersFieldsTypes, SubmittedProjectsFormValues } from './SubmittedProjectsFilter.types';

import styles from './SubmittedProjectsFilter.module.scss';

export const filtersSwitchTitle = 'Поиск по номеру проекта поставщика';

export const ProjectFiltersFields: Omit<ProjectFiltersFieldsTypes, 'prjAddr'> = {
  [SubmittedProjectsFormValues.extCode]: {
    label: 'Регистрационный номер проекта поставщика',
    labelType: 'float',
    id: SubmittedProjectsFormValues.extCode,
    name: SubmittedProjectsFormValues.extCode,
    help: 'При фильтрации по номеру проекта прочие фильтры будут сброшены',
  },
  [SubmittedProjectsFormValues.mnfDCode]: {
    label: 'Регистрационный номер проекта ЭТМ',
    labelType: 'float',
    id: SubmittedProjectsFormValues.mnfDCode,
    name: SubmittedProjectsFormValues.mnfDCode,
  },
  [SubmittedProjectsFormValues.prjName]: {
    label: 'Наименование проекта',
    labelType: 'float',
    id: SubmittedProjectsFormValues.prjName,
    name: SubmittedProjectsFormValues.prjName,
  },
  [SubmittedProjectsFormValues.prjSupply]: {
    label: 'Дата реализации',
    labelType: 'float',
    id: SubmittedProjectsFormValues.prjSupply,
    name: SubmittedProjectsFormValues.prjSupply,
  },
  [SubmittedProjectsFormValues.exmManCode]: {
    label: 'Сотрудник поставщика',
    labelType: 'float',
    id: SubmittedProjectsFormValues.exmManCode,
    name: SubmittedProjectsFormValues.exmManCode,
  },
  [SubmittedProjectsFormValues.subPrjStatus]: {
    label: 'Стадия проекта',
    labelType: 'float',
    id: SubmittedProjectsFormValues.subPrjStatus,
    name: SubmittedProjectsFormValues.subPrjStatus,
  },
};

interface getProjectsFilterItemsArgs {
  exmManCodeList: { value: string; label: string }[];
  showExmManCodeList: boolean;
  subPrjStatusOptions: IInfoSearchState[];
  extCodeSearchOnly: boolean;
  inputRef?: React.Ref<InputRef>;
}
export const getProjectsFilterItems = ({
  exmManCodeList,
  showExmManCodeList,
  subPrjStatusOptions,
  extCodeSearchOnly,
  inputRef,
}: getProjectsFilterItemsArgs): FiltersFormItemsType => [
  {
    ...ProjectFiltersFields[SubmittedProjectsFormValues.extCode],
    children: <Input ref={inputRef} disabled={!extCodeSearchOnly} />,
  },
  ...(showExmManCodeList
    ? [
        {
          ...ProjectFiltersFields[SubmittedProjectsFormValues.exmManCode],
          children: (
            <Select
              options={exmManCodeList}
              allowClear
              showSearch
              filterOption={(inputValue, option) => filterOption(inputValue, option, 'label')}
              disabled={extCodeSearchOnly}
            />
          ),
        },
      ]
    : []),
  {
    ...ProjectFiltersFields[SubmittedProjectsFormValues.subPrjStatus],
    children: (
      <Select fieldNames={{ value: 'code' }} options={subPrjStatusOptions} allowClear disabled={extCodeSearchOnly} />
    ),
  },
  {
    ...ProjectFiltersFields[SubmittedProjectsFormValues.mnfDCode],
    children: <Input disabled={extCodeSearchOnly} />,
  },
  {
    ...ProjectFiltersFields[SubmittedProjectsFormValues.prjName],
    labelType: 'float',
    children: <Input disabled={extCodeSearchOnly} />,
  },
  {
    ...ProjectFiltersFields[SubmittedProjectsFormValues.prjSupply],
    children: (
      <DatePicker format={dottedFormat} placeholder='' className={styles.date_picker} disabled={extCodeSearchOnly} />
    ),
  },
  {
    name: 'addressSearch',
    label: 'Адрес',
    labelType: 'float',
    children: <Input disabled={extCodeSearchOnly} />,
    extra: !extCodeSearchOnly && <AddressList />,
  },
];
