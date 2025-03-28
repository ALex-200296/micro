import React from 'react';
import { Tabs as BaseTabs } from '@features/common/ui/Tabs/Tabs.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Space, Typography } from 'antd';

import { getLinkToAntDesign } from '../stories.data';

import { imageExample, routerProps } from './Docs.data';

const { Paragraph, Link } = Typography;

const meta: Meta<typeof BaseTabs> = {
  component: BaseTabs,
  title: 'Tabs/Tabs',
};

export default meta;
type Story = StoryObj<typeof BaseTabs>;

export const Tabs: Story = {
  render: () => (
    <Space direction='vertical'>
      <Card title='Tabs Router'>
        <Paragraph>
          Компонент Tabs Router, подключается к маршрутизации проекта.Компонент отдает нужный контент и изменяет
          активный таб в зависимости от маршрута прописанных в параметрах:
          <pre>{JSON.stringify(routerProps, null, 2)}</pre>
          <Paragraph>Пример:</Paragraph>
          <img src={`${import.meta.env.VITE_APP_CDN}/oneteam/storybook/v1/addressBar.jpg`} />
          <pre>{JSON.stringify(imageExample, null, 2)}</pre>
        </Paragraph>
      </Card>
      <Card>
        Ссылка на <Link href={getLinkToAntDesign('tabs')}>компонент Ant Design</Link>
      </Card>
    </Space>
  ),
};
