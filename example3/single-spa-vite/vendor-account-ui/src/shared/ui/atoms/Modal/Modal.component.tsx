import React, { memo } from 'react';
import { Modal as AntdModal, ModalProps } from 'antd';
import cn from 'classnames';

import styles from './Modal.module.scss';

export const Modal: React.FC<ModalProps> = memo(
  ({ children, onCancel, destroyOnClose = true, footer = null, className, ...props }) => {
    return (
      <AntdModal
        onCancel={onCancel}
        footer={footer}
        destroyOnClose={destroyOnClose}
        className={cn(styles.box, className)}
        {...props}
      >
        {children}
      </AntdModal>
    );
  },
);
