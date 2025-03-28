import React from 'react';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { NotificationMeesageType } from '@app/store/ui/ui.types';
import { Typography } from 'antd';
import { SnackbarProviderProps } from 'notistack';

import styles from './Notification.module.scss';

const { Text, Link } = Typography;

export const anchorOrigin: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' } = {
  horizontal: 'right',
  vertical: 'top',
};

export const snackbarProps: Omit<SnackbarProviderProps, 'children'> = {
  maxSnack: 3,
  iconVariant: {
    error: <ExclamationCircleFilled className='notification_icon' />,
    success: <CheckCircleFilled className='notification_icon' />,
    warning: <ExclamationCircleFilled className='notification_icon' />,
  },
};

export const getMessageTemplate = (message: NotificationMeesageType) => {
  if (message.link) {
    return (
      <Text className={styles.text}>
        {message.title}
        <Link
          href={message.link.href}
          onClick={message.link.onClick}
          download={message.link.download}
          className={styles.link}
        >
          {message.link.text}
        </Link>
      </Text>
    );
  }
  return <Text className={styles.text}>{message.title}</Text>;
};
