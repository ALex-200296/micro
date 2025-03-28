import { Rules } from '../rules.class';

export const MarketingRulesKey = {
  MARKETING: 'marketing',
  MARKETING_SOURSE_INFO: 'marketingSourseInfo',
  MARKETING_KONKURS: 'marketingKonkurs',
  MARKETING_SKILLS: 'marketingSkills',
} as const;

export const marketingRules = Rules.createSliceRule({
  [MarketingRulesKey.MARKETING]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.zagrm || rights?.konkursp || rights?.skillsAccess),
    },
  },
  [MarketingRulesKey.MARKETING_SOURSE_INFO]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.zagrm),
    },
  },
  [MarketingRulesKey.MARKETING_KONKURS]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.konkursp),
    },
  },
  [MarketingRulesKey.MARKETING_SKILLS]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.skillsAccess),
    },
  },
});
