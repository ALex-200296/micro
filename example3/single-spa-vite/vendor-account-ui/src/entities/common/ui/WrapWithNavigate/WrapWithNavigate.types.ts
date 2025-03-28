import React from 'react';
import { NavLinkProps } from 'react-router-dom';

export interface IWrapWithNavigateProps extends Omit<NavLinkProps, 'children'> {
  children: React.ReactNode;
  shouldWrap: boolean;
}
