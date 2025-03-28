import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BarChartOutlined } from '@ant-design/icons';
import { WrapWithNavigate } from '@entities/common/ui/WrapWithNavigate/WrapWithNavigate.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Space, Typography } from 'antd';

import { Docs } from './Docs.stories';

const { Paragraph, Link, Title } = Typography;

const meta: Meta<typeof WrapWithNavigate> = {
  component: WrapWithNavigate,
  title: 'Wrap With Navigate/Navigate',
};

export default meta;
type Story = StoryObj<typeof WrapWithNavigate>;

export const Navigate: Story = {
  ...Docs,
  render: (args) => (
    <Space direction='vertical'>
      <Card title='Демо компонента WrapWithNavigate с возможностью редиректа'>
        <Router>
          <WrapWithNavigate {...args} shouldWrap={true} to={'https://ya.ru/'} />
        </Router>
      </Card>
      <Card title='Демо компонента WrapWithNavigate без возможности редиректа'>
        <Router>
          <WrapWithNavigate {...args} to={'https://google.com/'} shouldWrap={false}>
            <Title>
              <BarChartOutlined />
              <Paragraph>контент с иконкой</Paragraph>
            </Title>
          </WrapWithNavigate>
        </Router>
      </Card>
      <Card>
        <Paragraph>
          Компонент, который меняет текущее местоположение при рендере. Является компонентом - оберткой на основе
          Navigate из библиотеки React Router. Отличительной особенностью WrapWithNavigate от Navigate является
          возможность отключать редирект.
        </Paragraph>
      </Card>
      <Card>
        <Link target='_blank' href='https://reactrouter.com/en/main/components/navigate#navigate'>
          ссылка на Navigate
        </Link>
      </Card>
    </Space>
  ),
};
