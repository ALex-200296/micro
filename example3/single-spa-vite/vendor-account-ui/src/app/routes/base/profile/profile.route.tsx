import React from 'react';
import { AccountControl, Contracts, ProfilePage } from '@app/routes/root.lazy';
import { CreateSliceRouteType, IReturnLoader, Routes } from '@app/routes/root.types';
import { ProfileRulesKey } from '@shared/lib/services/rules/profile/profile.rules';

export const profileRoute: CreateSliceRouteType = {
  id: ProfileRulesKey.PROFILE,
  path: Routes.PROFILE,
  element: <ProfilePage />,
  loader: (): IReturnLoader => ({
    tabs: [
      {
        key: Routes.ACCOUNT,
        id: `${Routes.PROFILE}/${Routes.ACCOUNT}`,
        path: `/${Routes.PROFILE}/${Routes.ACCOUNT}`,
        label: 'Управление аккаунтом',
      },
      {
        key: Routes.CONTRACTS,
        id: `${Routes.PROFILE}/${Routes.CONTRACTS}`,
        path: `/${Routes.PROFILE}/${Routes.CONTRACTS}`,
        label: 'Договоры',
      },
    ],
  }),
  children: [
    {
      id: `${Routes.PROFILE}/${Routes.ACCOUNT}`,
      path: Routes.ACCOUNT,
      element: <AccountControl />,
    },
    {
      id: `${Routes.PROFILE}/${Routes.CONTRACTS}`,
      path: Routes.CONTRACTS,
      element: <Contracts />,
    },
  ],
};
