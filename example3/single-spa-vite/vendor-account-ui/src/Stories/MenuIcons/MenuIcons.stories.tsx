import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Divider, List, Typography } from 'antd';

import { getLinkToAntDesign } from '../stories.data';

import { iconMenuList } from './Docs.data';

const { Link, Text } = Typography;

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'Menu Icons/MenuIcons',
};

export default meta;
type Story = StoryObj<typeof Link>;

export const MenuIcons: Story = {
  render: () => {
    return (
      <Card title='Список иконок для панели меню из библиотеки Ant Design.'>
        <List
          dataSource={Object.entries(iconMenuList)}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta avatar={item[1]['icon']} title={item[1]['name']} description={item[1]['text']} />
            </List.Item>
          )}
        />
        <Divider />
        <Text>
          Ссылка на <Link href={getLinkToAntDesign('icon/')}>иконки Ant Design</Link>
        </Text>
      </Card>
    );
  },
};
