import { Rules } from '../rules.class';

export const FactoringRulesKey = {
  FACTORING: 'factoring',
} as const;

export const factoringRules = Rules.createSliceRule({
  [FactoringRulesKey.FACTORING]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.factorMNF),
    },
  },
});
