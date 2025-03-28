import React, { memo, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { getCookie } from 'react-use-cookie';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { ErrorBoundary, GlobalHistory } from '@entities/common/ui';
import { Notification } from '@features/common/ui';
import { getUserAction } from '@middleware/user/user.saga';
import { Portal, ScreenLock } from '@shared/ui';
import { RootState } from '@store/root.store';
import UploadedFilesModal from '@views/BaseAccess/components/UploadedFilesModal/UploadedFilesModal.component';

const App = () => {
  const dispatch = useDispatch();
  const sId = getCookie('session-id');
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const isScreenLock = useSelector(uiSelectors.getIsScreenLock);

  useEffect(() => {
    if (!isAuth && sId) dispatch(getUserAction());
  }, [isAuth]);
  console.log('hello')
  return (
    <ErrorBoundary>
      {isScreenLock && (
        <Portal>
          <ScreenLock />
        </Portal>
      )}
      <GlobalHistory />
      <Suspense fallback={<ScreenLock />}>
        <Outlet />
      </Suspense>
      <Notification />
      <UploadedFilesModal />
    </ErrorBoundary>
  );
};

export default memo(App);
