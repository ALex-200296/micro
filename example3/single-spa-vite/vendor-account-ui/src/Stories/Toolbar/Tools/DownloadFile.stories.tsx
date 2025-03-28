import React from 'react';
import { DownloadFile } from '@shared/ui/organisms/Toolbar/Tools/DownloadFile.component';
import { linkTo } from '@storybook/addon-links';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Card, Typography } from 'antd';

import { Docs as ButtonDocs } from '../../Buttons/IconButton/Docs.stories';

const { Text, Link } = Typography;

const { icon, ...argTypes } = ButtonDocs.argTypes as ArgTypes;
void icon;

const meta: Meta<typeof DownloadFile> = {
  component: DownloadFile,
  title: 'Toolbar/Tools/DownloadFile',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DownloadFile>;

export const Docs: Story = {
  args: {
    children: 'Загрузить шаблон',
    drawerProps: false,
    type: 'default',
    href: '',
    notification: 0,
    size: 'middle',
    shape: 'default',
    disabled: false,
    block: false,
  },
  argTypes: {
    ...argTypes,
    children: { description: 'Лейбл кнопки', table: { defaultValue: { summary: 'Загрузить шаблон' } } },
    drawerProps: {
      table: {
        disable: true,
      },
    },
  },

  render: (args) => (
    <>
      <Card>
        <Text>
          <Text strong>DownloadFile</Text> - кнопка компонента Toolbar. Кнопка состоит из иконки и описания. Отвечает за
          загрузку файлов. Применяется во всех местах, где необходима загрузка файлов. При нажатии на кнопку в тулбаре,
          если переданы пропсы дровера - drawerProps, открывается дровер с переданной во внутрь формой для загрузки
          файлов. На вход принимает пропсы кнопки - ButtonProps (см. компонент{' '}
          <Link onClick={linkTo('buttons/iconButton')}>Buttons</Link>
          ), имеет значения по умолчанию.
        </Text>
      </Card>
      <Card>
        <DownloadFile {...args} />
      </Card>
    </>
  ),
};
