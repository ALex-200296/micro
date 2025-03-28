import React from 'react';
import {
  AppApi,
  Application,
  Edi,
  EdiProject,
  IntegrationPage,
  RedirectFromParent,
  Uzedo,
} from '@app/routes/root.lazy';
import { CreateSliceRouteType, IReturnLoader, Routes } from '@app/routes/root.types';
import { IntegrationRulesKey } from '@shared/lib/services/rules/integration/integration.rules';

export const integrationRoute: CreateSliceRouteType = {
  id: IntegrationRulesKey.integration,
  path: Routes.Integration,
  element: <IntegrationPage />,
  children: [
    {
      index: true,
      Component: () => <RedirectFromParent {...integrationRoute} />,
    },
    {
      path: Routes.Application,
      element: <Application />,
      loader: (): IReturnLoader => ({
        tabs: [
          {
            key: Routes.Edi,
            id: `${Routes.Integration}/${Routes.Application}/${Routes.Edi}`,
            path: `/${Routes.Integration}/${Routes.Application}/${Routes.Edi}`,
            label: 'Заявка EDI',
          },
          {
            key: Routes.Uzedo,
            id: `${Routes.Integration}/${Routes.Application}/${Routes.Uzedo}`,
            path: `/${Routes.Integration}/${Routes.Application}/${Routes.Uzedo}`,
            label: 'Заявка ЮЗЭДО',
          },
          {
            key: Routes.EdiProject,
            id: `${Routes.Integration}/${Routes.Application}/${Routes.EdiProject}`,
            path: `/${Routes.Integration}/${Routes.Application}/${Routes.EdiProject}`,
            label: 'Заявка EDI Проекты',
          },
        ],
      }),
      children: [
        {
          id: `${Routes.Integration}/${Routes.Application}/${Routes.Edi}`,
          path: Routes.Edi,
          element: <Edi />,
        },
        {
          id: `${Routes.Integration}/${Routes.Application}/${Routes.Uzedo}`,
          path: Routes.Uzedo,
          element: <Uzedo />,
        },
        {
          id: `${Routes.Integration}/${Routes.Application}/${Routes.EdiProject}`,
          path: Routes.EdiProject,
          element: <EdiProject />,
        },
      ],
    },
    {
      path: Routes.AppApi,
      element: <AppApi />,
    },
  ],
};
