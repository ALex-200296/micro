import React from 'react';
import { calendarFilterLabels, calendarFilters } from '@app/store/calendar/calendar.data';
import { CodeInfoSearch, IInfoSearchState, TypeInfoSearch } from '@app/store/info/info.types';
import { IUsersLkpState } from '@app/store/user/user.types';
import { IManualsData } from '@features/common/ui/Manuals/Manuals.types';
import { IFormItemProps } from '@shared/ui/atoms/Form/FormItem/FormItem.types';
import { filterOption } from '@shared/ui/atoms/Inputs/Inputs.data';
import { docsPath } from '@views/BaseAccess/BaseAccessPage.data';
import { Select } from 'antd';

import { IFilterListState } from './DiaryPage.types';

export const dairyPageTitle = 'Выберите период';

export const partitionFilterRequestData = {
  type: TypeInfoSearch.class,
  code: CodeInfoSearch.code51,
  len_lim: 6,
};

export const ruCollator = new Intl.Collator('ru-RU');
export const getCalendarFilterFormItems = ({
  statusListOptions,
  vendorEmployeeListOptions,
  partitionListOptions,
}: {
  statusListOptions: IInfoSearchState[];
  vendorEmployeeListOptions: IUsersLkpState[];
  partitionListOptions: IFilterListState[];
}): IFormItemProps[] => {
  return [
    {
      name: calendarFilters.exmManCode,
      label: calendarFilterLabels[calendarFilters.exmManCode],
      labelType: 'float',
      children: (
        <Select
          showSearch
          filterOption={(inputValue, option) => filterOption(inputValue, option, 'fio')}
          options={vendorEmployeeListOptions}
          allowClear
          fieldNames={{
            value: 'exm_mancode',
            label: 'fio',
          }}
        />
      ),
    },
    {
      name: calendarFilters.pme_state,
      label: calendarFilterLabels[calendarFilters.pme_state],
      labelType: 'float',
      children: (
        <Select
          options={statusListOptions}
          allowClear
          fieldNames={{
            value: 'code',
          }}
        />
      ),
    },
    {
      name: calendarFilters.pme_subtheme,
      label: calendarFilterLabels[calendarFilters.pme_subtheme],
      labelType: 'float',
      children: <Select options={partitionListOptions} allowClear />,
    },
  ];
};

export const heading = 'Ежедневник';
export const manualsData: IManualsData[] = [
  {
    name: 'Регламент',
    data: [
      {
        name: 'Регламент работы',
        to: `${docsPath}/regulation_diary.docx`,
        downLoadName: 'Регламент iPRO OneTeam (подраздел Ежедневник).docx',
      },
    ],
  },
  {
    name: 'Инструкции',
    data: [
      {
        name: 'Инструкция по работе в разделе',
        to: `${docsPath}/instruction_diary.docx`,
        downLoadName: 'Инструкция для подраздела Ежедневник.docx',
      },
      {
        name: 'Обзор обновлений iPRO OneTeam',
        video: true,
        to: `${docsPath}/review_new.mp4`,
        thumbnail: `${docsPath}/review_new.png`,
      },
      {
        name: 'Обзор раздела «Ежедневник»',
        video: true,
        to: `${docsPath}/project_calendar.mp4`,
        thumbnail: `${docsPath}/project_calendar.png`,
      },
      {
        name: 'Инструкция для подписки на календарь в Outlook',
        video: true,
        to: `${docsPath}/outlook.mp4`,
        thumbnail: `${docsPath}/outlook.png`,
      },
      {
        name: 'Инструкция для подписки на календарь в iOS',
        video: true,
        to: `${docsPath}/iOS.mp4`,
        thumbnail: `${docsPath}/iOS.png`,
      },
      {
        name: 'Инструкция для подписки на календарь в Android',
        video: true,
        to: `${docsPath}/Android.mp4`,
        thumbnail: `${docsPath}/Android.png`,
      },
    ],
  },
];

export const calendarFilterConfig = {
  [calendarFilters.exmManCode]: {
    labelPropName: 'fio',
    valuePropName: 'exm_mancode',
  },
  [calendarFilters.pme_state]: {
    labelPropName: 'label',
    valuePropName: 'code',
  },
  [calendarFilters.pme_subtheme]: {
    labelPropName: 'label',
    valuePropName: 'value',
  },
};
