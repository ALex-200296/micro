import React, { memo, Suspense, useMemo } from 'react';
import { Navigate, Outlet, useLoaderData } from 'react-router-dom';
import { UseLoaderDataType } from '@app/routes/root.types';
import { Tabs, useRoutedTabs } from '@features/common/ui';
import { PageTitle, TemplateFileAware } from '@shared/ui';
import { Spin } from 'antd';

import { description, heading } from './ControlPage.data';
import { KeyType } from './ControlPage.types';

const ControlPage = () => {
  const loaderData = useLoaderData() as ReturnType<UseLoaderDataType>;
  const { routedTabs, redirect, initialTab } = useRoutedTabs(loaderData.tabs);

  const subTitle = useMemo(() => (initialTab ? description[initialTab as KeyType] : null), [initialTab]);

  if (redirect) return <Navigate to={redirect} replace />;

  return (
    <>
      <PageTitle
        heading={heading}
        subHeading={
          subTitle && (
            <TemplateFileAware description={subTitle.descr} path={subTitle.path} name={subTitle.name} />
          )
        }
      />
      <Tabs.Routed routedTabs={routedTabs} initialTab={initialTab} />
      <Suspense fallback={<Spin className='spin_flex spin_justify_center' />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default memo(ControlPage);
