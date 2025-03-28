import React from 'react';
import { CheckCircleFilled, PlusCircleFilled, ProfileFilled, WarningFilled } from '@ant-design/icons';
import { BadgeProps } from 'antd';

import styles from './TableCell.module.scss';
import theme from '@styles/themeExports.module.scss';

export const getNumberStatusBadge = (status: string): Pick<BadgeProps, 'status' | 'color'> => {
  switch (status) {
    case '0':
    case '3':
    case '4':
    case '5':
    case '6':
      return { status: 'default', color: theme.commonStateColor };
    case '1':
    case '7':
      return { status: 'default', color: theme.appointStateColor };
    case '2':
      return { status: 'error' };
    case '9':
      return { status: 'default', color: theme.incompletedStateColor };
    case '8':
    case '10':
    case '12':
      return { status: 'success', color: theme.completedSuccessfullyStateColor };
    case '11':
      return { status: 'processing', color: theme.inProgressStateColor };
    default:
      return { status: 'default', color: theme.commonStateColor };
  }
};

export const getTextStatusBadge = (status: string): Pick<BadgeProps, 'status' | 'color'> => {
  return status === 'Опубликован' ? { status: 'success' } : { status: 'warning' };
};

export const getMeetingId = (url: string = '', separator: string): string | null =>
  new URLSearchParams(url.replaceAll(separator, '&')).get('pr_meetingRowid');

export const iconForResult: Record<string, React.ReactNode> = {
  '1': <ProfileFilled className={styles.protocol} />,
  '2': <WarningFilled className={styles.error} />,
  '3': <CheckCircleFilled className={styles.uploaded} />,
  '4': <PlusCircleFilled className={styles.update} />,
};
