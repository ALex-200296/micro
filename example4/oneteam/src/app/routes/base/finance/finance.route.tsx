import React from 'react';
import { FinanceFactoring, FinancePage, Reconciliation, RedirectFromParent, Services } from '@app/routes/root.lazy';
import { CreateSliceRouteType, Routes } from '@app/routes/root.types';
import { FinanceRulesKey } from '@shared/lib/services/rules/finance/finance.rules';

export const financeRoute: CreateSliceRouteType = {
  id: FinanceRulesKey.finance,
  path: Routes.Finance,
  element: <FinancePage />,
  children: [
    {
      index: true,
      Component: () => <RedirectFromParent {...financeRoute} />,
    },
    {
      id: FinanceRulesKey.financeReconciliation,
      path: Routes.Reconciliation,
      element: <Reconciliation />,
    },
    {
      id: FinanceRulesKey.financeServices,
      path: Routes.Services,
      element: <Services />,
    },
    {
      id: FinanceRulesKey.financeFactoring,
      path: Routes.Factoring,
      element: <FinanceFactoring />,
    },
  ],
};
