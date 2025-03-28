import React from 'react';
import { IInfoSearchState } from '@app/store/info/info.types';
import { AddressList, FiltersFormItemsType } from '@entities/common/ui';
import { dottedFormat, filterOption } from '@shared/ui';
import { DatePicker, Input, InputRef, Select } from 'antd';

import { ProjectFiltersFieldsTypes, SubmittedProjectsFormValues } from './SubmittedProjectsFilter.types';

import styles from './SubmittedProjectsFilter.module.scss';

export const filtersSwitchTitle = 'Поиск по номеру проекта поставщика';

export const ProjectFiltersFields: Omit<ProjectFiltersFieldsTypes, 'prjAddr'> = {
  [SubmittedProjectsFormValues.EXT_CODE]: {
    label: 'Регистрационный номер проекта поставщика',
    labelType: 'float',
    id: SubmittedProjectsFormValues.EXT_CODE,
    name: SubmittedProjectsFormValues.EXT_CODE,
    help: 'При фильтрации по номеру проекта прочие фильтры будут сброшены',
  },
  [SubmittedProjectsFormValues.MNF_D_CODE]: {
    label: 'Регистрационный номер проекта ЭТМ',
    labelType: 'float',
    id: SubmittedProjectsFormValues.MNF_D_CODE,
    name: SubmittedProjectsFormValues.MNF_D_CODE,
  },
  [SubmittedProjectsFormValues.PRJ_NAME]: {
    label: 'Наименование проекта',
    labelType: 'float',
    id: SubmittedProjectsFormValues.PRJ_NAME,
    name: SubmittedProjectsFormValues.PRJ_NAME,
  },
  [SubmittedProjectsFormValues.PRJ_SUPPLY]: {
    label: 'Дата реализации',
    labelType: 'float',
    id: SubmittedProjectsFormValues.PRJ_SUPPLY,
    name: SubmittedProjectsFormValues.PRJ_SUPPLY,
  },
  [SubmittedProjectsFormValues.EXM_MAN_CODE]: {
    label: 'Сотрудник поставщика',
    labelType: 'float',
    id: SubmittedProjectsFormValues.EXM_MAN_CODE,
    name: SubmittedProjectsFormValues.EXM_MAN_CODE,
  },
  [SubmittedProjectsFormValues.SUB_PRJ_STATUS]: {
    label: 'Стадия проекта',
    labelType: 'float',
    id: SubmittedProjectsFormValues.SUB_PRJ_STATUS,
    name: SubmittedProjectsFormValues.SUB_PRJ_STATUS,
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
    ...ProjectFiltersFields[SubmittedProjectsFormValues.EXT_CODE],
    children: <Input ref={inputRef} disabled={!extCodeSearchOnly} />,
  },
  ...(showExmManCodeList
    ? [
        {
          ...ProjectFiltersFields[SubmittedProjectsFormValues.EXM_MAN_CODE],
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
    ...ProjectFiltersFields[SubmittedProjectsFormValues.SUB_PRJ_STATUS],
    children: (
      <Select fieldNames={{ value: 'code' }} options={subPrjStatusOptions} allowClear disabled={extCodeSearchOnly} />
    ),
  },
  {
    ...ProjectFiltersFields[SubmittedProjectsFormValues.MNF_D_CODE],
    children: <Input disabled={extCodeSearchOnly} />,
  },
  {
    ...ProjectFiltersFields[SubmittedProjectsFormValues.PRJ_NAME],
    labelType: 'float',
    children: <Input disabled={extCodeSearchOnly} />,
  },
  {
    ...ProjectFiltersFields[SubmittedProjectsFormValues.PRJ_SUPPLY],
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
