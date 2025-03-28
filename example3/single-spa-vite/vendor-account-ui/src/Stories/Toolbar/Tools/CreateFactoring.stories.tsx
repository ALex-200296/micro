import React from 'react';
import { CreateFactoring } from '@shared/ui/organisms/Toolbar/Tools/CreateFactoring.component';
import { linkTo } from '@storybook/addon-links';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Card, Typography } from 'antd';

import { Docs as ButtonDocs } from '../../Buttons/IconButton/Docs.stories';

const { Text, Link } = Typography;

const { icon, ...argTypes } = ButtonDocs.argTypes as ArgTypes;
void icon;

const meta: Meta<typeof CreateFactoring> = {
  component: CreateFactoring,
  title: 'Toolbar/Tools/CreateFactoring',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CreateFactoring>;

export const Docs: Story = {
  args: {
    children: 'Оставить заявку на факторинг',
    drawerProps: false,
    type: 'primary',
    href: '',
    notification: 0,
    size: 'middle',
    shape: 'default',
    disabled: false,
    block: false,
  },
  argTypes: {
    ...argTypes,
    children: { description: 'Лейбл кнопки', table: { defaultValue: { summary: 'Оставить заявку на факторинг' } } },
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
          <Text strong>CreateFactoring</Text> - кнопка компонента Toolbar. Кнопка состоит из иконки и описания. Отвечает
          за отправку заявки на факторинг. Применяется в разделе Финансов, подраздел - Факторниг. При нажатии на кнопку
          в тулбаре, если переданы пропсы модального окна, открывается модальное окно. По нажатию на кнопку внутри
          модального окна формируется заявка. На вход принимает пропсы кнопки - ButtonProps (см. компонент
          <Link onClick={linkTo('buttons/iconButton')}> Buttons</Link>
          ), имеет значения по умолчанию.
        </Text>
      </Card>
      <Card>
        <CreateFactoring {...args} />
      </Card>
    </>
  ),
};
