import React, { FC } from 'react';
import { Alert, Flex, Typography } from 'antd';

import { downloadLinkText } from '../ReportAlertWithDrawer.data';

import { IReportAlertProps } from './ReportAlert.types';

import styles from './ReportAlert.module.scss';

const { Text, Link } = Typography;

export const ReportAlert: FC<IReportAlertProps> = ({
  alertMessage,
  dataTestId,
  showDownloadLink = false,
  handleOpen,
  lookLinkText,
}) => {
  const linkText = showDownloadLink ? downloadLinkText : lookLinkText;

  return (
    <Alert
      data-testid={`alert-reports-drawer-${dataTestId}`}
      type='warning'
      showIcon
      className={styles.alert}
      message={
        <Flex gap='small' style={{ flexDirection: showDownloadLink ? 'row' : 'row-reverse' }}>
          <Link className={styles.link} onClick={handleOpen}>
            {linkText}
          </Link>
          <Text>{alertMessage}</Text>
        </Flex>
      }
    />
  );
};
