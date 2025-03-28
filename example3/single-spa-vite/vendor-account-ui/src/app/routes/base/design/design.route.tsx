import React from 'react';
import {
  DesignWorkPage,
  ProjectInquiries,
  ProjectsPage,
  RedirectFromParent,
  SubmittedProjects,
} from '@app/routes/root.lazy';
import { CreateSliceRouteType, IReturnLoader, Routes } from '@app/routes/root.types';
import { ProjectsRulesKey } from '@shared/lib/services/rules/projects/projects.rules';

export const designRoute: CreateSliceRouteType = {
  id: ProjectsRulesKey.DESIGN,
  path: Routes.DESIGN,
  element: <DesignWorkPage />,
  children: [
    {
      index: true,
      Component: () => <RedirectFromParent {...designRoute} />,
    },
    {
      path: Routes.PROJECTS,
      element: <ProjectsPage />,
      loader: (): IReturnLoader => ({
        tabs: [
          {
            key: Routes.REQUEST,
            id: ProjectsRulesKey.PROJECTS_REQUEST,
            path: `/${Routes.DESIGN}/${Routes.PROJECTS}/${Routes.REQUEST}`,
            label: 'Запросы по проектам',
          },
          {
            key: Routes.SUBMITTED,
            id: ProjectsRulesKey.PROJECTS_SUBMITTED,
            path: `/${Routes.DESIGN}/${Routes.PROJECTS}/${Routes.SUBMITTED}`,
            label: 'Проекты',
          },
        ],
      }),
      children: [
        {
          id: ProjectsRulesKey.PROJECTS_REQUEST,
          path: Routes.REQUEST,
          element: <ProjectInquiries />,
        },
        {
          id: ProjectsRulesKey.PROJECTS_SUBMITTED,
          path: Routes.SUBMITTED,
          element: <SubmittedProjects />,
        },
      ],
    },
  ],
};
