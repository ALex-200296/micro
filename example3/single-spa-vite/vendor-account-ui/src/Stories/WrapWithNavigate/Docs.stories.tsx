import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { WrapWithNavigate } from '@entities/common/ui';
import type { Meta, StoryObj } from '@storybook/react';

import { disableProps } from '../stories.data';

import { propsToDisable } from './Docs.data';

const meta: Meta<typeof WrapWithNavigate> = {
  component: WrapWithNavigate,
  title: 'Wrap With Navigate/Документация',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    ...disableProps(propsToDisable),
  },
};

export default meta;
type Story = StoryObj<typeof WrapWithNavigate>;

export const Docs: Story = {
  args: {
    children: 'component',
    to: 'https://google.com/',
    shouldWrap: true,
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Принимает компонент типа ReactNode, при нажатии на который происходит редирект.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    shouldWrap: {
      control: { type: 'boolean' },
      description: 'Определяет будет ли активен редирект для children.',
    },
    to: {
      control: 'text',
      description: 'Указывает адрес редиректа.',
    },
    className: {
      description: 'Класс стилей, навешиваемый на тег.',
    },
    style: {
      description: 'Inline стили тега.',
      control: 'object',
    },
    end: {
      description: 'Добавляет имя активного класса.',
      control: { type: 'boolean' },
    },
    reloadDocument: {
      control: { type: 'boolean' },
      description: `Применяется для маршрутизации на стороне клиента, позволяя 
      браузеру обрабатывать переход как это реализовано у тега  < a > атрибута href.`,
    },
    replace: {
      control: { type: 'boolean' },
      description: `Используется, елси необходимо заменить текущую запись в стеке истории
      с помощью History.replaceState вместо использования History.pushState по умолчанию.`,
    },
    state: {
      description: `Используется для установки значения с учетом состояния
      для нового местоположения, которое хранится в history state. 
      Впоследствии к этому значению можно будет получить доступ через useLocation().`,
    },
    preventScrollReset: {
      control: { type: 'boolean' },
      description: `При использовании ScrollRestoration позволяет предотвратить 
      сброс позиции прокрутки в верхнюю часть окна при нажатии ссылки.`,
    },
    relative: {
      control: 'text',
      description: 'Позволяет реализовать маршрутизацию по относительному пути.',
    },
    caseSensitive: {
      control: { type: 'boolean' },
      description: 'Учитывает регистр пути.',
    },
  },
};
