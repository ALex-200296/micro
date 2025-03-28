import React from 'react';
import { FinanceFactoring, FinancePage, Reconciliation, RedirectFromParent, Services } from '@app/routes/root.lazy';
import { CreateSliceRouteType, Routes } from '@app/routes/root.types';
import { FinanceRulesKey } from '@shared/lib/services/rules/finance/finance.rules';

export const financeRoute: CreateSliceRouteType = {
  id: FinanceRulesKey.FINANCE,
  path: Routes.FINANCE,
  element: <FinancePage />,
  children: [
    {
      index: true,
      Component: () => <RedirectFromParent {...financeRoute} />,
    },
    {
      id: FinanceRulesKey.FINANCE_RECONCILIATION,
      path: Routes.RECONCILIATION,
      element: <Reconciliation />,
    },
    {
      id: FinanceRulesKey.FINANCE_SERVICES,
      path: Routes.SERVICES,
      element: <Services />,
    },
    {
      id: FinanceRulesKey.FINANCE_FACTORING,
      path: Routes.FACTORING,
      element: <FinanceFactoring />,
    },
  ],
};
