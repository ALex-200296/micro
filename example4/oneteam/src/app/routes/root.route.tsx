import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '@app/App';
import { Result } from '@entities/common/ui';
import { BaseRulesKey } from '@shared/lib/services/rules/base/base.rules';
import { FactoringRulesKey } from '@shared/lib/services/rules/factoring/factoring.rules';
import { LimitedRulesKey } from '@shared/lib/services/rules/limited/limited.rules';
import CommonPage from '@views/BaseAccess/CommonPage/CommonPage.component';

import { analyticsRoute } from './base/analytics/analytics.route';
import { catalogRoute } from './base/catalog/catalog.route';
import { communicationsRoute } from './base/communications/communications.route';
import { designRoute } from './base/design/design.route';
import { financeRoute } from './base/finance/finance.route';
import { integrationRoute } from './base/integration/integration.route';
import { logisticsRoute } from './base/logistics/logistics.route';
import { ordersRoute } from './base/orders/orders.route';
import { pricingRoute } from './base/pricing/pricing.route';
import { profileRoute } from './base/profile/profile.route';
import {
  BaseAccessPage,
  FactoringForm,
  FactoringPage,
  LandingPage,
  LoginPage,
  RulesGuard,
  VendorContractFormPage,
  VendorFormPage,
} from './root.lazy';
import { DynamicRoutes, Routes } from './root.types';

export const routes = createBrowserRouter(
  [
    {
      element: <App />,
      children: [
        {
          path: Routes.Home,
          element: <LandingPage />,
        },
        {
          path: Routes.Login,
          element: <LoginPage />,
        },
        {
          element: <RulesGuard />,
          children: [
            {
              id: BaseRulesKey.base,
              path: Routes.Base,
              element: <BaseAccessPage />,
              children: [
                catalogRoute,
                profileRoute,
                analyticsRoute,
                communicationsRoute,
                logisticsRoute,
                designRoute,
                ordersRoute,
                financeRoute,
                integrationRoute,
                pricingRoute,
                {
                  id: LimitedRulesKey.vendor,
                  path: Routes.VendorForm,
                  element: <VendorFormPage />,
                },
                {
                  id: LimitedRulesKey.vendorContract,
                  path: Routes.VendorContract,
                  element: <VendorContractFormPage />,
                },
              ],
            },
            {
              id: FactoringRulesKey.factoring,
              path: `${Routes.Factoring}`,
              element: <FactoringPage />,
              children: [
                {
                  path: `:${DynamicRoutes.uuid}`,
                  element: <FactoringForm />,
                },
              ],
            },
          ],
        },
        {
          path: '*',
          element: <CommonPage />,
          children: [
            {
              path: `:${DynamicRoutes.status}`,
              element: <Result />,
            },
            {
              path: '*',
              element: <Result />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: process.env.VITE_APP_BASENAME,
  },
);
