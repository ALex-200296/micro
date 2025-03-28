import { Rules } from '../rules.class';

export const PricingRulesKey = {
  pricing: 'pricing',
  purchase: 'purchase',
  pricelist: 'pricelist',
} as const;

export const pricingRules = Rules.createSliceRule({
  [PricingRulesKey.pricing]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostuplkp),
    },
  },
  [PricingRulesKey.purchase]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(!rights?.rse_code),
    },
  },
  [PricingRulesKey.pricelist]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.cli_list),
    },
  },
});
