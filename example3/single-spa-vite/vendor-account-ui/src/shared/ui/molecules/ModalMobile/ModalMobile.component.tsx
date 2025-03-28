import React, { memo } from 'react';
import { useBreakpoints } from '@shared/lib';
import { Drawer, Modal } from '@shared/ui/atoms';

import { IModalMobileProps } from './ModalMobile.types';

import styles from './ModalMobile.module.scss';

export const ModalMobile: React.FC<IModalMobileProps> = memo(({ title, isOpen, handleClose, footer, children }) => {
  const { isMobile } = useBreakpoints();

  return (
    <>
      {isMobile ? (
        <Drawer
          className={styles.drawer}
          open={isOpen}
          onClose={handleClose}
          destroyOnClose
          placement='bottom'
          height='none'
          title={title}
        >
          {children}
        </Drawer>
      ) : (
        <Modal title={title} open={isOpen} onCancel={handleClose} footer={footer}>
          {children}
        </Modal>
      )}
    </>
  );
});
