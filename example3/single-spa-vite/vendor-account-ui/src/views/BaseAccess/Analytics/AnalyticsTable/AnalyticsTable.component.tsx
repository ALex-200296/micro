import React, { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { analyticsSelectors } from '@app/store/analytics/analytics.selectors';
import { analyticsSliceName, setReportsPagination } from '@app/store/analytics/analytics.slice';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { getReportsDirectoryAction } from '@middleware/reports/reports.saga';
import { useOnTableChange } from '@shared/lib/hooks/useOnTableChange/useOnTableChange.hook';
import { Table } from '@shared/ui';

import { getAnalyticsTableConfig } from './AnalyticsTable.data';
import { ITableProps } from './AnalyticsTable.types';

const AnalyticsTable: React.FC<ITableProps> = ({ page, records, rows }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(uiSelectors.getIsRequestPending(analyticsSliceName));

  const onTableChange = useOnTableChange({ onPaginate: setReportsPagination });

  const handleChangeReportsUrl = useCallback(
    (url: string) => {
      dispatch(setReportsPagination({ page: 1, rows }));
      dispatch(
        getReportsDirectoryAction({
          currDirCrRep: url,
          sliceName: analyticsSliceName,
        }),
      );
    },
    [rows],
  );

  const columns = useMemo(() => getAnalyticsTableConfig(handleChangeReportsUrl), [rows]);

  return (
    <Table
      columns={columns}
      dataSelector={analyticsSelectors.getAnalyticsTableData}
      pagination={{
        current: page,
        total: records,
        pageSize: rows,
      }}
      loading={isLoading}
      rowKey='id'
      onChange={onTableChange}
    />
  );
};

export default memo(AnalyticsTable);
