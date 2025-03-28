import React, { memo } from 'react';
import ReportsDrawer from '@views/BaseAccess/components/ReportsDrawers/ReportsDrawer.component';
import { IReportsDrawerProps } from '@views/BaseAccess/components/ReportsDrawers/ReportsDrawer.types';

import ReportsPriceListsDrawerForm from './ReportsPriceListsDrawerForm/ReportsPriceListsDrawerForm.component';
import { alertMessage } from './ReportsPriceListsDrawerForm/ReportsPriceListsDrawerForm.data';
import { drawerTitle } from './ReportsCertificatesDrawer.data';

const ReportsPriceListsDrawer: React.FC<Pick<IReportsDrawerProps, 'dataTestId'>> = ({ dataTestId }) => {
  return (
    <ReportsDrawer alertMessage={alertMessage} title={drawerTitle} dataTestId={dataTestId} showDownloadLink>
      <ReportsPriceListsDrawerForm />
    </ReportsDrawer>
  );
};

export default memo(ReportsPriceListsDrawer);
