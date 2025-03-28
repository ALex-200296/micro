import { lastMonthDate } from '@views/BaseAccess/BaseAccessPage.data';

import { IDefaultReportsState, ReportsFilter } from './root.types';

export const defaultReportsState: IDefaultReportsState = {
  page: 1,
  rows: 10,
  sortStatus: '',
  sortDate: 'desc',
  sidx: 'datetime',
  update: 0,
  filters: {
    [ReportsFilter.status]: '',
    [ReportsFilter.date]: lastMonthDate(),
  },
  loadedData: {
    records: 0,
    data: [],
  },
  missingData: {
    records: 0,
    data: [],
    total: 0,
    page: 1,
  },
};
