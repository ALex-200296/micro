import { Rules } from '../rules.class';

export const MarketingRulesKey = {
  marketing: 'marketing',
  marketingSourseInfo: 'marketingSourseInfo',
  marketingKonkurs: 'marketingKonkurs',
  marketingSkills: 'marketingSkills',
} as const;

export const marketingRules = Rules.createSliceRule({
  [MarketingRulesKey.marketing]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.zagrm || rights?.konkursp || rights?.skillsAccess),
    },
  },
  [MarketingRulesKey.marketingSourseInfo]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.zagrm),
    },
  },
  [MarketingRulesKey.marketingKonkurs]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.konkursp),
    },
  },
  [MarketingRulesKey.marketingSkills]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.skillsAccess),
    },
  },
});
