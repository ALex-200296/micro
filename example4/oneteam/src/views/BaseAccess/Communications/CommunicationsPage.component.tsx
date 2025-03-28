import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

const CommunicationsPage = () => <Outlet />;

export default memo(CommunicationsPage);
