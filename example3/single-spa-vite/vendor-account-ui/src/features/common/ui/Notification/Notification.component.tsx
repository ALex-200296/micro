import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { getVariantNotification } from '@app/store/ui/ui.data';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { removeNotification } from '@app/store/ui/ui.slice';
import { serverError } from '@entities/common/ui';
import { useSnackbar } from 'notistack';

import { anchorOrigin, getMessageTemplate } from './Notification.data';

let displayed: string[] = [];

export const Notification = () => {
  const notifications = useSelector(uiSelectors.getNotifications);
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (key: string) => {
    displayed = [...displayed, key];
  };

  const removeDisplayed = (key: string) => {
    displayed = [...displayed.filter((value) => value !== key)];
  };

  const handleDismiss = (key: string) => {
    closeSnackbar(key);
  };

  const handleEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string) => {
    const { tagName } = event.target as HTMLDivElement;
    if (tagName.toLowerCase() === 'a') handleDismiss(key);
  };

  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach(({ key, message, code, variant, autoHide = true, isCloseIcon = true }) => {
        if (displayed.includes(key)) return;
        if (code && serverError.test(`${Math.round(code)}`)) return;
        enqueueSnackbar(
          <div data-testid={`notification-${key}`} onClick={(event) => handleEvent(event, `${key}`)}>
            {getMessageTemplate(message)}
          </div>,
          {
            key,
            variant: getVariantNotification(code, variant),
            onExited: (node: HTMLElement, myKey: string | number) => {
              dispatch(removeNotification(`${myKey}`));
              removeDisplayed(`${myKey}`);
            },
            ...(isCloseIcon && {
              action: (key) => <CloseOutlined onClick={() => handleDismiss(`${key}`)} />,
            }),
            anchorOrigin: anchorOrigin,
            autoHideDuration: autoHide ? 3000 : null,
            preventDuplicate: true,
          },
        );
        storeDisplayed(key);
      });
    }
  }, [notifications, displayed, enqueueSnackbar, dispatch]);

  return null;
};

export default memo(Notification);
