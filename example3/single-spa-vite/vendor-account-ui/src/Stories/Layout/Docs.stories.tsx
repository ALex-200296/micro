import React from 'react';
import { Layout } from '@shared/ui/atoms/Layouts/Layout.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Descriptions, Typography } from 'antd';
import { DescriptionsProps } from 'antd/lib';

import { getLinkToAntDesign } from '../stories.data';

import styles from './Docs.module.scss';

const { Text } = Typography;

const meta: Meta<typeof Layout> = {
  component: Layout,
  title: 'layout/Документация',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Layout>;

const itemsLayouts: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'OnlyContentLayout',
    children: <Text>Страница, содержащая только контентную часть.</Text>,
  },
  {
    key: '2',
    label: 'BaseLayout',
    children: <Text>Страница, содержащая Sider или Header, Main content и Footer.</Text>,
  },
];

const itemsComponentOverview: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Layout',
    children: <Text>Контейнер, принимающий блоки Layout.</Text>,
  },
  {
    key: '2',
    label: 'Sider',
    children: <Text>Боковая панель, в которую помещается меню.</Text>,
  },
  {
    key: '3',
    label: 'Content',
    children: <Text>Контентная часть.</Text>,
  },
  {
    key: '4',
    label: 'Footer',
    children: <Text>Подвал страницы.</Text>,
  },
];

const itemsBreakpoints: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'sm',
    children: <Text>600px</Text>,
  },
  {
    key: '2',
    label: 'md',
    children: <Text>960px</Text>,
  },
  {
    key: '3',
    label: 'lg',
    children: <Text>1280px</Text>,
  },
  {
    key: '4',
    label: 'xl',
    children: <Text>1920px</Text>,
  },
];

export const Docs: Story = {
  render: () => (
    <>
      <Text>Layout - Общий макет всех веб-страниц сайта.</Text>
      <Descriptions
        title='Существует 2 представления в проекте'
        items={itemsLayouts}
        className={styles.descriptions}
        column={1}
      />
      <Descriptions
        title='Обзор компонентов'
        items={itemsComponentOverview}
        className={styles.descriptions}
        column={1}
      />
      <Descriptions
        title='breakpoints'
        items={itemsBreakpoints}
        className={styles.descriptions_small}
        column={1}
        size='small'
      />
      <Card>
        <a href={getLinkToAntDesign('layout')}>Ссылка на layout ant design</a>
      </Card>
    </>
  ),
};
