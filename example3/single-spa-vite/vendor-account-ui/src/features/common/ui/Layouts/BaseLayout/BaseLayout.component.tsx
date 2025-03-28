import React, { memo, Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { setMenuState } from '@app/store/ui/ui.slice';
import { Layout as LayoutAntd, Spin } from 'antd';

import { headerProps, siderProps } from './BaseLayout.data';
import { IBaseLayoutProps } from './BaseLayout.types';

const { Header, Sider, Content, Footer } = LayoutAntd;

import { useBreakpoints } from '@shared/lib';
import { Layout } from '@shared/ui/atoms';

import styles from './BaseLayout.module.scss';

export const BaseLayout: React.FC<IBaseLayoutProps> = ({
  menu,
  children,
  footer,
  contentClassName,
  footerClassName,
  siderIsCollapsible = true,
}) => {
  const dispatch = useDispatch();
  const { isDesktop } = useBreakpoints();

  const isOpen = useSelector(uiSelectors.getMenuState);

  const handleCollapse = useCallback((value: boolean) => {
    dispatch(setMenuState(!value));
  }, []);

  return (
    <Layout>
      {!isDesktop ? (
        <Header {...headerProps}>{menu}</Header>
      ) : (
        <Sider collapsed={!isOpen} onCollapse={handleCollapse} {...siderProps} collapsible={siderIsCollapsible}>
          {menu}
        </Sider>
      )}
      <LayoutAntd className={styles.position_center}>
        <Suspense fallback={<Spin />}>
          <Content className={contentClassName}>{children}</Content>
          {footer && <Footer className={footerClassName}>{footer}</Footer>}
        </Suspense>
      </LayoutAntd>
    </Layout>
  );
};

export default memo(BaseLayout);
