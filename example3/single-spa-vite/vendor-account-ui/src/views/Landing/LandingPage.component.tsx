import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMenuState } from '@app/store/ui/ui.slice';
import { Menu } from '@entities/common/ui';
import { BaseLayout } from '@features/common/ui';

import Home from './Home/Home.component';
import Footer from './Home/HomePageSections/Footer/Footer.component';

import styles from './LandingPage.module.scss';

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMenuState(false));
    return () => {
      dispatch(setMenuState(true));
    };
  }, []);

  return (
    <BaseLayout menu={<Menu />} siderIsCollapsible={false} footer={<Footer />} footerClassName={styles.footer}>
      <Home />
    </BaseLayout>
  );
};

export default memo(LandingPage);
