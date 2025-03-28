import React from 'react';
import { CollapseContent } from '@shared/ui/molecules/CollapseContent/CollapseContent.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Space, Tag, Typography } from 'antd';

import { getLinkToAntDesign } from '../../stories.data';

const { Link, Paragraph } = Typography;

const meta: Meta<typeof CollapseContent> = {
  component: CollapseContent,
  title: 'Collapse/CollapseContent/Документация',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CollapseContent>;

export const Docs: Story = {
  args: {
    content: [
      {
        label: 'Лейбл1',
        children: 'Значение1',
      },
      {
        label: 'Лейбл2',
        children: 'Значение2',
      },
      {
        label: 'Лейбл3',
        children: 'Значение3',
      },
    ],
    contentAction: {
      actionText: 'Текст кнопки',
      onClick: () => alert('Клик'),
    },
    extra: (
      <Space>
        <Tag>Тег1</Tag>
        <Tag>Тег2</Tag>
        <Tag>Тег3</Tag>
      </Space>
    ),
  },
  argTypes: {
    content: {
      description: 'Контент внутри выпадающего списка',
    },
    contentAction: {
      description: 'Действие (кнопка) внутри выпадающего списка',
    },
    extra: {
      description: 'Позволяет отрисовать дополнительный контент в правом вернем углу',
    },
  },
  render: (args) => (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Card title='Демо компонента'>
        <CollapseContent {...args} />
      </Card>
      <Card title='Описание'>
        <Paragraph>
          Компонент предназначен для отображения контента коллапса в виде дескпришена antd. Есть возможность добавить
          кнопку с экшеном и дополнительные данные (extra) при необходимости.
        </Paragraph>
      </Card>
      <Card>
        Ссылка на компонент <Link href={getLinkToAntDesign('descriptions')}>Ant Design</Link>
      </Card>
    </Space>
  ),
};
