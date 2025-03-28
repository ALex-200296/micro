import React from 'react';
import { AccountControl, Contracts, ProfilePage } from '@app/routes/root.lazy';
import { CreateSliceRouteType, IReturnLoader, Routes } from '@app/routes/root.types';
import { ProfileRulesKey } from '@shared/lib/services/rules/profile/profile.rules';

export const profileRoute: CreateSliceRouteType = {
  id: ProfileRulesKey.profile,
  path: Routes.Profile,
  element: <ProfilePage />,
  loader: (): IReturnLoader => ({
    tabs: [
      {
        key: Routes.Account,
        id: `${Routes.Profile}/${Routes.Account}`,
        path: `/${Routes.Profile}/${Routes.Account}`,
        label: 'Управление аккаунтом',
      },
      {
        key: Routes.Contracts,
        id: `${Routes.Profile}/${Routes.Contracts}`,
        path: `/${Routes.Profile}/${Routes.Contracts}`,
        label: 'Договоры',
      },
    ],
  }),
  children: [
    {
      id: `${Routes.Profile}/${Routes.Account}`,
      path: Routes.Account,
      element: <AccountControl />,
    },
    {
      id: `${Routes.Profile}/${Routes.Contracts}`,
      path: Routes.Contracts,
      element: <Contracts />,
    },
  ],
};
