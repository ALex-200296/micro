import { Rules } from '../rules.class';

export const CommunicationsRulesKey = {
  diary: 'diary',
} as const;

export const CommunicationsRules = Rules.createSliceRule({
  [CommunicationsRulesKey.diary]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.dostuplkp),
    },
    actions: {
      createTask: ({ user: { rights } }) => Boolean(rights?.createtaskoneteam),
      excelDownload: ({ userProfile: { users_lkp } }) => Boolean(users_lkp[0].access),
    },
  },
});
