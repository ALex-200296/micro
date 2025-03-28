import React from 'react';
import { AnalyticsPage } from '@app/routes/root.lazy';
import { CreateSliceRouteType, Routes } from '@app/routes/root.types';
import { AnalyticsRulesKey } from '@shared/lib/services/rules/analytics/analytics.rules';

export const analyticsRoute: CreateSliceRouteType = {
  id: AnalyticsRulesKey.ANALYTICS,
  path: Routes.ANALITICS,
  element: <AnalyticsPage />,
};
