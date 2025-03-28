import { IUsersLkpState } from '@app/store/user/user.types';
import { ColumnType } from '@shared/ui';

export const getAccessCheck = (condition: boolean): string => (condition ? 'Есть доступ' : 'Нет доступа');

export const accessTableConfig: ColumnType<IUsersLkpState>[] = [
  {
    title: 'ФИО сотрудника',
    key: 'name',
    renderText: (_: unknown, row) => row.fio,
  },
  {
    title: 'Доступ к запросам по проектам',
    key: 'accessToProsmresh',
    renderText: (_: unknown, row) => getAccessCheck(!!row.prosmresh),
  },
  {
    title: 'Доступ к проектам',
    key: 'accessToProsmpr',
    renderText: (_: unknown, row) => getAccessCheck(!!row.prosmpr),
  },
];
