import React from 'react';
import { TwitterOutlined } from '@ant-design/icons';
import { IconButton } from '@shared/ui/molecules/Button/IconButton/IconButton.component';
import type { Meta, StoryObj } from '@storybook/react';

import { disableProps } from '../../stories.data';

import { propsToDisable } from './Docs.data';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'buttons/IconButton/Документация',
  tags: ['autodocs'],
  argTypes: {
    ...disableProps(propsToDisable),
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Docs: Story = {
  args: {
    icon: <TwitterOutlined />,
    notification: 9,
    children: 'button',
    type: 'default',
    href: '',
    shape: 'default',
    size: 'middle',
    disabled: false,
    danger: false,
    block: false,
    tooltipProps: {
      title: 'Это тултип кнопки',
    },
  },
  argTypes: {
    icon: {
      description: 'Иконка кнопки',
    },
    onClick: {
      description: 'Событие клика на кнопку с иконкой',
      table: {
        type: {
          summary: '(event: React.MouseEvent<HTMLElement, MouseEvent>) => void',
        },
      },
    },
    notification: {
      control: { type: 'number' },
      description: 'Числовое значение',
    },
    children: {
      control: 'text',
      description: 'Текст кнопки',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    type: {
      control: 'select',
      options: ['primary', 'link', 'text', 'dashed', 'default', 'transparent'],
      description: 'Тип кнопки',
    },
    href: {
      description: 'Ссылка',
    },
    shape: {
      description: 'Форма кнопки',
    },
    size: {
      description: 'Размер кнопки',
    },
    disabled: {
      description: 'Неактивное состояние кнопки',
    },
    danger: {
      description: 'Статус кнопки',
    },
    target: {
      control: 'radio',
      options: ['_blank', '_self', '_parent', '_top'],
      description: 'Указывает, где открывать документ, на который ведет ссылка.',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    block: {
      description: 'Возможность подогнать ширину кнопки по ширине ее родителя',
    },
    loading: {
      description: 'Статус загрузки кнопки',
    },
    className: {
      description: 'Указать класс css',
    },
    htmlType: {
      description: 'Определяет тип кнопки, который устанавливает ее поведение в форме',
    },
    style: {
      description: 'Указать стили кнопки',
      table: {
        type: {
          summary: 'Record<SemanticDOM, CSSProperties>',
        },
      },
    },
    tooltipProps: {
      description: 'Конфигурация тултипа кнопки. Если не задана - тултипа нет.',
    },
    collapsed: {
      description: 'Отображение кнопки в свернутом виде (иконка без текста) с тултипом',
      control: 'boolean',
    },
    dataTestId: {
      description: 'Кастомный атрибут для тестирования',
    },
    iconPosition: {
      description: 'Расположение иконки кнопки',
    },
  },
};
