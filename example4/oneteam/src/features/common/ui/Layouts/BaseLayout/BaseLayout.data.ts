import React from 'react';

import theme from '@styles/themeExports.module.scss';

const siderStyles: React.CSSProperties = {
  top: 0,
  zIndex: Number(theme.sidebarZIndex),
  position: 'sticky',
  overflow: 'auto',
  height: '100vh',
};

export const siderProps = {
  style: siderStyles,
  width: '25vw',
};

const headerStyles: React.CSSProperties = {
  padding: '0 5vw',
};

export const headerProps = {
  style: headerStyles,
};
