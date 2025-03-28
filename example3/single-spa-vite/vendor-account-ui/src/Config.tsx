import React from 'react'
import { Provider } from 'react-redux';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { SnackbarProvider } from 'notistack';
import { IntlProvider } from 'react-intl';

import 'dayjs/locale/ru';
import locale from 'antd/locale/ru_RU';

import { store } from '@store/root.store';
import { addPendingRequestId, removePendingRequestId } from './app/store/ui/ui.slice';
import { antdTheme } from './index.theme';
import reportWebVitals from './reportWebVitals';
import { routes } from './app/routes/root.route';

import './index.scss';
import { snackbarProps } from '@features/common/ui';
import { configureRules, configureHttpClient } from '@shared/lib';

configureHttpClient({
    wait: (requestId) => store.dispatch(addPendingRequestId(requestId)),
    notify: (requestId) => store.dispatch(removePendingRequestId(requestId)),
  });
  
  configureRules();
  
export const Config = () => {
    return (
        <Provider store={store}>
        <IntlProvider locale='ru'>
                <ConfigProvider theme={antdTheme} locale={locale}>
                    <SnackbarProvider {...snackbarProps}>
                        <RouterProvider router={routes} />
                    </SnackbarProvider>
                </ConfigProvider>
            </IntlProvider>
        </Provider>
    )
}