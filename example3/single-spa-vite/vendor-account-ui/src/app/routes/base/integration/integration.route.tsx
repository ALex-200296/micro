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
  id: IntegrationRulesKey.INTEGRATION,
  path: Routes.INTEGRATION,
  element: <IntegrationPage />,
  children: [
    {
      index: true,
      Component: () => <RedirectFromParent {...integrationRoute} />,
    },
    {
      path: Routes.APPLICATION,
      element: <Application />,
      loader: (): IReturnLoader => ({
        tabs: [
          {
            key: Routes.EDI,
            id: `${Routes.INTEGRATION}/${Routes.APPLICATION}/${Routes.EDI}`,
            path: `/${Routes.INTEGRATION}/${Routes.APPLICATION}/${Routes.EDI}`,
            label: 'Заявка EDI',
          },
          {
            key: Routes.UZEDO,
            id: `${Routes.INTEGRATION}/${Routes.APPLICATION}/${Routes.UZEDO}`,
            path: `/${Routes.INTEGRATION}/${Routes.APPLICATION}/${Routes.UZEDO}`,
            label: 'Заявка ЮЗЭДО',
          },
          {
            key: Routes.EDI_PROJECT,
            id: `${Routes.INTEGRATION}/${Routes.APPLICATION}/${Routes.EDI_PROJECT}`,
            path: `/${Routes.INTEGRATION}/${Routes.APPLICATION}/${Routes.EDI_PROJECT}`,
            label: 'Заявка EDI Проекты',
          },
        ],
      }),
      children: [
        {
          id: `${Routes.INTEGRATION}/${Routes.APPLICATION}/${Routes.EDI}`,
          path: Routes.EDI,
          element: <Edi />,
        },
        {
          id: `${Routes.INTEGRATION}/${Routes.APPLICATION}/${Routes.UZEDO}`,
          path: Routes.UZEDO,
          element: <Uzedo />,
        },
        {
          id: `${Routes.INTEGRATION}/${Routes.APPLICATION}/${Routes.EDI_PROJECT}`,
          path: Routes.EDI_PROJECT,
          element: <EdiProject />,
        },
      ],
    },
    {
      path: Routes.APP_API,
      element: <AppApi />,
    },
  ],
};
