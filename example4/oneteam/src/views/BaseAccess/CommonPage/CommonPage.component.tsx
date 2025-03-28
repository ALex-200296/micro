import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

const CommonPage = () => <Outlet />;

export default memo(CommonPage);
