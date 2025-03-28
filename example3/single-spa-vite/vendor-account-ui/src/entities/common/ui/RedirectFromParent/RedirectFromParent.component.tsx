import React, { memo, useMemo } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { Routes } from '@app/routes/root.types';
import { useRules } from '@shared/lib/hooks/useRules/useRules.hook';
import { CombineRules } from '@shared/lib/services/rules/rules.service';

const RedirectFromParent: React.FC<RouteObject> = ({ children }) => {
  const { getAccessRoute } = useRules();
  const availableRoute = useMemo(
    () => children?.find(({ id, index }) => getAccessRoute(id as keyof CombineRules) && !index),
    [],
  );
  return availableRoute ? <Navigate replace to={`${availableRoute.path}`} /> : <Navigate to={Routes.HOME} />;
};

export default memo(RedirectFromParent);
