import React from 'react';
import { Collapse } from '@shared/ui/atoms/Collapse/Collapse.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Space, Typography } from 'antd';

import { disableProps, getLinkToAntDesign } from '../stories.data';

import { collapseItems, collapsePropsToHide, itemDetails } from './Docs.data';

const { Link } = Typography;

const meta: Meta<typeof Collapse> = {
  component: Collapse,
  title: 'Collapse/Документация',
  tags: ['autodocs'],
  argTypes: { ...disableProps(collapsePropsToHide) },
};

export default meta;
type Story = StoryObj<typeof Collapse>;

export const Docs: Story = {
  args: {
    items: collapseItems,
    accordion: false,
    ghost: true,
    size: 'small',
    defaultActiveKey: [1, 3],
    bordered: false,
  },
  argTypes: {
    accordion: {
      description: 'Влючение режима аккордиона (одновременно можно развернуть только одну панель)',
    },
    items: {
      description: 'Конфигурация элементов компонента',
      table: {
        type: {
          detail: itemDetails,
        },
      },
    },
    collapsible: {
      description: `Определяет положение триггера и возможность коллапса.
      Если свойство не задано, триггер коллапса - это вся панель.`,
      control: 'radio',
      options: [undefined, 'header', 'icon', 'disabled'],
    },
    ghost: {
      description: 'Делает фон коллапса прозрачным и изменяет внешний вид границ, если задано свойство bordered',
    },
    size: {
      description: 'Размер коллапсов, в основном влияет на отступы',
    },
    bordered: {
      description: 'Отображение границ коллапсов',
    },
    defaultActiveKey: {
      description: 'Ключи коллапсов, которые должны быть развернуты при первом рендере',
    },
    destroyInactivePanel: {
      description: 'Если панель не активна, делать unmount ее контента',
    },
    expandIcon: {
      description: 'Кастомизация иконки открытия панели',
    },
    expandIconPosition: {
      description: 'Расположение иконки открытия панели',
    },
    onChange: {
      description: 'Функция, вызываемая при изменении панели (прим: открытие-закрытие панели)',
    },
    style: {
      description: 'Inline стили компонента',
    },
    className: {
      description: 'Класс стилей, навешиваемый на компонент',
    },
    rootClassName: {
      description: 'Класс стилей, позволяющий переписать дефолтные библиотечные стили',
    },
  },
  render: (args) => (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Card title='Демо Collapse'>
        <Collapse {...args} />
      </Card>
      <Card>
        Ссылка на компонент <Link href={getLinkToAntDesign('collapse')}>Ant Design</Link>
      </Card>
    </Space>
  ),
};
