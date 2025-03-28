import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { catalogSliceName } from '@app/store/catalog/catalog.slice';
import { CatalogComputedPropertyState } from '@app/store/catalog/catalog.types';
import { getReportsDirectoryAction } from '@middleware/reports/reports.saga';
import ReportsDrawer from '@views/BaseAccess/components/ReportsDrawers/ReportsDrawer.component';
import { IReportsDrawerProps } from '@views/BaseAccess/components/ReportsDrawers/ReportsDrawer.types';

import ReportsCertificatesList from './ReportsCertificatesDrawerSection/ReportsCertificatesList.component';
import { alertMessage, drawerTitle } from './ReportsCertificatesDrawer.data';

const ReportsCertificatesDrawer: React.FC<Pick<IReportsDrawerProps, 'dataTestId'>> = ({ dataTestId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getReportsDirectoryAction({
        currDirCrRep: 'sert',
        sliceName: catalogSliceName,
        computedProperty: CatalogComputedPropertyState.certificatesLoad,
      }),
    );
  }, []);

  return (
    <ReportsDrawer alertMessage={alertMessage} title={drawerTitle} dataTestId={dataTestId}>
      <ReportsCertificatesList />
    </ReportsDrawer>
  );
};

export default memo(ReportsCertificatesDrawer);
