import { Rules } from '../rules.class';

export const ProfileRulesKey = {
  profile: 'profile',
} as const;

export const profileRules = Rules.createSliceRule({
  [ProfileRulesKey.profile]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostuplkp),
    },
  },
});
