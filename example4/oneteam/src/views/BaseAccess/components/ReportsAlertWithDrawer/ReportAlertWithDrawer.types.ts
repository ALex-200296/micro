import { ReactNode } from 'react';

export interface IReportsAlertWithDrawerProps {
  alertMessage: string;
  title: string;
  dataTestId: string;
  showDownloadLink?: boolean;
  lookLinkText?: string;
  children: ReactNode;
  width?: 'sm' | 'md' | 'lg';
}
