import { IReturnLoader } from '@app/routes/root.types';

import { ITab } from './Tabs.types';

export const getItems = (items: IReturnLoader['tabs']): Omit<ITab, 'children'>[] => {
  return items.map(({ key, label }) => ({
    key,
    label,
  }));
};
