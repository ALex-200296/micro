import { SpaceProps } from 'antd';

import { IDrawerProps } from '../../atoms/Drawer/Drawer.types';
import { IconButtonProps } from '../../molecules/Button/IconButton/IconButton.types';
import { IMenuButtonProps } from '../Button/MenuButton/MenuButton.types';

export interface IToolbarBtnProps extends Omit<IconButtonProps, 'icon' | 'dataTestId'> {
  drawerProps?: IDrawerProps | false;
}
export interface IToolbarMenuBtnProps extends Omit<IMenuButtonProps, 'buttonProps' | 'menu'> {
  buttonProps?: Omit<IconButtonProps, 'icon'>;
  menu?: Omit<IMenuButtonProps['menu'], 'items'>;
}

export interface IToolbarProps extends SpaceProps {
  excludeClassName?: boolean;
}
