import React from 'react';
import type { Preview } from '@storybook/react';
import { ConfigProvider } from 'antd';
import { antdTheme } from '../src/index.theme';
import locale from 'antd/locale/ru_RU';
import { Provider } from 'react-redux';
import { store } from '../src/app/store/root.store';
import { SnackbarProvider } from 'notistack';
import { snackbarProps } from '../src/features/common/ui/Notification/Notification.data';

import '../src/index.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  argTypes: {
    className: {
      description: 'CSS класс компонента',
    },
    style: {
      description: 'Inline стили компонента',
      control: 'object',
    },
    prefixCls: {
      table: {
        disable: true,
      },
    },
    rootClassName: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ConfigProvider theme={antdTheme} locale={locale}>
          <SnackbarProvider {...snackbarProps} maxSnack={10}>
            {<Story />}
          </SnackbarProvider>
        </ConfigProvider>
      </Provider>
    ),
  ],
};

export default preview;
