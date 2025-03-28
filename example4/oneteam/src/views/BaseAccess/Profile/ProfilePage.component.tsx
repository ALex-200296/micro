import React, { memo, Suspense } from 'react';
import { Navigate, Outlet, useLoaderData } from 'react-router-dom';
import { UseLoaderDataType } from '@app/routes/root.types';
import { Tabs, useRoutedTabs } from '@features/common/ui';
import { PageTitle } from '@shared/ui';
import { Spin } from 'antd';

import { account } from './ProfilePage.data';

const ProfilePage: React.FC = () => {
  const loaderData = useLoaderData() as ReturnType<UseLoaderDataType>;
  const { routedTabs, redirect, initialTab } = useRoutedTabs(loaderData.tabs);

  if (redirect) return <Navigate to={redirect} replace />;

  return (
    <>
      <PageTitle heading={account} />
      <Tabs.Routed routedTabs={routedTabs} initialTab={initialTab} />
      <Suspense fallback={<Spin className='spin_flex spin_justify_center' />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default memo(ProfilePage);
