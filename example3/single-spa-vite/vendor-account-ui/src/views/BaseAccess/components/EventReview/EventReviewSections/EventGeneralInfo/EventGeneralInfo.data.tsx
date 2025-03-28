import React from 'react';
import { CalendarOutlined, ClockCircleOutlined, FileTextOutlined, ProfileOutlined } from '@ant-design/icons';
import { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ICalendarEventState } from '@app/store/calendar/calendar.types';

export const pathFile = '/upload/diary/';
const patternPath = /^\.\./;
export const getFileList = (nameFile: string) =>
  nameFile.split(',').map((pmeComdoc) => {
    const name = pmeComdoc.split('$')[1];
    return patternPath.test(name)
      ? { path: name, name: name.split('/').at(-1) }
      : { path: name.split('_').at(-1), name: name.replace(/_[a-z\d]+\./gi, '.') };
  });

export const getDescriptionsColumns = ({
  RO_theme,
  pme_datep,
  pme_timep,
  pme_endtimep,
  pme_datef,
  namePrj,
  obj_id,
  pme_result,
  obj_type,
}: ICalendarEventState): ProDescriptionsItemProps<ICalendarEventState>[] => {
  const isProject = !!(obj_id || namePrj) && obj_type === 'П';
  return [
    {
      label: (
        <span>
          <ProfileOutlined /> Направление
        </span>
      ),
      dataIndex: 'RO_theme',
      hideInDescriptions: !RO_theme,
    },
    {
      dataIndex: 'pme_datep',
      label: (
        <span>
          <CalendarOutlined /> Дата плановая
        </span>
      ),
      hideInDescriptions: !pme_datep,
    },
    {
      dataIndex: 'pme_datef',
      label: (
        <span>
          <CalendarOutlined /> Дата фактическая
        </span>
      ),
      hideInDescriptions: !pme_datef,
    },
    {
      span: 8,
      label: (
        <span>
          <ClockCircleOutlined /> Время
        </span>
      ),
      renderText: (_, { pme_timep, pme_endtimep }) => `${pme_timep} - ${pme_endtimep}`,
      hideInDescriptions: !(pme_timep || pme_endtimep),
    },
    {
      dataIndex: 'pme_result',
      label: <span>Результат</span>,
      hideInDescriptions: !pme_result,
    },
    {
      label: (
        <span>
          <FileTextOutlined /> Название проекта
        </span>
      ),
      renderText: (_, { namePrj }) => namePrj,
      hideInDescriptions: !isProject,
    },
  ];
};
