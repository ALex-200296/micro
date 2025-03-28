import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { IErrorBoundaryInnerProps, IErrorBoundaryProps, IState } from './ErrorBoundary.types';

class ErrorBoundaryInner extends React.Component<IErrorBoundaryInnerProps, IState> {
  constructor(props: IErrorBoundaryInnerProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: IErrorBoundaryInnerProps) {
    if (!this.props.hasError && prevProps.hasError) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch() {
    this.props.setHasError(true);
  }

  render() {
    return this.state.hasError ? <Navigate to='/403' /> : this.props.children;
  }
}

export const ErrorBoundary: React.FC<IErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [location.key]);

  return (
    <ErrorBoundaryInner hasError={hasError} setHasError={setHasError}>
      {children}
    </ErrorBoundaryInner>
  );
};
