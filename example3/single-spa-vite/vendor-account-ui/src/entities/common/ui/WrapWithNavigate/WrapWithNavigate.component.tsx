import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { IWrapWithNavigateProps } from './WrapWithNavigate.types';

export const WrapWithNavigate: React.FC<IWrapWithNavigateProps> = memo(({ children, shouldWrap, to, ...props }) => {
  return shouldWrap ? (
    <NavLink to={to} {...props}>
      {children}
    </NavLink>
  ) : (
    <>{children}</>
  );
});
