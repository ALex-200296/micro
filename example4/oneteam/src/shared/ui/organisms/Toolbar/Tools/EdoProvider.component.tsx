import React, { memo } from 'react';
import { useBreakpoints } from '@shared/lib';

import MenuButton from '../../Button/MenuButton/MenuButton.component';
import { IToolbarMenuBtnProps } from '../Toolbar.types';

import { defaultEdoProviderButtonProps as defaultBtnProps, edoProviderMenu } from './Tools.data';

export const EdoProvider: React.FC<IToolbarMenuBtnProps> = memo(({ menu, buttonProps, ...props }) => {
  const {
    breakpoints: { xl },
  } = useBreakpoints();
  return (
    <MenuButton
      menu={{ items: edoProviderMenu, ...menu }}
      buttonProps={{
        collapsed: !xl,
        ...defaultBtnProps,
        ...buttonProps,
      }}
      {...props}
    />
  );
});
