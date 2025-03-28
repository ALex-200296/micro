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
  id: LogisticsRulesKey.LOGISTICS,
  path: Routes.LOGISTICS,
  element: <LogisticsPage />,
  children: [
    {
      index: true,
      Component: () => <RedirectFromParent {...logisticsRoute} />,
    },
    {
      path: Routes.INFO,
      element: <InfoPage />,
      loader: (): IReturnLoader => ({
        tabs: [
          {
            key: Routes.STATUS,
            id: `${Routes.LOGISTICS}/${Routes.INFO}/${Routes.STATUS}`,
            path: `/${Routes.LOGISTICS}/${Routes.INFO}/${Routes.STATUS}`,
            label: 'Статус товара на складе',
          },
          {
            key: Routes.TERM,
            id: `${Routes.LOGISTICS}/${Routes.INFO}/${Routes.TERM}`,
            path: `/${Routes.LOGISTICS}/${Routes.INFO}/${Routes.TERM}`,
            label: 'Срок изготовления и доставки',
          },
        ],
      }),
      children: [
        {
          id: `${Routes.LOGISTICS}/${Routes.INFO}/${Routes.STATUS}`,
          path: Routes.STATUS,
          element: <GoodsStatus id={Routes.STATUS} />,
        },
        {
          id: `${Routes.LOGISTICS}/${Routes.INFO}/${Routes.TERM}`,
          path: Routes.TERM,
          element: <Timelines id={Routes.TERM} />,
        },
      ],
    },
    {
      path: Routes.MANAGEMENT,
      element: <ManagementPage />,
    },
  ],
};
