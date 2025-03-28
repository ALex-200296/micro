import { useMemo } from 'react';
import { useMatches } from 'react-router-dom';
import { IReturnLoader, Routes } from '@app/routes/root.types';
import { CombineRules, useRules } from '@shared/lib';

export const useRoutedTabs = (tabs: IReturnLoader['tabs']) => {
  const matches = useMatches();
  const { getAccessRoute } = useRules();

  const routedTabs = useMemo(() => tabs.filter((tab) => getAccessRoute(tab.id as keyof CombineRules)), []);
  const initialTab = useMemo(() => routedTabs.find((routedTab) => routedTab.id === matches.at(-1)?.id)?.key, [matches]);
  const redirect = useMemo(
    () => (!initialTab ? (routedTabs ? routedTabs[0].path : Routes.HOME) : null),
    [routedTabs, initialTab],
  );

  return {
    redirect,
    initialTab,
    routedTabs,
  };
};
