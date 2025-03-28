import { Rules } from '../rules.class';

export const IntegrationRulesKey = {
  INTEGRATION: 'integration',
} as const;

export const integrationRules = Rules.createSliceRule({
  [IntegrationRulesKey.INTEGRATION]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostuplkp),
    },
  },
});
