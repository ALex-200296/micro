import React from 'react';
import { IManualsData } from '@features/common/ui';
import { ColumnType } from '@shared/ui';
import { docsPath } from '@views/BaseAccess/BaseAccessPage.data';
import { Tooltip, Typography } from 'antd';

import styles from './Projects.module.scss';
export const heading = 'Проекты';
const { Link } = Typography;

export const manualsData: IManualsData[] = [
  {
    name: 'Регламент',
    data: [
      {
        name: 'Регламент работы',
        to: `${docsPath}/regulation_project.docx`,
        downLoadName: 'Регламент iPRO OneTeam (раздел Проектная работа).docx',
      },
    ],
  },
  {
    name: 'Инструкции',
    data: [
      {
        name: 'Инструкция по работе в разделе',
        to: `${docsPath}/instruction_project.docx`,
        downLoadName: 'Инструкция для раздела Проектная работа.docx',
      },
      {
        name: 'Обзор раздела «Проектная работа»',
        video: true,
        to: `${docsPath}/project_calendar.mp4`,
        thumbnail: `${docsPath}/project_calendar.png`,
      },
    ],
  },
];
export const getProjectsColumnsConfig = <T,>(
  formatNumber: (entry: number) => void,
  isProjectRequestsTab: boolean = false,
): ColumnType<T>[] => [
  ...(isProjectRequestsTab
    ? [
        {
          title: 'Тип запроса',
          dataIndex: 'type',
          key: 'type',
          width: '9%',
          renderText: (data: string) => <span className={styles.req_type_cell}>{data}</span>,
        },
      ]
    : []),
  {
    title: 'Рег. номер проекта',
    dataIndex: 'reg_code',
    key: 'reg_code',
    width: '9%',
    ellipsis: { showTitle: false },
    renderText: (number) =>
      number.length > 15 ? (
        <Tooltip placement='topLeft' title={number}>
          <Link className={styles.table_cell} data-testid='tooltip-projects'>
            <div className={styles.reg_code_cell}>{number}</div>
          </Link>
        </Tooltip>
      ) : (
        <Link className={styles.table_cell}>{number}</Link>
      ),
  },
  {
    title: 'Рег. номер проекта ЭТМ',
    dataIndex: 'reg_num',
    key: 'reg_num',
    width: '6%',
  },
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: 'name',
    width: '20rem',
  },
  ...(!isProjectRequestsTab
    ? [
        {
          title: 'Статус взаимодействия',
          dataIndex: 'status',
          key: 'status',
          width: '9%',
        },
      ]
    : []),
  {
    title: 'Подразделение',
    dataIndex: 'op_name',
    key: 'op_name',
    width: '7%',
  },
  {
    title: 'Руководитель',
    dataIndex: 'rp_data',
    key: 'rp_data',
    width: '8%',
  },
  {
    title: 'Адрес объекта',
    dataIndex: 'obj_addr',
    key: 'obj_addr',
    width: '20rem',
  },
  {
    title: 'Стадия',
    dataIndex: 'stage',
    key: 'stage',
    width: '6%',
  },
  {
    title: 'Сроки',
    dataIndex: 'period',
    key: 'period',
    width: '5%',
  },
  {
    title: 'Сумма к реализации',
    dataIndex: 'plan_sum',
    key: 'plan_sum',
    width: '6%',
    renderText: (record) => (record !== '-' ? formatNumber(+record) : record),
  },
  {
    title: 'Конкуренция',
    dataIndex: 'comp',
    key: 'comp',
    width: '6%',
  },
];
