import { LoginType } from '@middleware/user/user.types';

import { Rules } from '../rules.class';

export const BaseRulesKey = {
  BASE: 'base',
} as const;

export const baseRules = Rules.createSliceRule({
  [BaseRulesKey.BASE]: {
    accessRoute: {
      rights: ({ user: { rights, login_type } }) =>
        Boolean(rights?.dostuplkp) || login_type === LoginType.WI || Boolean(rights?.limitedAccessOneTeam),
    },
  },
});
