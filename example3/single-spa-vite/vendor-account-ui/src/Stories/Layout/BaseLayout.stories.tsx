import React from 'react';
import { LogoutOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { BaseLayout } from '@features/common/ui/Layouts/BaseLayout/BaseLayout.component';
import { useBreakpoints } from '@shared/lib/hooks/useBreakpoints/useBreackpoints.hook';
import type { Meta, StoryObj } from '@storybook/react';
import { Menu, MenuProps } from 'antd';

import styles from './Docs.module.scss';

const meta: Meta<typeof BaseLayout> = {
  component: BaseLayout,
  title: 'layout/BaseLayout/Документация',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BaseLayout>;

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  { label: 'Пример', key: 'example', icon: <QuestionCircleOutlined onClick={() => alert('клик на пример')} /> },
  { label: 'Профиль', key: 'profile', icon: <UserOutlined onClick={() => alert('клик на профиль')} /> },
  { label: 'Помощь', key: 'help', icon: <QuestionCircleOutlined onClick={() => alert('клик на помощь')} /> },
  { label: 'Выйти', key: 'logout', icon: <LogoutOutlined onClick={() => alert('клик на выйти')} /> },
];

export const Docs: Story = {
  args: {
    children: 'content',
    footer: <div>Footer</div>,
    footerClassName: styles.base_layout_footer,
    contentClassName: styles.base_layout_content,
  },
  argTypes: {
    menu: {
      description: 'Компонент меню, в зависимости от расширения он попадает в Sider, либо в Header',
    },
    children: {
      description: 'Контентная часть страницы. Может быть вложен любой элемент, который должен быть помещен в Layout',
    },
    footer: {
      description: 'Подвал страницы. Может быть вложен любой элемент, который должен быть помещен в Layout.',
    },
    footerClassName: {
      description: 'Класс стилей, навешиваемый на нижнюю часть контейнера',
    },
    contentClassName: {
      description: 'Класс стилей, навешиваемый на контентную часть контейнера',
    },
    siderIsCollapsible: {
      description: 'Флаг, определяющий раскрывающееся у нас меню или нет',
    },
  },
  render: (args) => {
    const { isDesktop } = useBreakpoints();
    return <BaseLayout {...args} menu={<Menu items={items} mode={isDesktop ? 'vertical' : 'horizontal'} />} />;
  },
};
