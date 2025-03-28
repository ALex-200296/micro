import { Rules } from '../rules.class';

export const LimitedRulesKey = {
  limited: 'limited',
  vendor: 'vendor',
  vendorContract: 'vendorContract',
} as const;

export const limitedRules = Rules.createSliceRule({
  [LimitedRulesKey.limited]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.limitedAccessOneTeam),
    },
  },
  [LimitedRulesKey.vendor]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.limitedAccessOneTeam),
    },
  },
  [LimitedRulesKey.vendorContract]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.limitedAccessOneTeam),
    },
  },
});
