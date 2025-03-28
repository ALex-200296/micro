import React from 'react';
import { Orders } from '@app/routes/root.lazy';
import { CreateSliceRouteType, Routes } from '@app/routes/root.types';
import { OrdersRulesKey } from '@shared/lib/services/rules/orders/orders.rules';

export const ordersRoute: CreateSliceRouteType = {
  id: OrdersRulesKey.orders,
  path: Routes.Orders,
  element: <Orders />,
};
