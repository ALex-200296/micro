import React, { memo, Suspense } from 'react';
import { Navigate, Outlet, useLoaderData } from 'react-router-dom';
import { UseLoaderDataType } from '@app/routes/root.types';
import { Tabs, useRoutedTabs } from '@features/common/ui';
import { PageTitle } from '@shared/ui';
import { Spin } from 'antd';

import { heading } from './Application.data';

const Application = () => {
  const loaderData = useLoaderData() as ReturnType<UseLoaderDataType>;
  const { routedTabs, redirect, initialTab } = useRoutedTabs(loaderData.tabs);

  if (redirect) return <Navigate to={redirect} replace />;

  return (
    <>
      <PageTitle heading={heading} />
      <Tabs.Routed routedTabs={routedTabs} initialTab={initialTab} />
      <Suspense fallback={<Spin className='spin_flex spin_justify_center' />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default memo(Application);
