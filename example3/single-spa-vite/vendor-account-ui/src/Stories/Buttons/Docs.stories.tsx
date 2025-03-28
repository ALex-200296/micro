import { Button } from '@shared/ui/atoms/Button/Button.component';
import type { Meta, StoryObj } from '@storybook/react';

import { disableProps } from '../stories.data';

import { propsToDisable } from './Docs.data';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'buttons/Документация',
  tags: ['autodocs'],
  argTypes: {
    ...disableProps(propsToDisable),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Docs: Story = {
  args: {
    children: 'button',
    type: 'default',
    href: '',
    shape: 'default',
    size: 'middle',
    disabled: false,
    danger: false,
    block: false,
  },
  argTypes: {
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
    onClick: {
      description: 'Событие клика на кнопку',

      table: {
        type: {
          summary: '(event: React.MouseEvent<HTMLElement, MouseEvent>) => void',
        },
      },
    },
    tooltipProps: {
      description: 'Конфигурация тултипа кнопки. Если не задана - тултипа нет.',
    },
    dataTestId: {
      description: 'Кастомный атрибут для тестирования',
    },
    iconPosition: {
      description: 'Расположение иконки кнопки',
    },
  },
};
