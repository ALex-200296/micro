import React, { memo, useMemo } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { getCookie } from 'react-use-cookie';
import { ArrowLeftOutlined as ArrowBackIcon } from '@ant-design/icons';
import { Routes } from '@app/routes/root.types';
import { OnlyContentLayout } from '@features/common/ui';
import { IconButton } from '@shared/ui';

import LoginForm from './Form/LoginForm.component';

import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const sId = useMemo(() => getCookie('session-id'), []);

  if (!sId) {
    return (
      <OnlyContentLayout>
        <div className={styles.login_box}>
          <NavLink to={Routes.HOME}>
            <IconButton dataTestId='login-page' className={styles.btn_back} shape='circle' icon={<ArrowBackIcon />} />
          </NavLink>
          <LoginForm />
        </div>
      </OnlyContentLayout>
    );
  }
  return <Navigate to={Routes.HOME} />;
};

export default memo(LoginPage);
