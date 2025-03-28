import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Divider, List, Space, Tabs, Typography } from 'antd';

import { linkToAntDesignThemeEditor, listData, storyItems } from './AppTheme.data';

const { Link } = Typography;

const meta: Meta = {
  title: 'App Theme/App Theme',
};

export default meta;
type Story = StoryObj;

export const AppTheme: Story = {
  render() {
    return (
      <>
        <Card>
          <List
            size='small'
            header={
              <div>
                Для просмотра настроек текущей темы вы можете воспользоваться ant design theme editor. Для этого:
              </div>
            }
            dataSource={listData}
            renderItem={(item, index) => <List.Item>{`${index + 1}. ${item}`}</List.Item>}
          />
          <Divider />
          <Link href={linkToAntDesignThemeEditor} target='_blank'>
            Ссылка на ant design theme editor
          </Link>
        </Card>
        <Space direction='vertical' size='middle'>
          <Tabs defaultActiveKey='0' items={storyItems} />
        </Space>
      </>
    );
  },
};
