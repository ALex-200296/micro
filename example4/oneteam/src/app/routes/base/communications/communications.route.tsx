import React from 'react';
import { CommunicationsPage, DiaryPage, RedirectFromParent } from '@app/routes/root.lazy';
import { Routes } from '@app/routes/root.types';
import { CommunicationsRulesKey } from '@shared/lib/services/rules/communications/Communications.rules';

export const communicationsRoute = {
  id: CommunicationsRulesKey.diary,
  path: Routes.Communications,
  element: <CommunicationsPage />,
  children: [
    {
      index: true,
      Component: () => <RedirectFromParent {...communicationsRoute} />,
    },
    {
      path: Routes.Diary,
      element: <DiaryPage />,
    },
  ],
};
