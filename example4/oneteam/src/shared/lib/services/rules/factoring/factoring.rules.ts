import { Rules } from '../rules.class';

export const FactoringRulesKey = {
  factoring: 'factoring',
} as const;

export const factoringRules = Rules.createSliceRule({
  [FactoringRulesKey.factoring]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.factorMNF),
    },
  },
});
