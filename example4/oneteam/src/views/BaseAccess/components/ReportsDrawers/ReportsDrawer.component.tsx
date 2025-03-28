import React, { memo } from 'react';
import { useToggleState } from '@shared/lib';
import { Drawer } from '@shared/ui';
import { Alert, Typography } from 'antd';

import { downloadLinkText, lookLinkTextDefault } from './ReportsDrawer.data';
import { IReportsDrawerProps } from './ReportsDrawer.types';

import styles from './ReportsDrawer.module.scss';

const { Text, Link } = Typography;

const ReportsDrawer: React.FC<IReportsDrawerProps> = ({
  alertMessage,
  title,
  children,
  dataTestId,
  showDownloadLink = false,
  lookLinkText = lookLinkTextDefault,
}) => {
  const { isOpen, handleOpen, handleClose } = useToggleState();

  return (
    <>
      <Alert
        data-testid={`alert-reports-drawer-${dataTestId}`}
        type='warning'
        showIcon
        className={styles.alert}
        message={
          <Text>
            {!showDownloadLink && <Text>{alertMessage} </Text>}
            <Link className={styles.link} onClick={handleOpen}>
              {showDownloadLink ? downloadLinkText : lookLinkText}
            </Link>
            {showDownloadLink && <Text>{alertMessage} </Text>}
          </Text>
        }
      />
      <Drawer title={title} open={isOpen} onClose={handleClose} width='sm' destroyOnClose>
        {children}
      </Drawer>
    </>
  );
};

export default memo(ReportsDrawer);
