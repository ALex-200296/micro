import React from 'react';
import { dottedFormat } from '@shared/ui/atoms/Inputs/DatePicker/DatePicker.formats';
import { DateRangePicker } from '@shared/ui/atoms/Inputs/DateRangePicker/DateRangePicker.component';
import { Meta, StoryObj } from '@storybook/react';
import { Card } from 'antd';
import Link from 'antd/es/typography/Link';

import { disableProps, getLinkToAntDesign } from '../../stories.data';

import { propsToDisable } from './Docs.data';

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  title: 'Inputs/DateRangePicker/Документация',
  tags: ['autodocs'],
  argTypes: {
    ...disableProps(propsToDisable),
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Docs: Story = {
  args: {
    format: dottedFormat,
  },

  argTypes: {
    format: {
      control: 'text',
      description: 'Выбор формата отображения даты',
    },
    placeholder: {
      description: 'Возможность добавить текст в поле даты в качестве подсказки для пользователей',
    },
    picker: {
      control: 'select',
      options: ['date', 'week', 'month', 'quarter', 'year'],
      description: 'Возможность выбора временного интервала',
    },
    status: {
      control: 'radio',
      description: 'Позволяет задать статус компонента',
    },
    allowClear: {
      control: 'boolean',
      description: 'Возможность добавить кнопку очистки поля',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Возможность автоматического выделения компонента для выбора значения',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    className: {
      description: 'Добавление имени класса компонента',
    },
    cellRender: {
      description: 'Рендер ячейки пикера',
    },
    changeOnBlur: {
      control: 'boolean',
      description: 'Возможность выбора даты без кнопки подтверждения',
    },
    disabled: {
      control: 'boolean',
      description: 'Возможность активировать/деактивировать компонент',
    },
    disabledDate: {
      description: 'Функция, определяющая указанную дату, недоступную для выбора',
    },
    getPopupContainer: {
      description: 'Настройка контейнера для панели выбора даты',
    },
    inputReadOnly: {
      control: 'boolean',
      description: 'Возможность установить дату вручную',
    },
    locale: {
      description: 'Свойство, которое используется для настройки локализации',
    },
    nextIcon: {
      control: 'text',
      description: 'Возможность добавить кастомную иконку во всплывающем окне для перехода к следующему месяцу',
    },
    open: {
      control: 'boolean',
      description: 'Возможность задать состояние всплывающего окна компонента',
    },
    panelRender: {
      description: 'Свойство, которое позволяет настраивать отображение панели выбора даты',
    },
    presets: {
      description: 'Возможность задать диапазон для быстрого выбора даты',
    },
    prevIcon: {
      control: 'text',
      description: 'Возможность добавить кастомную иконку во всплывающем окне для перехода к предыдущему месяцу',
    },
    size: {
      control: 'radio',
      description: 'Возможность выбора размера поля ввода даты',
    },
    style: {
      description: 'Inline стили компонента',
    },
    suffixIcon: {
      control: 'text',
      description: 'Возможность добавить кастомную иконку вызова панели выбора даты',
    },
    superNextIcon: {
      control: 'text',
      description: 'Возможность добавить кастомную иконку во всплывающем окне для перехода к следующему году',
    },
    superPrevIcon: {
      control: 'text',
      description: 'Возможность добавить кастомную иконку во всплывающем окне для перехода к предыдущему году',
    },
    onOpenChange: {
      description: 'Функция обратного вызова при открытии/закрытии панели выбора даты',
    },
    defaultValue: {
      description: 'Возможность установки значения поля по умолчанию',
    },
    onChange: {
      description: 'Функция, вызываемая при изменении панели (прим: открытие-закрытие панели)',
    },
    value: {
      description: 'Значение в инпуте',
    },
    onFocus: {
      description: 'Событие получения фокуса компонента',
    },
    id: {
      description: 'Возможность определить уникальный идентификатор компонента',
    },
    onBlur: {
      description: 'Событие потери фокуса компонента',
    },
    allowEmpty: {
      control: 'boolean',
      description: 'Возможность оставить пустым начало или конец ввода',
    },
    renderExtraFooter: {
      description: 'Возможность отобразить дополнительный нижний колонтитул на панели',
    },
    separator: {
      description: 'Возможность установить разделитель между полями ввода',
    },
    onCalendarChange: {
      description: 'Функция обратного вызова при изменении времени начала или окончания диапазона',
    },
    showNow: {
      description: 'Отображение кнопки сегодняшнего дня в компоненте',
    },
    pickerValue: {
      description: 'Позволяет задать начальную выбранную дату для компонента',
    },
    dataTestId: {
      description: 'Кастомный атрибут для тестирования',
    },
    minDate: {
      description: 'Устанавливает минимальную дату, которую может выбрать пользователь',
    },
    maxDate: {
      description: 'Устанавливает максимальную дату, которую может выбрать пользователь',
    },
    needConfirm: {
      description: 'Определяет, нужно ли подтверждать выбор даты',
    },
    preserveInvalidOnBlur: {
      description: 'Сохранение значения в поле ввода при потере фокуса, если в нем введена некорректная дата',
    },
    components: {
      description: 'Кастомная панель выбора даты',
    },
    rootClassName: {
      description: 'Класс стилей, позволяющий переписать дефолтные библиотечные стили',
    },
    variant: {
      description: 'Границы компонента',
    },
  },

  render: (args) => {
    return (
      <>
        <Card>
          <DateRangePicker {...args} />
        </Card>
        <Card>
          Ссылка на компонент <Link href={getLinkToAntDesign('date-picker')}>Ant design</Link>
        </Card>
      </>
    );
  },
};
