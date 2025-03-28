import React from 'react';
import { shortTimeDottedFormat } from '@shared/ui/atoms/Inputs/TimePicker/TimePicker.data';
import { TimeRangePicker } from '@shared/ui/atoms/Inputs/TimeRangePicker/TimeRangePicker.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from 'antd';
import Link from 'antd/es/typography/Link';

import { disableProps, getLinkToAntDesign } from '../../stories.data';

import { disabledTimeDetails, propsToDisable } from './Docs.data';

import styles from './TimeRangePicker.module.scss';

const meta: Meta<typeof TimeRangePicker> = {
  component: TimeRangePicker,
  title: 'Inputs/TimeRangePicker/Документация',
  tags: ['autodocs'],
  argTypes: {
    ...disableProps(propsToDisable),
  },
};

export default meta;
type Story = StoryObj<typeof TimeRangePicker>;

export const Docs: Story = {
  args: {
    changeOnBlur: true,
    format: shortTimeDottedFormat,
  },

  argTypes: {
    format: {
      control: 'text',
      description: 'Позволяет выбрать формат отображения интервала времени.',
    },
    changeOnBlur: {
      control: { type: 'boolean' },
      description:
        'Активирует / деактивирует возможность установить временной интервал без дополнительного нажатия кнопки подтверждения - ОК.',
    },
    value: {
      description: 'Значение в инпуте.',
    },
    defaultValue: {
      description: 'Позволяет установить интервал времени по умолчанию.',
    },
    inputReadOnly: {
      control: { type: 'boolean' },
      description:
        'Активирует / деактивирует возможность редактирования. В активном состоянии блокируется возможность ввода времени на устройстве с сенсорным экраном.',
    },
    placeholder: {
      description:
        'Отображает текст по умолчанию до момента ввода интервала времени в поля, также текст будет виден, когда поля ввода будут очищены.',
      table: {
        type: {
          summary: '[string, string]',
        },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Позволяет активировать / деактивировать ввод интервала времени.',
    },
    disabledTime: {
      description: 'Позволяет указать недоступное для выбора время.',
      table: {
        type: { detail: disabledTimeDetails },
      },
    },
    onChange: {
      description: 'Коллбек, вызываемый при изменении времени.',
    },
    onOk: {
      description: 'Коллбек, вызываемый при клике на кнопку ОК.',
    },
    cellRender: {
      description: 'Кастомная функция рендера для пикера.',
    },
    presets: {
      description: 'Позволяет установить ранее предусмотренные временные интервалы',
    },
    className: {
      description: 'Класс стилей, навешиваемый на компонент.',
    },
    style: {
      description: 'Inline стили компонента.',
      control: 'object',
    },
    separator: {
      description: 'Позволяет задать разделитель между пикерами времени.',
      control: 'text',
    },
    renderExtraFooter: {
      description: 'Рендер-функция дополнительного контента в области футера.',
    },
    allowClear: {
      control: { type: 'boolean' },
      description:
        'Включает / выключает возможность очистки поля по клику на крестик, а при задании reactNode мы меняем иконку и включаем возможность очистки поля.',
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
    open: {
      control: { type: 'boolean' },
      description: 'Задает состояние панели выбора времени открытое / закрытое.',
    },
    suffixIcon: {
      control: { type: 'text' },
      description: 'Позволяет задать кастомную иконку вызова панели выбора времени.',
    },
    prevIcon: {
      control: { type: 'text' },
      description: 'Позволяет задать кастомную иконку для возврата на выбор начала времени.',
    },
    nextIcon: {
      control: { type: 'text' },
      description: 'Позволяет задать кастомную иконку для перехода на выбор конечного времени.',
    },
    getPopupContainer: {
      description: 'Позволяет задать контейнер для панели выбора времени.',
    },
    panelRender: {
      description: 'Кастомная настройка рендера панели выбора времени.',
    },
    onOpenChange: {
      description: 'Коллбек, вызываемый при открытии / закрытии панели выбора времени.',
    },
    allowEmpty: {
      control: { type: 'boolean' },
      description: 'Активирует / деактивирует возможность оставлять пустым пикер.',
    },
    onCalendarChange: {
      description: 'Коллбек, вызываемый при изменении стартового или конечного значений временного интервала.',
    },
    locale: {
      description: 'Позволяет переопределить языковой страндарт. Например, китайский.',
    },
    size: {
      control: 'radio',
      description: 'Позволяет задать размер пикера.',
      options: ['large', 'middle', 'small'],
    },
    placement: {
      control: 'radio',
      description: 'Позволяет задать расположение панели выбора времени.',
      options: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'],
      defaultValue: { summary: 'bottomLeft' },
    },
    bordered: {
      control: { type: 'boolean' },
      description: 'Включает / выключает отображение границ.',
    },
    status: {
      description: 'Позволяет задать статус компонента.',
    },
    showNow: {
      control: { type: 'boolean' },
      description: 'Включает / выключает отображение конпки выбора текущего времени.',
    },
    use12Hours: {
      control: { type: 'boolean' },
      description: 'Включает / выключает формат 12 - часового времени.',
    },
    hourStep: {
      control: { type: 'number' },
      description: 'Задает интервал по часам.',
      table: {
        type: { summary: 'number' },
      },
    },
    minuteStep: {
      control: { type: 'number' },
      description: 'Задает интервал по минутам.',
      table: {
        type: { summary: 'number' },
      },
    },
    secondStep: {
      control: { type: 'number' },
      description: 'Задает интервал по секундам.',
      table: {
        type: { summary: 'number' },
      },
    },
    hideDisabledOptions: {
      control: { type: 'boolean' },
      description: 'Делает видимыми / скрывает заблокированные временные интервалы.',
    },
    order: {
      control: { type: 'boolean' },
      description: 'Включает / выключает порядок задания временного интервала.',
    },
    dataTestId: {
      description: 'Кастомный атрибут для тестирования',
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
    components: {
      description: 'Кастомная панель выбора времени',
    },
    variant: {
      description: 'Границы компонента',
    },
    rootClassName: {
      description: 'Класс стилей, позволяющий переписать дефолтные библиотечные стили',
    },
  },

  render: (args) => {
    return (
      <>
        <Card>
          <TimeRangePicker className={styles.picker} {...args} />
        </Card>
        <Card>
          Ссылка на компонент <Link href={getLinkToAntDesign('time-picker')}>Ant design</Link>
        </Card>
      </>
    );
  },
};
