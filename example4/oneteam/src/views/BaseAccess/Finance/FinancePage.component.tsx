import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

const FinancePage: React.FC = () => <Outlet />;

export default memo(FinancePage);
