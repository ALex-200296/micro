import { CombineRules } from '@shared/lib';
import { ItemType } from 'antd/es/menu/interface';

export type MenuItemType = ItemType;
export interface IRights {
  id?: keyof CombineRules;
  dontShow?: boolean;
}

export type MenuItemWithRules = MenuItemType &
  IRights & {
    children?: Array<MenuItemWithRules>;
  };
