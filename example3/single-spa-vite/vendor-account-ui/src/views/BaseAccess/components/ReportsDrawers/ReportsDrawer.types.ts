import { ReactNode } from 'react';

export interface IReportsDrawerProps {
  alertMessage: string;
  title: string;
  children: ReactNode;
  dataTestId?: string;
  showDownloadLink?: boolean;
  lookLinkText?: string
}
