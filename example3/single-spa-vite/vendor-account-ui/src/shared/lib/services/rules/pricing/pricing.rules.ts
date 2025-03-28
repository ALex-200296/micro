import { Rules } from '../rules.class';

export const PricingRulesKey = {
  PRICING: 'pricing',
  PURCHASE: 'purchase',
  PRICELIST: 'pricelist',
} as const;

export const pricingRules = Rules.createSliceRule({
  [PricingRulesKey.PRICING]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostuplkp),
    },
  },
  [PricingRulesKey.PURCHASE]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(!rights?.rse_code),
    },
  },
  [PricingRulesKey.PRICELIST]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.cli_list),
    },
  },
});
