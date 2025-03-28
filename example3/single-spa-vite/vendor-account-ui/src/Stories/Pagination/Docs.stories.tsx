import React from 'react';
import { Pagination } from '@shared/ui/atoms/Pagination/Pagination.component';
import { useArgs } from '@storybook/preview-api';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { Card, PaginationProps, Typography } from 'antd';

import { disableProps, getLinkToAntDesign } from '../stories.data';

import { propsToDisable } from './Docs.data';

const { Link } = Typography;

const OnShowSizeChangeArgs: Decorator<PaginationProps> = (Story, context) => {
  const [, setArgs] = useArgs();

  return Story({
    ...context,
    args: {
      ...context.allArgs,
      onShowSizeChange: (current, pageSize) => {
        setArgs({ ...context.args, current, pageSize });
      },
      onChange: (current, pageSize) => {
        setArgs({ ...context.args, current, pageSize });
      },
    },
  });
};

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'Pagination/Документация',
  tags: ['autodocs'],
  decorators: [OnShowSizeChangeArgs],
  argTypes: {
    ...disableProps(propsToDisable),
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Docs: Story = {
  args: {
    showSizeChanger: false,
    pageSizeOptions: [1, 10, 20, 30],
    total: 50,
  },
  argTypes: {
    showSizeChanger: {
      description: 'Позволяет варьировать размером страницы.',
    },
    showQuickJumper: {
      control: { type: 'boolean' },
      description: 'Позволяет переходить на страницы напрямую.',
      table: { defaultValue: { summary: 'false' } },
    },
    size: {
      description: 'Позволяет задать размер компонента.',
      table: { defaultValue: { summary: 'default' } },
    },
    responsive: {
      description: 'Если свойство size не указано, размер страницы будет меняться в зависимости от ширины окна.',
    },
    onChange: {
      description:
        'Функция вызывается при изменении номера страницы или размера страницы и принимает полученный номер страницы и размер страницы в качестве аргументов.',
    },
    onShowSizeChange: {
      description: 'Функция вызывается при изменении размера страницы.',
    },
    itemRender: {
      description: 'Для кастомизации HTML - разметки. Например, видоизменить элемент переключения страницы.',
    },
    showTotal: {
      description: 'Функция отображения общего количества страниц и диапазона.',
    },
    className: {
      description: 'Класс стилей, навешиваемый на компонент.',
    },
    pageSizeOptions: {
      table: { defaultValue: { summary: '[1, 10, 20, 30]' } },
      description: 'Позволяет задать количество страниц для рендера контента.',
    },
    current: {
      description: 'Текущий номер страницы.',
    },
    defaultCurrent: {
      description: 'Номер начальной страницы по умолчанию.',
    },
    total: {
      description: 'Общее количество элементов данных.',
    },
    pageSize: {
      description: 'Общее количество элементов данных на странице.',
    },
    defaultPageSize: {
      description: 'Общее количество элементов данных на странице по умолчанию.',
    },
    hideOnSinglePage: {
      control: { type: 'boolean' },
      description: 'Определяет будет ли скрыта пагинация на одной странице или нет.',
      table: { defaultValue: { summary: 'false' } },
    },
    showLessItems: {
      control: { type: 'boolean' },
      description: 'Показать меньше элементов страницы.',
      table: { defaultValue: { summary: 'false' } },
    },
    showTitle: {
      control: { type: 'boolean' },
      description: 'Показать заголовок элемента страницы.',
      table: { defaultValue: { summary: 'true' } },
    },
    simple: {
      control: { type: 'boolean' },
      description: 'Использовать упрощенный вид.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Активирует / деактивирует пагинацию.',
    },
    style: {
      description: 'Inline стили компонента',
      control: 'object',
    },
    rootClassName: {
      description: 'Корневой стиль компонента',
    },
    align: {
      description: 'Выравнивание',
    },
  },
  render: (args) => {
    return (
      <>
        <Card>
          <Pagination {...args} />
        </Card>
        <Card>
          Ссылка на компонент <Link href={getLinkToAntDesign('pagination')}>Ant Design</Link>
        </Card>
      </>
    );
  },
};
