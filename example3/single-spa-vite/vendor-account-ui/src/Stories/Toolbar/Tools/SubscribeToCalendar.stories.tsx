import React from 'react';
import { SubscribeToCalendar } from '@shared/ui/organisms/Toolbar/Tools/SubscribeToCalendar.component';
import { linkTo } from '@storybook/addon-links';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Card, Typography } from 'antd';

import { Docs as ButtonDocs } from '../../Buttons/IconButton/Docs.stories';

const { Text, Link } = Typography;

const { icon, ...argTypes } = ButtonDocs.argTypes as ArgTypes;
void icon;

const meta: Meta<typeof SubscribeToCalendar> = {
  component: SubscribeToCalendar,
  title: 'Toolbar/Tools/SubscribeToCalendar',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SubscribeToCalendar>;

export const Docs: Story = {
  args: {
    children: 'Подписаться на календарь',
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
    children: { description: 'Лейбл кнопки', table: { defaultValue: { summary: 'Подписаться на календарь' } } },
  },

  render: (args) => (
    <>
      <Card>
        <Text>
          <Text strong>SubscribeToCalendar</Text> - кнопка компонента Toolbar. Кнопка состоит из иконки и описания.
          Применяется в разделе Ежедневник. При нажатии появляется уведомление об отправке на email пользователя ссылки
          на календарь. На вход принимает пропсы кнопки - ButtonProps (см. компонент{' '}
          <Link onClick={linkTo('buttons/iconButton')}>Buttons</Link>
          ), имеет значения по умолчанию.
        </Text>
      </Card>
      <Card>
        <SubscribeToCalendar {...args} />
      </Card>
    </>
  ),
};
