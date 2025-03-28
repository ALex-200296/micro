import React from 'react';
import { ICalendarEventsState } from '@app/store/calendar/calendar.types';
import { IInfoSearchState } from '@app/store/info/info.types';
import { FiltersFormItemsType } from '@entities/common/ui';
import { CollapseContent, DateRangePicker, dottedFormat, ICollapseProps, timeFormat } from '@shared/ui';
import StatusTag from '@views/BaseAccess/components/StatusTag/StatusTag.component';
import { Select } from 'antd';
import dayjs from 'dayjs';

import { dataTestId } from '../../SubmittedProjects.data';

export const getEventsCollapseConfig = (
  eventsData: ICalendarEventsState[],
  handleOpenEventForm: (id: string) => void,
): ICollapseProps['items'] =>
  eventsData.map((elem) => ({
    label: elem.title,
    subLabel: dayjs(elem.start).format(dottedFormat),
    key: elem.id,
    extra: elem.status && <StatusTag status={elem.status} statusCode={elem.statusCode} />,
    children: (
      <CollapseContent
        content={[
          {
            label: 'Дата',
            children: dayjs(elem.start).format(dottedFormat),
          },
          {
            label: 'Время',
            children: dayjs(elem.start).format(timeFormat) + ' - ' + dayjs(elem.end).format(timeFormat),
          },
          {
            label: 'Текст задачи',
            children: elem.taskText,
          },
        ]}
        contentAction={{
          onClick: () => handleOpenEventForm(elem.id),
          actionText: 'Открыть событие',
        }}
      />
    ),
  }));

export const EventsFilter = {
  DATES: 'dateRange',
  STATUS: 'pme_state',
} as const;

export const getEventsFilterItems = (
  statusFilterData: IInfoSearchState[],
  onStatusFocus: () => void,
): FiltersFormItemsType => [
  {
    name: EventsFilter.STATUS,
    label: 'Статус',
    labelType: 'float',
    children: <Select options={statusFilterData} fieldNames={{ value: 'code' }} onFocus={onStatusFocus} allowClear />,
  },
  {
    name: EventsFilter.DATES,
    children: <DateRangePicker allowClear={false} allowEmpty={[false, false]} dataTestId={dataTestId} />,
  },
];
