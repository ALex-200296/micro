import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from 'react-use-cookie';
import { Routes } from '@app/routes/root.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { setHelpState } from '@app/store/ui/ui.slice';
import { userSelectors } from '@app/store/user/user.selectors';
import { logoutUserAction } from '@middleware/user/user.saga';
import { LogoIcon, TestLogoIcon } from '@shared/assets';
import { delay, useRules } from '@shared/lib';
import { useBreakpoints } from '@shared/lib/hooks/useBreakpoints/useBreackpoints.hook';
import { ModalMobile } from '@shared/ui';
import { ConfigProvider, Menu as AntMenu, MenuProps, Typography } from 'antd';
import cn from 'classnames';

import QuestionForm from './QuestionForm/QuestionForm.component';
import { getBottomMenu, getMainMenu, isProd, menuThemeConfig, menuTitle } from './Menu.data';

import styles from './Menu.module.scss';

export const Menu: React.FC = memo(() => {
  const { isDesktop } = useBreakpoints();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const sId = getCookie('session-id');

  const menuIsOpen = useSelector(uiSelectors.getMenuState);
  const helpIsOpen = useSelector(uiSelectors.getHelpState);
  const { rights } = useSelector(userSelectors.getUserRights);
  const { OrgName } = useSelector(userSelectors.getUserCompanyInfo);

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [showOrgName, setShowOrgName] = useState(false);

  const { getAccessRoute, isAuth } = useRules();

  const handleHelpOpen = useCallback(() => dispatch(setHelpState(true)), []);
  const handleHelpClose = useCallback(() => dispatch(setHelpState(false)), []);
  const handleLogout = useCallback(() => {
    dispatch(logoutUserAction({ navigate }));
  }, []);

  const menuDirection: MenuProps['mode'] = useMemo(() => (isDesktop ? 'inline' : 'horizontal'), [isDesktop]);
  const selectedKeys = useMemo(() => pathname.split('/').filter((value) => !!value), [pathname]);
  const bottomMenu = useMemo(
    () => getBottomMenu(!!sId, handleHelpOpen, handleLogout, rights, !isDesktop),
    [rights, sId, isDesktop],
  );
  const mainMenu = useMemo(() => getMainMenu(menuIsOpen, isAuth, getAccessRoute), [isAuth, getAccessRoute, menuIsOpen]);

  const onOpenChange = useCallback((openKeys: string[]) => {
    setOpenKeys(openKeys);
  }, []);

  const setDataWithAnimationDelay = async () => {
    await delay(50);
    setOpenKeys([selectedKeys[0]]);
    setShowOrgName(true);
  };

  useEffect(() => {
    menuIsOpen ? setDataWithAnimationDelay() : setShowOrgName(false);
  }, [menuIsOpen]);

  return (
    <ConfigProvider theme={menuThemeConfig}>
      <div className={cn(styles.menu_container, { [styles.menu_container_mobile]: !isDesktop })}>
        <div className={cn(styles.logo_and_menu, { [styles.logo_and_menu_mobile]: !isDesktop })}>
          <div
            className={cn(
              styles.logo_container,
              { [styles.logo_container_open]: menuIsOpen },
              { [styles.logo_mobile]: !isDesktop },
            )}
          >
            <Link to={Routes.HOME}>
              {isProd ? (
                <LogoIcon aria-label='логотип' className={styles.logo_icon} />
              ) : (
                <TestLogoIcon aria-label='логотип-тест' className={styles.test_icon} />
              )}
            </Link>
            {showOrgName && (
              <div className={styles.organization}>
                <Typography.Text type='secondary'>{OrgName}</Typography.Text>
              </div>
            )}
          </div>
          <div>
            {!!mainMenu.length && isDesktop && (
              <AntMenu
                selectedKeys={selectedKeys}
                mode='inline'
                items={mainMenu}
                onOpenChange={onOpenChange}
                openKeys={openKeys}
                rootClassName={styles.menu}
              />
            )}
          </div>
        </div>
        <AntMenu
          mode={menuDirection}
          selectedKeys={selectedKeys}
          items={bottomMenu}
          rootClassName={styles.menu}
          disabledOverflow={!isDesktop}
        />
        <ModalMobile title={menuTitle} isOpen={helpIsOpen} handleClose={handleHelpClose} footer={null}>
          <QuestionForm afterSubmit={handleHelpClose} />
        </ModalMobile>
      </div>
    </ConfigProvider>
  );
});
