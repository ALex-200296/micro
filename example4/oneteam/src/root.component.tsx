// eslint-disable-next-line simple-import-sort/imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { SnackbarProvider } from 'notistack';
import { IntlProvider } from 'react-intl';

import 'dayjs/locale/ru';
import locale from 'antd/locale/ru_RU';

import { store } from './app/store/root.store';
import { addPendingRequestId, removePendingRequestId } from './app/store/ui/ui.slice';
import { antdTheme } from './index.theme';

import './index.scss';
import { snackbarProps } from '@features/common/ui';
import { configureRules, configureHttpClient } from '@shared/lib';
import { routes } from './app/routes/root.route';

configureHttpClient({
  wait: (requestId) => store.dispatch(addPendingRequestId(requestId)),
  notify: (requestId) => store.dispatch(removePendingRequestId(requestId)),
});

configureRules();


export default function Root() {
  console.log(process.env.PUBLIC_URL)
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
