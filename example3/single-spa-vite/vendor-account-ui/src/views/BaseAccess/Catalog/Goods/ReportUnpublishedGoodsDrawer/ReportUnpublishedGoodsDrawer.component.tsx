import React, { memo } from 'react';
import { ReportsAlertWithDrawer } from '@views/BaseAccess/components/ReportsAlertWithDrawer/ReportsAlertWithDrawer.component';

import UnpublishedGoodsList from './UnpublishedGoodsList/UnpublishedGoodsList.component';
import { alertMessage, drawerTitle } from './ReportUnpublishedGoodsDrawer.data';
import { ReportUnpublishedGoodsDrawerProps } from './ReportUnpublishedGoodsDrawer.type';

const ReportUnpublishedGoodsDrawer = ({ dataTestId, page, rows, records }: ReportUnpublishedGoodsDrawerProps) => {
  return (
    <ReportsAlertWithDrawer alertMessage={alertMessage} title={drawerTitle} dataTestId={dataTestId} width='md'>
      <UnpublishedGoodsList page={page} rows={rows} records={records} />
    </ReportsAlertWithDrawer>
  );
};

export default memo(ReportUnpublishedGoodsDrawer);
