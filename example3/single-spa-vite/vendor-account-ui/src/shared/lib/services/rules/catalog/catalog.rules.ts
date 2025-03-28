import { LoginType } from '@middleware/user/user.types';

import { Rules } from '../rules.class';

export const CatalogRulesKey = {
  CATALOG: 'catalog',
  CATALOG_DOWNLOAD: 'catalogDownload',
} as const;

export const catalogRules = Rules.createSliceRule({
  [CatalogRulesKey.CATALOG]: {
    accessRoute: {
      rights: ({ user: { rights, login_type } }) => Boolean(rights?.dostuplkp) || login_type === LoginType.WI,
    },
  },
  [CatalogRulesKey.CATALOG_DOWNLOAD]: {
    accessRoute: {
      rights: () => true,
    },
    actions: {
      templateDownload: ({ user: { login_type } }) => login_type === LoginType.WI,
    },
  },
});
