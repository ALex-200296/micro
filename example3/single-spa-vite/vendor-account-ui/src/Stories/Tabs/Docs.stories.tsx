import { Tabs } from '@features/common/ui/Tabs/Tabs.component';
import type { Meta, StoryObj } from '@storybook/react';

import { disableProps } from '../stories.data';

import { items, propsToDisable, tabsProps } from './Docs.data';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'tabs/Документация',
  tags: ['autodocs'],
  argTypes: {
    ...disableProps(propsToDisable),
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Docs: Story = {
  args: {
    items,
  },
  argTypes: {
    items: {
      table: {
        type: {
          summary: 'TabsProps[items]',
          detail: tabsProps,
        },
      },
      description: 'Массив значений табов.',
    },
    activeKey: {
      description: 'Установить активный таб по ключу.',
    },
    rootClassName: {
      description: 'Класс стилей, навешиваемый на компонент таб.',
    },
    animated: {
      description: 'Менять ли вкладки с анимацией.',
    },
    centered: {
      description: 'Установить выравнивание по центру.',
    },
    defaultActiveKey: {
      description: 'Установить начальный активный ключ',
    },
    popupClassName: {
      description: 'Класс стилей, навешиваемый на раскрывающийся список табов.',
    },
    size: {
      description: 'Установить размер таба.',
    },
    tabBarExtraContent: {
      description: 'Установить дополнительный контент в панели вкладок.',
    },
    tabBarGutter: {
      description: 'Установить расстояние между табами.',
    },
    tabBarStyle: {
      description: 'Inline стили таба.',
    },
    tabPosition: {
      description: 'Расположение компонента с табами.',
    },
    destroyInactiveTabPane: {
      description: 'Удалить неактивный таб из DOM дерева.',
    },
    type: {
      description: 'Стиль вкладок.',
    },
    onChange: {
      description: 'Функция, которая вызывается при изменении активного таба.',
    },
    onEdit: {
      description:
        'Функция, которая вызывается при добавлении или удалении таба. Работает только если type="editable-card"',
    },
    onTabClick: {
      description: 'Функция, которая вызывается при клике на таб.',
    },
    onTabScroll: {
      description: 'Трригер, при прокрутке списка табов.',
    },
    getPopupContainer: {},
    style: {
      description: 'Inline стили компонента.',
    },
    direction: {
      description: 'Направление компонента.',
    },
    className: {
      description: 'Указать класс css',
    },
  },
};
