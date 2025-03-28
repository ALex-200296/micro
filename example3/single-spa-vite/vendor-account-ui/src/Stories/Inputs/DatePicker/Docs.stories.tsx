import React from 'react';
import { DatePicker } from '@shared/ui/atoms/Inputs/DatePicker/DatePicker.component';
import { dottedFormat } from '@shared/ui/atoms/Inputs/DatePicker/DatePicker.formats';
import { Meta, StoryObj } from '@storybook/react';
import { Card } from 'antd';
import Link from 'antd/es/typography/Link';

import { disableProps, getLinkToAntDesign } from '../../stories.data';

import { propsToDisable } from './Docs.data';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'Inputs/DatePicker/Документация',
  tags: ['autodocs'],
  argTypes: {
    ...disableProps(propsToDisable),
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

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
      control: 'text',
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
    variant: {
      description: 'Границы компонента',
    },
    className: {
      control: 'text',
      description: 'Добавление имени класса компонента',
    },
    cellRender: {
      description: 'Рендер ячейки пикера',
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
    removeIcon: {
      description: 'Настройка иконки, отображаемой в поле ввода для удаления выбранной даты',
    },
    open: {
      control: 'boolean',
      description: 'Возможность задать состояние всплывающего окна компонента',
    },
    panelRender: {
      description: 'Свойство, которое позволяет настраивать отображение панели выбора даты',
    },
    placement: {
      control: 'radio',
      description: 'Возможность выбора расположения панели выбора даты',
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
      control: 'text',
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
    dataTestId: {
      description: 'Кастомный атрибут для тестирования',
    },
    multiple: {
      description: 'Позволяет выбирать несколько дат одновременно',
    },
    order: {
      description: 'Определяет порядок отображения элементов в поле ввода для выбора даты',
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
    pickerValue: {
      description: 'Позволяет задать начальную выбранную дату для компонента',
    },
    maxTagCount: {
      description:
        'Определяет максимальное количество тегов, которое можно отобразить в поле ввода, когда выбрано несколько дат',
    },
    components: {
      description: 'Кастомная панель выбора даты',
    },
    rootClassName: {
      description: 'Класс стилей, позволяющий переписать дефолтные библиотечные стили',
    },
    showNow: {
      description: 'Отображение кнопки сегодняшнего дня в компоненте',
    },
  },

  render: (args) => {
    return (
      <>
        <Card>
          <DatePicker {...args} />
        </Card>
        <Card>
          Ссылка на компонент <Link href={getLinkToAntDesign('date-picker')}>Ant design</Link>
        </Card>
      </>
    );
  },
};
