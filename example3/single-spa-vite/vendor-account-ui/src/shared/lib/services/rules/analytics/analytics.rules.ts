import { Rules } from '../rules.class';

export const AnalyticsRulesKey = {
  ANALYTICS: 'analytics',
} as const;

export const analyticsRules = Rules.createSliceRule({
  [AnalyticsRulesKey.ANALYTICS]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostuplkp),
    },
  },
});
