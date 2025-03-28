import { Rules } from '../rules.class';

export const OrdersRulesKey = {
  ORDERS: 'orders',
} as const;

export const ordersRules = Rules.createSliceRule({
  [OrdersRulesKey.ORDERS]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostuplkp),
    },
  },
});
