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
  id: ProjectsRulesKey.design,
  path: Routes.Design,
  element: <DesignWorkPage />,
  children: [
    {
      index: true,
      Component: () => <RedirectFromParent {...designRoute} />,
    },
    {
      path: Routes.Projects,
      element: <ProjectsPage />,
      loader: (): IReturnLoader => ({
        tabs: [
          {
            key: Routes.Request,
            id: ProjectsRulesKey.projectsRequest,
            path: `/${Routes.Design}/${Routes.Projects}/${Routes.Request}`,
            label: 'Запросы по проектам',
          },
          {
            key: Routes.Submitted,
            id: ProjectsRulesKey.projectsSubmitted,
            path: `/${Routes.Design}/${Routes.Projects}/${Routes.Submitted}`,
            label: 'Проекты',
          },
        ],
      }),
      children: [
        {
          id: ProjectsRulesKey.projectsRequest,
          path: Routes.Request,
          element: <ProjectInquiries />,
        },
        {
          id: ProjectsRulesKey.projectsSubmitted,
          path: Routes.Submitted,
          element: <SubmittedProjects />,
        },
      ],
    },
  ],
};
