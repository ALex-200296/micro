import React from 'react';
import {
  Discounts,
  PriceLists,
  PriceListsPage,
  PricingPage,
  PurchasePage,
  RedirectFromParent,
} from '@app/routes/root.lazy';
import { CreateSliceRouteType, IReturnLoader, Routes } from '@app/routes/root.types';
import { PricingRulesKey } from '@shared/lib/services/rules/pricing/pricing.rules';

export const pricingRoute: CreateSliceRouteType = {
  id: PricingRulesKey.PRICING,
  path: Routes.PRICING,
  element: <PricingPage />,
  children: [
    {
      index: true,
      Component: () => <RedirectFromParent {...pricingRoute} />,
    },
    {
      id: PricingRulesKey.PURCHASE,
      path: Routes.PURCHASE,
      element: <PurchasePage />,
    },
    {
      id: PricingRulesKey.PRICELIST,
      path: Routes.PRICE_LIST,
      element: <PriceListsPage />,
      loader: (): IReturnLoader => ({
        tabs: [
          {
            key: Routes.PL,
            id: `${Routes.PRICING}/${Routes.PRICE_LIST}/${Routes.PL}`,
            path: `/${Routes.PRICING}/${Routes.PRICE_LIST}/${Routes.PL}`,
            label: 'Прайс-листы',
          },
          {
            key: Routes.DISCOUNT,
            id: `${Routes.PRICING}/${Routes.PRICE_LIST}/${Routes.DISCOUNT}`,
            path: `/${Routes.PRICING}/${Routes.PRICE_LIST}/${Routes.DISCOUNT}`,
            label: 'Скидки',
          },
        ],
      }),
      children: [
        {
          id: `${Routes.PRICING}/${Routes.PRICE_LIST}/${Routes.PL}`,
          path: Routes.PL,
          element: <PriceLists />,
        },
        {
          id: `${Routes.PRICING}/${Routes.PRICE_LIST}/${Routes.DISCOUNT}`,
          path: Routes.DISCOUNT,
          element: <Discounts />,
        },
      ],
    },
  ],
};
