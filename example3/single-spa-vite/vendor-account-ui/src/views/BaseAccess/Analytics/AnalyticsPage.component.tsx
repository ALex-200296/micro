import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { analyticsSelectors } from '@app/store/analytics/analytics.selectors';
import { analyticsSliceName, setReportsPagination } from '@app/store/analytics/analytics.slice';
import { getReportsDirectoryAction } from '@middleware/reports/reports.saga';
import { PageTitle } from '@shared/ui';

import AnalyticsTable from './AnalyticsTable/AnalyticsTable.component';
import { heading } from './AnalyticsPage.data';

const Analytics: React.FC = () => {
  const { records, page, rows } = useSelector(analyticsSelectors.getAnalyticsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setReportsPagination({ page: 1, rows }));
    dispatch(
      getReportsDirectoryAction({
        currDirCrRep: '',
        sliceName: analyticsSliceName,
      }),
    );
  }, []);

  return (
    <>
      <PageTitle heading={heading} />
      <AnalyticsTable page={page} records={records} rows={rows} />
    </>
  );
};

export default memo(Analytics);
