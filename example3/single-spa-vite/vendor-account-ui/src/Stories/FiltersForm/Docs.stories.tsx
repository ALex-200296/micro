import React from 'react';
import { FiltersForm } from '@entities/common/ui/FiltersForm/FiltersForm.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Flex, Space, Typography } from 'antd';

import { getLinkToAntDesign } from '../stories.data';

import { filterItems, FormItemTypeDetail } from './Docs.data';
const { Text } = Typography;

const meta: Meta<typeof FiltersForm> = {
  component: FiltersForm,
  title: 'Filters Form/Документация',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FiltersForm>;

export const Docs: Story = {
  args: {
    initialValues: {},
    formItems: filterItems,
  },

  argTypes: {
    initialValues: {
      description: 'Начальные значения формы',
      table: {
        type: {
          summary: '<T>',
        },
      },
    },
    formItems: {
      description: 'Массив пропов для элементов формы (formItems)',
      table: {
        category: 'Конфигурации',
        type: {
          summary: 'Array<FormItemProps> | React.ReactNode',
          detail: getLinkToAntDesign('form#formitem') + FormItemTypeDetail,
        },
      },
    },
    onReset: {
      description: 'Фукция, которая вызывается по нажатию на кнопку "Сбросить фильтры"',
      table: {
        type: { summary: '() => void' },
      },
    },
    onFinish: {
      description: 'Фукция, которая вызывается по нажатию на кнопку "Применить"',
      table: {
        type: { summary: '(initialValues: T) => void' },
      },
    },
    className: {
      description: 'Класс стилей, навешиваемый на форму',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    onValueChange: {
      description: 'Функция, которая вызывается при изменении состояния (values) формы',
      table: {
        type: { summary: '(changeValue: Partial<T>, allValues: T) => void' },
      },
    },
    form: {
      description: 'Экземпляр (instance) формы с методами для фильтрация данных',
      table: {
        category: 'Конфигурации',
        type: {
          summary: 'antd FormInstance',
          detail: getLinkToAntDesign('form#forminstance'),
        },
      },
    },
  },

  render: (args) => {
    return (
      <Space>
        <Flex vertical gap='small'>
          <Card>
            <Text>Компонент используется для создания форм фильтрации данных.</Text>
          </Card>
          <Card>
            <FiltersForm {...args} />
          </Card>
        </Flex>
      </Space>
    );
  },
};
