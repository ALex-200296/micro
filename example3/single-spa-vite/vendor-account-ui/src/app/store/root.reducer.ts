import { resetStoreAction } from '@middleware/root.data';
import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';

import { analyticsStateReducer } from './analytics/analytics.slice';
import { calendarStateReducer } from './calendar/calendar.slice';
import { catalogStateReducer } from './catalog/catalog.slice';
import { factoringStateReducer } from './factoring/factoring.slice';
import { financeStateReducer } from './finance/finance.slice';
import { infoStateReducer } from './info/info.slice';
import { integrationStateReducer } from './integration/integration.slice';
import { logisticsStateReducer } from './logistics/logistics.slice';
import { ordersStateReducer } from './orders/orders.slice';
import { pricingReducer } from './pricing/pricing.slice';
import { projectStateReducer } from './project/project.slice';
import { templateStateReducer } from './template/template.slice';
import { uiStateReducer } from './ui/ui.slice';
import { userStateReducer } from './user/user.slice';
import { vendorStateReducer } from './vendor/vendor.slice';

const combinedReducer = combineReducers({
  ui: uiStateReducer,
  user: userStateReducer,
  project: projectStateReducer,
  catalog: catalogStateReducer,
  calendar: calendarStateReducer,
  analytics: analyticsStateReducer,
  logistics: logisticsStateReducer,
  info: infoStateReducer,
  finance: financeStateReducer,
  template: templateStateReducer,
  orders: ordersStateReducer,
  integration: integrationStateReducer,
  factoring: factoringStateReducer,
  pricing: pricingReducer,
  vendor: vendorStateReducer,
});

export const rootReducer: Reducer = (state: RootStateReducers, action: AnyAction) => {
  if (action.type === resetStoreAction.type) {
    state = {} as RootStateReducers;
  }
  return combinedReducer(state, action);
};

export type RootStateReducers = ReturnType<typeof combinedReducer>;
