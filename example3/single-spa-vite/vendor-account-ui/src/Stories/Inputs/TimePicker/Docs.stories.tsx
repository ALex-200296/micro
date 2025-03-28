import React from 'react';
import { TimePicker } from '@shared/ui/atoms/Inputs/TimePicker/TimePicker.component';
import { shortTimeDottedFormat } from '@shared/ui/atoms/Inputs/TimePicker/TimePicker.data';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from 'antd';
import Link from 'antd/es/typography/Link';

import { disableProps, getLinkToAntDesign } from '../../stories.data';

import { disabledTimeDetails, propsToDisable } from './Docs.data';

const meta: Meta<typeof TimePicker> = {
  component: TimePicker,
  title: 'Inputs/TimePicker/Документация',
  tags: ['autodocs'],
  argTypes: {
    ...disableProps(propsToDisable),
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Docs: Story = {
  args: {
    format: shortTimeDottedFormat,
  },

  argTypes: {
    format: {
      control: 'text',
      description: 'Позволяет выбрать формат отображения времени.',
    },
    status: {
      description: 'Позволяет задать статус компонента.',
      defaultValue: { summary: ' | warning | error' },
    },
    rootClassName: {
      description: 'Корневой стиль компонента.',
    },
    onChange: {
      description: 'Коллбек, вызываемый при изменении врменени.',
    },
    cellRender: {
      description: 'Кастомная функция рендера для пикера.',
    },
    className: {
      description: 'Класс стилей, навешиваемый на компонент.',
    },
    style: {
      description: 'Inline стили компонента.',
      control: 'object',
    },
    value: {
      description: 'Значение в инпуте.',
      control: 'text',
    },
    defaultValue: {
      description: 'Позволяет установить время по умолчанию.',
      control: 'text',
    },
    renderExtraFooter: {
      description: 'Рендер-функция дополнительного контента в области футера.',
    },
    showNow: {
      control: { type: 'boolean' },
      description: 'Отвечает за отображение кнопки с текущим временем на панели.',
    },
    use12Hours: {
      control: { type: 'boolean' },
      description: 'Отображение врмени в 12 - часовом формате. По умолчанию время отображается hh:mm.',
    },
    hourStep: {
      control: 'number',
      description: 'Интервал между часовыми значениями времени в пикере.',
    },
    minuteStep: {
      control: 'number',
      description: 'Интервал между минутными значениями времени в пикере.',
    },
    secondStep: {
      control: 'number',
      description: 'Интервал между секундными значениями времени в пикере.',
    },
    placeholder: {
      control: 'text',
      description:
        'Отображает текст по умолчанию до момента ввода времени, также текст будет виден, когда поле ввода будет очищено.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Позволяет активировать / деактивировать компонент.',
    },
    size: {
      control: 'radio',
      description: 'Позволяет задать размер пикера.',
      options: ['large', 'middle', 'small'],
      defaultValue: { summary: 'large | middle | small' },
    },
    autoFocus: {
      control: { type: 'boolean' },
      description: 'Отвечает за наведение фокуса на пикер при его монтировании на странице.',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    hideDisabledOptions: {
      control: { type: 'boolean' },
      description: 'Позволяет скрыть / сделать видимым параметры, которые недоступны для выбора.',
    },
    disabledTime: {
      description: 'Позволяет указать недоступное для выбора время.',
      table: {
        type: { detail: disabledTimeDetails },
      },
    },
    allowClear: {
      control: { type: 'boolean' },
      description:
        'Включает / выключает возможность очистки поля по клику на крестик, а при задании reactNode мы меняем иконку и включаем возможность очистки поля.',
    },
    open: {
      control: { type: 'boolean' },
      description: 'Задает состояние панели выбора времени открытое / закрытое.',
    },
    inputReadOnly: {
      control: { type: 'boolean' },
      description:
        'Активирует / деактивирует возможность редактирования. В активном состоянии блокируется возможность ввода времени на устройстве с сенсорным экраном.',
    },
    suffixIcon: {
      control: { type: 'text' },
      description: 'Позволяет задать кастомную иконку вызова панели выбора времени.',
    },
    getPopupContainer: {
      description: 'Позволяет задать контейнер для панели выбора времени.',
    },
    onOpenChange: {
      description: 'Коллбек, вызываемый при открытии / закрытии панели выбора времени.',
    },
    changeOnBlur: {
      control: { type: 'boolean' },
      description:
        'Активирует / деактивирует возможность установить время без дополнительного нажатия кнопки подтверждения - ОК.',
    },
    placement: {
      control: { type: 'boolean' },
      description: 'Позволяет задать расположение панели выбора времени.',
    },
    dataTestId: {
      description: 'Кастомный атрибут для тестирования',
    },
    multiple: {
      description: 'Позволяет выбирать несколько одновременно',
    },
    order: {
      description: 'Определяет порядок отображения элементов в поле ввода для выбора времени',
    },
    minTime: {
      description: 'Устанавливает минимальное время, которое может выбрать пользователь',
    },
    maxTime: {
      description: 'Устанавливает максимальное время, которое может выбрать пользователь',
    },
    needConfirm: {
      description: 'Определяет, нужно ли подтверждать выбор времени',
    },
    preserveInvalidOnBlur: {
      description: 'Сохранение значения в поле ввода при потере фокуса, если в нем введено некорректное время',
    },
    pickerValue: {
      description: 'Позволяет задать начальное выбранное время для компонента',
    },
    maxTagCount: {
      description:
        'Определяет максимальное количество тегов, которое можно отобразить в поле ввода, когда выбрано несколько',
    },
    components: {
      description: 'Кастомная панель выбора времени',
    },
    variant: {
      description: 'Границы компонента',
    },
    removeIcon: {
      description: 'Настройка иконки, отображаемой в поле ввода для удаления выбранного времени',
    },
  },

  render: (args) => {
    return (
      <>
        <Card>
          <TimePicker {...args} />
        </Card>
        <Card>
          Ссылка на компонент <Link href={getLinkToAntDesign('time-picker')}>Ant design</Link>
        </Card>
      </>
    );
  },
};
