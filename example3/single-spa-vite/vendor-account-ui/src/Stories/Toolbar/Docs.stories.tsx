import React from 'react';
import { Toolbar } from '@shared/ui/organisms/Toolbar/Toolbar.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Space } from 'antd';

import { disableProps } from '../stories.data';

import { IntegrationName, propsToDisable } from './Docs.data';

const meta: Meta<typeof Toolbar> = {
  component: Toolbar,
  title: 'Toolbar/Документация',
  tags: ['autodocs'],
  argTypes: {
    ...disableProps(propsToDisable),
  },
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Docs: Story = {
  args: {
    children: (
      <>
        <Space direction='horizontal' wrap>
          <Toolbar.DownloadFile />
          <Toolbar.DownloadAsExcel />
          <Toolbar.ApplyFilter />
          <Toolbar.OpenDocumentation />
          <Toolbar.CreateTask />
          <Toolbar.SubscribeToCalendar />
          <Toolbar.CreateAct />
          <Toolbar.EdoProvider />
          <Toolbar.CreateFactoring />
          <Toolbar.EdoApplication edoType={IntegrationName.Edi} />
          <Toolbar.EdoApplication />
          <Toolbar.EdoApplication edoType={IntegrationName.EdiProject} />
        </Space>
      </>
    ),
  },
  argTypes: {
    children: {
      description: `Принимает набор кнопок типа ReactNode: загрузка шаблона, выгрузка в Excel, фильтрация, просмотр документации,
      создание встречи, подписка на календарь, формирование акта сверки.`,
    },
    className: {
      description: 'Указать класс css',
    },
    style: {
      description: 'Указать стили кнопки',
      controls: 'object',
    },
    size: {
      description: 'Установить размер компонента',
      control: 'radio',
      options: ['small', 'middle', 'large'],
    },
    direction: {
      description: 'Установить направление рендера',
    },
    align: {
      description: 'Выравнивание элементов',
    },
    split: {
      control: 'text',
      description: 'Добавить между элементами разделитель',
    },
    wrap: {
      control: { type: 'boolean' },
      description: 'Автоматический перенос элементов при переполнении контейнера',
    },
    excludeClassName: {
      description: 'Определяет класс CSS, который будет исключен из области действия инструментальной панелиы',
    },
  },
};
