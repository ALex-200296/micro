import { Rules } from '../rules.class';

export const IntegrationRulesKey = {
  integration: 'integration',
} as const;

export const integrationRules = Rules.createSliceRule({
  [IntegrationRulesKey.integration]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostuplkp),
    },
  },
});
