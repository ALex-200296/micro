import React, { memo } from 'react';
import { Navigate, Outlet, useMatches } from 'react-router-dom';
import { getCookie } from 'react-use-cookie';
import { Routes } from '@app/routes/root.types';
import { useRules } from '@shared/lib/hooks/useRules/useRules.hook';
import { CombineRules } from '@shared/lib/services/rules/rules.service';

const RulesGuard: React.FC = () => {
  const sId = getCookie('session-id');
  const matches = useMatches();
  const { getAccessRoute, isAuth } = useRules();
  if (!sId) {
    return <Navigate to={Routes.Login} />;
  }

  if (!isAuth) return null;

  const access = matches.every((match) => getAccessRoute(match.id as keyof CombineRules));

  return access ? <Outlet /> : <Navigate to={Routes.Home} />;
};

export default memo(RulesGuard);
