import React from 'react';
import { IReturnLoader } from '@app/routes/root.types';
import { TabsProps as TabsPropsAntd } from 'antd';

export interface ITab {
  key: string;
  label: string | React.ReactNode;
  children: React.ReactNode;
}
export interface IRoutedBaseTabsProps extends Omit<TabsPropsAntd, 'items' | 'onChange'> {
  routedTabs: IReturnLoader['tabs'];
  initialTab?: string;
}
