import { Rules } from '../rules.class';

export const ProfileRulesKey = {
  PROFILE: 'profile',
} as const;

export const profileRules = Rules.createSliceRule({
  [ProfileRulesKey.PROFILE]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostuplkp),
    },
  },
});
