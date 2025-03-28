import { TagsGroup } from '@shared/ui/molecules/TagsGroup/TagsGroup.component';
import type { Meta, StoryObj } from '@storybook/react';

import { getLinkToAntDesign } from '../stories.data';

import theme from '@styles/themeExports.module.scss';

const meta: Meta<typeof TagsGroup> = {
  component: TagsGroup,
  title: 'Tags/TagsGroup/Документация',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TagsGroup>;

export const Docs: Story = {
  args: {
    tagsData: [
      { label: 'Лейбл', value: 'Значение', onClose: () => alert('клик закрыть тег') },
      { label: 'Лейбл1', value: 'Значение1', onClose: () => alert('клик закрыть тег 1') },
      { label: 'Лейбл2', value: 'Значение2', onClose: () => alert('клик закрыть тег 2') },
      { label: 'Лейбл3', value: 'Значение3', onClose: () => alert('клик закрыть тег 3') },
      { value: 'Значение4', onClose: () => alert('клик закрыть тег 4') },
      {
        label: 'Лейбл5',
        value: 'Значение5',
        onClose: () => alert('клик закрыть тег 5'),
        color: theme.success,
      },
      {
        label: 'Лейбл6',
        value: 'Значение6',
        onClose: () => alert('клик закрыть тег 6'),
        color: 'processing',
        hiddenValues: [
          {
            value: 'Скрытое значение 6_1',
            label: 'Скрытое значение 6_1',
            onClose: () => alert('клик закрыть скрытое значение 6_1'),
          },
          {
            value: 'Скрытое значение 6_2',
            label: 'Скрытое значение 6_2',
            onClose: () => alert('клик закрыть скрытое значение 6_2'),
          },
        ],
      },
      { value: 'Лейбл7', onClose: () => alert('клик закрыть тег 7'), color: 'warning' },
      { value: 'Лейбл8', color: 'error', closable: false },
    ],
  },
  argTypes: {
    tagsData: {
      description:
        'Массив значений тегов. Каждое значение - объект, который содержит поля value(значение тега), label(лейбл тега, опионально) и все перечисленные ниже пропы (можно задать как группе тегов, так и одному конкретному тегу в tagsData)',
    },
    color: {
      description: 'Цвет, задаваемый для всей группы тегов',
      table: {
        type: {
          summary: 'default | success | error | warning | processing | neutral | string',
        },
      },
      control: {
        type: 'color',
        presetColors: [
          theme.success,
          theme.warning,
          theme.primary,
          theme.error,
          'default',
          'error',
          'warning',
          'processing',
          'success',
          'neutral',
        ],
      },
    },
    closable: {
      control: 'boolean',
      description: 'Определяет можно ли закрыть тег и показывается ли иконка закрытия',
    },
    prefixCls: {
      table: {
        disable: true,
      },
    },
    onClose: {
      description: 'Функция, вызывающаяся на закрытие тега',
    },
    style: {
      description: 'Inline стили тега',
      control: 'object',
    },
    closeIcon: {
      description: 'Иконка закрытия тега',
    },
    icon: {
      description: 'Иконка, показываемая в начале контента тега',
    },
    className: {
      description: 'Класс стилей, навешиваемый на тег',
    },
    spaceConfig: {
      description: `Парметры обертки тегов Space, ссылка на компонент AntDesign ${getLinkToAntDesign('space')}`,
      control: 'object',
    },
    dataTestId: {
      description: 'Кастомный атрибут для тестирования',
    },
  },
};
