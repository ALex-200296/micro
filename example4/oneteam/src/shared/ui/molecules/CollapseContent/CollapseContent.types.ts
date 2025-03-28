import React from 'react';
import { DescriptionsProps } from 'antd';

export interface ICollapseContentProps {
  content: DescriptionsProps['items'];
  tableView?: boolean;
  extra?: React.ReactNode;
  contentAction?: {
    onClick: () => void;
    actionText: string;
  };
}
