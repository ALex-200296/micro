import { Rules } from '../rules.class';

export const LogisticsRulesKey = {
  LOGISTICS: 'logistics',
} as const;

export const logisticsRules = Rules.createSliceRule({
  [LogisticsRulesKey.LOGISTICS]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostuplkp),
    },
  },
});
