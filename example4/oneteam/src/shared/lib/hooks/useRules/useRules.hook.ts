import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from '@app/store/user/user.selectors';
import { Rules } from '@shared/lib/services/rules/rules.class';
import { cacheRules } from '@shared/lib/utils/helpers/cache';

import { GetAccessRouteType, GetActionAccessType, UseRulesType } from './useRules.types';

const { getRule } = Rules;

export const useRules: UseRulesType = () => {
  const userData = useSelector(userSelectors.getUserSliceData);

  const getAccessRoute: GetAccessRouteType = useCallback(
    (section) => {
      if (getRule(section)) {
        return Object.values(getRule(section).accessRoute).every((fn) => {
          return cacheRules.getCachedValueOrCompute(fn, userData);
        });
      }
      return true;
    },
    [userData],
  );

  const getActionAccess: GetActionAccessType = useCallback(
    (section, action) => {
      if (getRule(section).actions?.[action]) {
        return cacheRules.getCachedValueOrCompute(getRule(section).actions?.[action], userData);
      }
      return false;
    },
    [userData],
  );

  return {
    isAuth: userData.isAuth,
    getAccessRoute,
    getActionAccess,
  };
};
