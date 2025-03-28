import { Rules } from '../rules.class';

export const AnalyticsRulesKey = {
  analytics: 'analytics',
} as const;

export const analyticsRules = Rules.createSliceRule({
  [AnalyticsRulesKey.analytics]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostuplkp),
    },
  },
});
