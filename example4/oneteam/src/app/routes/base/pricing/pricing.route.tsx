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
  id: PricingRulesKey.pricing,
  path: Routes.Pricing,
  element: <PricingPage />,
  children: [
    {
      index: true,
      Component: () => <RedirectFromParent {...pricingRoute} />,
    },
    {
      id: PricingRulesKey.purchase,
      path: Routes.Purchase,
      element: <PurchasePage />,
    },
    {
      id: PricingRulesKey.pricelist,
      path: Routes.PriceList,
      element: <PriceListsPage />,
      loader: (): IReturnLoader => ({
        tabs: [
          {
            key: Routes.Pl,
            id: `${Routes.Pricing}/${Routes.PriceList}/${Routes.Pl}`,
            path: `/${Routes.Pricing}/${Routes.PriceList}/${Routes.Pl}`,
            label: 'Прайс-листы',
          },
          {
            key: Routes.Discount,
            id: `${Routes.Pricing}/${Routes.PriceList}/${Routes.Discount}`,
            path: `/${Routes.Pricing}/${Routes.PriceList}/${Routes.Discount}`,
            label: 'Скидки',
          },
        ],
      }),
      children: [
        {
          id: `${Routes.Pricing}/${Routes.PriceList}/${Routes.Pl}`,
          path: Routes.Pl,
          element: <PriceLists />,
        },
        {
          id: `${Routes.Pricing}/${Routes.PriceList}/${Routes.Discount}`,
          path: Routes.Discount,
          element: <Discounts />,
        },
      ],
    },
  ],
};
