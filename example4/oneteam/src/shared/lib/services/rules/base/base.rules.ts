import { LoginType } from '@middleware/user/user.types';

import { Rules } from '../rules.class';

export const BaseRulesKey = {
  base: 'base',
} as const;

export const baseRules = Rules.createSliceRule({
  [BaseRulesKey.base]: {
    accessRoute: {
      rights: ({ user: { rights, login_type } }) =>
        Boolean(rights?.dostuplkp) || login_type === LoginType.WI || Boolean(rights?.limitedAccessOneTeam),
    },
  },
});
