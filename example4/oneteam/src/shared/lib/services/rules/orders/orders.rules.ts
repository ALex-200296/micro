import { Rules } from '../rules.class';

export const OrdersRulesKey = {
  orders: 'orders',
} as const;

export const ordersRules = Rules.createSliceRule({
  [OrdersRulesKey.orders]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostuplkp),
    },
  },
});
