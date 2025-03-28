import { LoginType } from '@middleware/user/user.types';

import { Rules } from '../rules.class';

export const CatalogRulesKey = {
  catalog: 'catalog',
  catalogDownload: 'catalogDownload',
} as const;

export const catalogRules = Rules.createSliceRule({
  [CatalogRulesKey.catalog]: {
    accessRoute: {
      rights: ({ user: { rights, login_type } }) => Boolean(rights?.dostuplkp) || login_type === LoginType.WI,
    },
  },
  [CatalogRulesKey.catalogDownload]: {
    accessRoute: {
      rights: () => true,
    },
    actions: {
      templateDownload: ({ user: { login_type } }) => login_type === LoginType.WI,
    },
  },
});
