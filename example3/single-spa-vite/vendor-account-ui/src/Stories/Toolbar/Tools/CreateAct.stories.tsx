import React from 'react';
import { CreateAct } from '@shared/ui/organisms/Toolbar/Tools/CreateAct.component';
import { linkTo } from '@storybook/addon-links';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Card, Typography } from 'antd';

import { Docs as ButtonDocs } from '../../Buttons/IconButton/Docs.stories';

const { Text, Link } = Typography;

const { icon, ...argTypes } = ButtonDocs.argTypes as ArgTypes;
void icon;

const meta: Meta<typeof CreateAct> = {
  component: CreateAct,
  title: 'Toolbar/Tools/CreateAct',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CreateAct>;

export const Docs: Story = {
  args: {
    children: 'Сформировать акт сверки',
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
    children: { description: 'Лейбл кнопки', table: { defaultValue: { summary: 'Сформировать акт сверки' } } },
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
          <Text strong>CreateAct</Text> - кнопка компонента Toolbar. Кнопка состоит из иконки и описания. Отвечает за
          формирование акта сверки. Применяется в разделе Финансы в подразделе Акты сверки. При нажатии на кнопку в
          тулбаре, если переданы пропсы дровера - drawerProps, открывается дровер с переданной во внутрь формой для
          создания акта сверки. По нажатию на кнопку внутри дровера формируется акт сверки. На вход принимает пропсы
          кнопки - ButtonProps (см. компонент <Link onClick={linkTo('buttons/iconButton')}>Buttons</Link>
          ), имеет значения по умолчанию.
        </Text>
      </Card>
      <Card>
        <CreateAct {...args} />
      </Card>
    </>
  ),
};
