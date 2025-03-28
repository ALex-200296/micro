import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

const DesignWorkPage: React.FC = () => <Outlet />;

export default memo(DesignWorkPage);
