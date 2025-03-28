import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { OnlyContentLayout } from '@features/common/ui';

const FactoringPage: React.FC = () => (
  <OnlyContentLayout>
    <Outlet />
  </OnlyContentLayout>
);

export default memo(FactoringPage);
