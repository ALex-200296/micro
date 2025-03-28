import React, { memo } from 'react';
import { ReportsAlertWithDrawer } from '@views/BaseAccess/components/ReportsAlertWithDrawer/ReportsAlertWithDrawer.component';

import { dataTestId } from '../../ControlPage.data';

import ReportsList from './ReportsCharacteristicsList/ReportsCharacteristicsList.component';
import { alertMessage, drawerTitle } from './ReportsCharacteristicsDrawer.data';

const ReportsCharacteristicsDrawer: React.FC = () => (
  <ReportsAlertWithDrawer
    width='md'
    title={drawerTitle}
    alertMessage={alertMessage}
    dataTestId={`${dataTestId}-drawer`}
  >
    <ReportsList />
  </ReportsAlertWithDrawer>
);

export default memo(ReportsCharacteristicsDrawer);
