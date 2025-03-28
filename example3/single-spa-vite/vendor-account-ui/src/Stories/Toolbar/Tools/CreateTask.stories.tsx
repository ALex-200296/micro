import React from 'react';
import { CreateTask } from '@shared/ui/organisms/Toolbar/Tools/CreateTask.component';
import { linkTo } from '@storybook/addon-links';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Card, Typography } from 'antd';

import { Docs as ButtonDocs } from '../../Buttons/IconButton/Docs.stories';

const { Text, Link } = Typography;

const { icon, ...argTypes } = ButtonDocs.argTypes as ArgTypes;
void icon;

const meta: Meta<typeof CreateTask> = {
  component: CreateTask,
  title: 'Toolbar/Tools/CreateTask',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CreateTask>;

export const Docs: Story = {
  args: {
    children: 'Создать встречу',
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
    children: { description: 'Лейбл кнопки', table: { defaultValue: { summary: 'Создать встречу' } } },
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
          <Text strong>CreateTask</Text> - кнопка компонента Toolbar. Кнопка состоит из иконки и описания. Отвечает за
          вызов формы создания встречи. Применяется в разделе Ежедневник. При нажатии на кнопку в тулбаре, если переданы
          пропсы дровера - drawerProps, открывается дровер с переданной во внутрь формой для создания встречи. По
          нажатию на кнопку внутри дровера создается встреча. На вход принимает пропсы кнопки - ButtonProps (см.
          компонент <Link onClick={linkTo('buttons/iconButton')}>Buttons</Link>
          ), имеет значения по умолчанию.
        </Text>
      </Card>
      <Card>
        <CreateTask {...args} />
      </Card>
    </>
  ),
};
