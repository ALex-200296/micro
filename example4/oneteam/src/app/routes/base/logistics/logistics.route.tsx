import React from 'react';
import {
  GoodsStatus,
  InfoPage,
  LogisticsPage,
  ManagementPage,
  RedirectFromParent,
  Timelines,
} from '@app/routes/root.lazy';
import { CreateSliceRouteType, IReturnLoader, Routes } from '@app/routes/root.types';
import { LogisticsRulesKey } from '@shared/lib/services/rules/logistics/logistics.rules';

export const logisticsRoute: CreateSliceRouteType = {
  id: LogisticsRulesKey.logistics,
  path: Routes.Logistics,
  element: <LogisticsPage />,
  children: [
    {
      index: true,
      Component: () => <RedirectFromParent {...logisticsRoute} />,
    },
    {
      path: Routes.Info,
      element: <InfoPage />,
      loader: (): IReturnLoader => ({
        tabs: [
          {
            key: Routes.Status,
            id: `${Routes.Logistics}/${Routes.Info}/${Routes.Status}`,
            path: `/${Routes.Logistics}/${Routes.Info}/${Routes.Status}`,
            label: 'Статус товара на складе',
          },
          {
            key: Routes.Term,
            id: `${Routes.Logistics}/${Routes.Info}/${Routes.Term}`,
            path: `/${Routes.Logistics}/${Routes.Info}/${Routes.Term}`,
            label: 'Срок изготовления и доставки',
          },
        ],
      }),
      children: [
        {
          id: `${Routes.Logistics}/${Routes.Info}/${Routes.Status}`,
          path: Routes.Status,
          element: <GoodsStatus id={Routes.Status} />,
        },
        {
          id: `${Routes.Logistics}/${Routes.Info}/${Routes.Term}`,
          path: Routes.Term,
          element: <Timelines id={Routes.Term} />,
        },
      ],
    },
    {
      path: Routes.Management,
      element: <ManagementPage />,
    },
  ],
};
