import React from 'react';
import { OnlyContentLayout } from '@features/common/ui/Layouts/OnlyContentLayout/OnlyContentLayout.component';
import type { Meta, StoryObj } from '@storybook/react';

import styles from './Docs.module.scss';

const meta: Meta<typeof OnlyContentLayout> = {
  component: OnlyContentLayout,
  title: 'layout/OnlyContentLayout/Документация',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OnlyContentLayout>;

export const Docs: Story = {
  args: {
    children: <div>Content</div>,
    contentClassName: styles.content,
  },
  argTypes: {
    children: {
      description: 'Контентная часть страницы, может быть вложен любой элемент, который должен быть помещен в Layout',
    },
    contentClassName: {
      description: 'Класс стилей, навешиваемый на контентную часть контейнера',
    },
  },
};
