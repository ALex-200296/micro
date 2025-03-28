import React from 'react';
import { Empty } from '@shared/ui/molecules/Empty/Empty.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Flex, Typography } from 'antd';

import { getLinkToAntDesign } from '../stories.data';
const { Link } = Typography;

const meta: Meta<typeof Empty> = {
  component: Empty,
  title: 'Empty/Документация',
  tags: ['autodocs'],
  args: {
    linkProps: {
      children: 'Тут ссылка',
      onClick: () => window.alert('Нажали ссылку'),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const Docs: Story = {
  argTypes: {
    imageStyle: {
      control: 'object',
      description: 'Inline стили картинки',
    },
    image: {
      description: 'Изображение, отображаемое в компоненте',
      control: 'select',
      options: ['default', 'simple', 'custom'],
      mapping: {
        default: Empty.IMAGE_DEFAULT,
        simple: Empty.IMAGE_SIMPLE,
        custom: Empty.IMAGE_CUSTOM,
      },
    },
    description: {
      description: 'Отображаемый в компоненте контент',
      control: 'text',
    },
    linkProps: {
      description: 'Свойства для отображения ссылки в компоненте. Если не указаны - ссылка не отображается.',
      table: {
        type: {
          summary: '{onClick: () => void, children: ReactNode}',
        },
      },
    },
  },
  render: (args) => (
    <Flex gap='small' vertical={true}>
      <Card>
        <Empty {...args} />
      </Card>
      <Card>
        <Link href={getLinkToAntDesign('empty')} target='_blank'>
          Ссылка на Ant Design
        </Link>
      </Card>
    </Flex>
  ),
};
