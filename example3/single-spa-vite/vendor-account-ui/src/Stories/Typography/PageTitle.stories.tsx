import React from 'react';
import { PageTitle } from '@shared/ui/molecules/Typography/Page/Title/PageTitle.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from 'antd';

import { getLinkToAntDesign } from '../stories.data';

const meta: Meta<typeof PageTitle> = {
  component: PageTitle,
  title: 'typography/PageTitle/Документация',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageTitle>;

export const Docs: Story = {
  args: {
    heading: 'Заголовок',
    subHeading: '',
  },

  argTypes: {
    heading: {
      description: 'Заголовок страницы.',
    },
    subHeading: {
      description: 'Подзаголовок.',
      control: 'text',
    },
    type: {
      description: 'Тип содержимого.',
      control: 'radio',
      options: [undefined, 'secondary', 'success', 'warning', 'danger'],
    },
    onClick: {
      description: 'Событие клика на заголовок',
      type: 'function',
      table: {
        type: {
          summary: '(event) => void',
        },
      },
    },
  },
  render: (args) => (
    <>
      <Card>
        <PageTitle {...args} />
      </Card>
      <Card>
        <a href={getLinkToAntDesign('typography')}>ссылка на типографию ant design</a>
      </Card>
    </>
  ),
};
