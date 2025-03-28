import { DrawerProps as DrawerPropsAntd } from 'antd';

export const Width = {
  sm: '25%',
  md: '50%',
  lg: '75%',
} as const;

export interface IDrawerProps extends Omit<DrawerPropsAntd, 'width'> {
  width?: keyof typeof Width;
  copyableTitlePart?: string;
}
