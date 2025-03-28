import { Rules } from '../rules.class';

export const LimitedRulesKey = {
  LIMITED: 'limited',
  VENDOR: 'vendor',
  VENDOR_CONTRACT: 'vendorContract',
} as const;

export const limitedRules = Rules.createSliceRule({
  [LimitedRulesKey.LIMITED]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.limitedAccessOneTeam),
    },
  },
  [LimitedRulesKey.VENDOR]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.limitedAccessOneTeam),
    },
  },
  [LimitedRulesKey.VENDOR_CONTRACT]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.limitedAccessOneTeam),
    },
  },
});
