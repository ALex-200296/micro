import { Rules } from '../rules.class';

export const FinanceRulesKey = {
  finance: 'finance',
  financeReconciliation: 'financeReconciliation',
  financeServices: 'financeServices',
  financeFactoring: 'financeFactoring',
} as const;

export const financeRules = Rules.createSliceRule({
  [FinanceRulesKey.finance]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostupfinrazd || rights?.dostupfaktzajav),
    },
  },
  [FinanceRulesKey.financeReconciliation]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostupfinrazd),
    },
  },
  [FinanceRulesKey.financeServices]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostupfinrazd),
    },
  },
  [FinanceRulesKey.financeFactoring]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostupfaktzajav),
    },
  },
});
