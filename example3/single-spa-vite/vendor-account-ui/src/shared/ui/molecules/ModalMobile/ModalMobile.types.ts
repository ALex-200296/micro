import { ReactNode } from 'react';

export interface IModalMobileProps {
  title?: string;
  isOpen: boolean;
  footer: React.ReactNode;
  children: ReactNode;
  handleClose: () => void;
}
