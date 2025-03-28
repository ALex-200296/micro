import React, { FC } from 'react';
import { useToggleState } from '@shared/lib';
import { Drawer } from '@shared/ui';

import { ReportAlert } from './ReportAlert/ReportAlert.component';
import { lookLinkTextDefault } from './ReportAlertWithDrawer.data';
import { IReportsAlertWithDrawerProps } from './ReportAlertWithDrawer.types';

export const ReportsAlertWithDrawer: FC<IReportsAlertWithDrawerProps> = ({
  alertMessage,
  title,
  dataTestId,
  showDownloadLink = false,
  lookLinkText = lookLinkTextDefault,
  children,
  width = 'sm',
}) => {
  const { isOpen, handleOpen, handleClose } = useToggleState();

  return (
    <>
      <ReportAlert
        alertMessage={alertMessage}
        lookLinkText={lookLinkText}
        showDownloadLink={showDownloadLink}
        dataTestId={dataTestId}
        handleOpen={handleOpen}
      />
      <Drawer title={title} open={isOpen} onClose={handleClose} width={width} destroyOnClose>
        {children}
      </Drawer>
    </>
  );
};
