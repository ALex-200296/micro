import { Rules } from '../rules.class';

export const LogisticsRulesKey = {
  logistics: 'logistics',
} as const;

export const logisticsRules = Rules.createSliceRule({
  [LogisticsRulesKey.logistics]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostuplkp),
    },
  },
});
