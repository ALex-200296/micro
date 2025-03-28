import React from 'react';
import { OpenDocumentation } from '@shared/ui/organisms/Toolbar/Tools/OpenDocumentation.component';
import { linkTo } from '@storybook/addon-links';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Card, Typography } from 'antd';

import { Docs as ButtonDocs } from '../../Buttons/IconButton/Docs.stories';

const { Text, Link } = Typography;

const { icon, ...argTypes } = ButtonDocs.argTypes as ArgTypes;
void icon;

const meta: Meta<typeof OpenDocumentation> = {
  component: OpenDocumentation,
  title: 'Toolbar/Tools/OpenDocumentation',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OpenDocumentation>;

export const Docs: Story = {
  args: {
    children: 'Документация',
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
    children: { description: 'Лейбл кнопки', table: { defaultValue: { summary: 'Документация' } } },
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
          <Text strong>OpenDocumentation</Text> - кнопка компонента Toolbar. Кнопка состоит из иконки и описания.
          Отвечает за вызов дровера. Применяется во всех местах, где необходимо отображать документацию. При нажатии,
          если переданы пропсы дровера - drawerProps, открывается дровер с переданной во внутрь документацией. На вход
          принимает пропсы кнопки - ButtonProps (см. компонент{' '}
          <Link onClick={linkTo('buttons/iconButton')}>Buttons</Link>
          ), имеет значения по умолчанию.
        </Text>
      </Card>
      <Card>
        <OpenDocumentation {...args} />
      </Card>
    </>
  ),
};
