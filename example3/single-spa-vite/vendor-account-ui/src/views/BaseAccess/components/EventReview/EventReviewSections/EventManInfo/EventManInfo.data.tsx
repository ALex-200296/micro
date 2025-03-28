import React from 'react';
import { ICalendarEventCodeCli, ICalendarEventExecList } from '@app/store/calendar/calendar.types';
import { CollapseContent } from '@shared/ui';

import { GetCollapseItemsFuncType } from './EventManInfo.types';

export const getOrgCollapseItems: GetCollapseItemsFuncType<ICalendarEventCodeCli> = (orgList) =>
  orgList.map((organization) => ({
    label: organization.exm_fio,
    children: (
      <CollapseContent
        tableView
        content={[
          { label: 'Должность', children: organization.exw_position },
          { label: 'Мобильный телефон', children: organization.exw_phone },
          { label: 'Рабочий телефон', children: organization.exm_phonem },
        ]}
      />
    ),
  }));

export const getResponsibleCollapseItems: GetCollapseItemsFuncType<ICalendarEventExecList> = (execList) =>
  execList.map((responsible) => ({
    label: responsible.labelMan,
    children: (
      <CollapseContent
        tableView
        content={[
          { label: 'Телефон', children: responsible.phone },
          { label: 'Email', children: responsible.email },
          { label: 'Подразделение', children: responsible.labelOP },
        ]}
      />
    ),
  }));

export const SupplierExtraInfo = {
  PARTNER: 'partner',
  SUPPLIER_EMPLOYEES: 'supplierEmployees',
} as const;
