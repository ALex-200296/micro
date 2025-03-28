import { ErrorInfo, ReactNode } from 'react';

export interface IProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface IState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export interface IErrorBoundaryProps {
  children: ReactNode;
}

export interface IErrorBoundaryInnerProps {
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}
