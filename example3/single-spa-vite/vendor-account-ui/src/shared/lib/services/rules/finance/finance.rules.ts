import { Rules } from '../rules.class';

export const FinanceRulesKey = {
  FINANCE: 'finance',
  FINANCE_RECONCILIATION: 'financeReconciliation',
  FINANCE_SERVICES: 'financeServices',
  FINANCE_FACTORING: 'financeFactoring',
} as const;

export const financeRules = Rules.createSliceRule({
  [FinanceRulesKey.FINANCE]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostupfinrazd || rights?.dostupfaktzajav),
    },
  },
  [FinanceRulesKey.FINANCE_RECONCILIATION]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostupfinrazd),
    },
  },
  [FinanceRulesKey.FINANCE_SERVICES]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostupfinrazd),
    },
  },
  [FinanceRulesKey.FINANCE_FACTORING]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostupfaktzajav),
    },
  },
});
