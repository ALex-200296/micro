import React, { memo, Suspense, useMemo } from 'react';
import { Navigate, Outlet, useLoaderData } from 'react-router-dom';
import { UseLoaderDataType } from '@app/routes/root.types';
import { Tabs } from '@features/common/ui';
import { useRoutedTabs } from '@features/common/ui/Tabs/useRoutedsTabs.hook';
import { TemplateFileAware } from '@shared/ui';
import { PageTitle } from '@shared/ui/molecules/Typography/Page/Title/PageTitle.component';
import { Spin } from 'antd';

import { description, heading } from './PriceListsPage.data';
import { KeyType } from './PriceListsPage.types';

const PriceListsPage: React.FC = () => {
  const loaderData = useLoaderData() as ReturnType<UseLoaderDataType>;
  const { routedTabs, redirect, initialTab } = useRoutedTabs(loaderData.tabs);

  const subTitle = useMemo(() => (initialTab ? description[initialTab as KeyType] : null), [initialTab]);

  if (redirect) return <Navigate to={redirect} replace />;

  return (
    <>
      <PageTitle
        heading={heading}
        subHeading={
          !!subTitle && <TemplateFileAware description={subTitle.descr} path={subTitle.path} name={subTitle.name} />
        }
      />
      <Tabs.Routed routedTabs={routedTabs} initialTab={initialTab} />
      <Suspense fallback={<Spin className='spin_flex spin_justify_center' />}>
        <Outlet />
      </Suspense>
    </>
  );
};
export default memo(PriceListsPage);
