import React from 'react';
import { ApplyFilter } from '@shared/ui/organisms/Toolbar/Tools/ApplyFilter.component';
import { linkTo } from '@storybook/addon-links';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Card, Typography } from 'antd';

import { Docs as ButtonDocs } from '../../Buttons/IconButton/Docs.stories';

const { Text, Link } = Typography;

const { icon, ...argTypes } = ButtonDocs.argTypes as ArgTypes;
void icon;

const meta: Meta<typeof ApplyFilter> = {
  component: ApplyFilter,
  title: 'Toolbar/Tools/ApplyFilter',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ApplyFilter>;

export const Docs: Story = {
  args: {
    children: 'Фильтр',
    drawerProps: false,
    type: 'default',
    href: '',
    notification: 9,
    size: 'middle',
    shape: 'default',
    disabled: false,
    block: false,
  },
  argTypes: {
    ...argTypes,
    children: { description: 'Лейбл кнопки', table: { defaultValue: { summary: 'Фильтр' } } },
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
          <Text strong>ApplyFilter</Text> - кнопка компонента Toolbar. Отвечает за вызов формы фильтров. Применяется во
          всех местах, где необходима фильтрация. Кнопка состоит из иконки, описания и иконки с счетчиком, которая
          означает количество примененных по месту фильтров. При нажатии, если переданы пропсы дровера - drawerProps,
          открывается дровер с переданной во внутрь формой фильтрации. На вход принимает пропсы кнопки - ButtonProps
          (см. компонент <Link onClick={linkTo('buttons/iconButton')}>Buttons</Link>
          ), имеет значения по умолчанию.
        </Text>
      </Card>
      <Card>
        <ApplyFilter {...args} />
      </Card>
    </>
  ),
};
