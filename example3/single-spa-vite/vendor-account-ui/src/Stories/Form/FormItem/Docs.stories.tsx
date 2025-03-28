import React from 'react';
import { FormItem } from '@shared/ui/atoms/Form/FormItem/FormItem.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Form, Input, Typography } from 'antd';

import { disableProps, getLinkToAntDesign } from '../../stories.data';

import { namePath, propsToDisable } from './FormItem.data';

import styles from './FormItem.module.scss';

const { Link, Text } = Typography;

const meta: Meta<typeof FormItem> = {
  component: FormItem,
  title: 'Form/FormItem/Документация',
  tags: ['autodocs'],
  argTypes: {
    ...disableProps(propsToDisable),
  },
};

export default meta;
type Story = StoryObj<typeof FormItem>;

export const Docs: Story = {
  args: {
    labelType: 'float',
    inputType: 'default',
    label: 'Лейбл',
    id: 'name',
    name: 'name',
  },
  argTypes: {
    labelType: {
      description: 'Тип метки.',
    },
    inputType: {
      description: 'Тип поля.',
    },
    label: {
      description: 'Лейбл',
      control: 'text',
    },
    id: {
      description: 'Свойство, которое используется для задания уникального идентификатора элемента формы.',
    },
    name: {
      description:
        'Свойство, которое используется для указания имени поля ввода внутри формы. Это имя будет использоваться для передачи данных в обработчик формы.',
      table: {
        type: {
          summary: 'namePath[]',
          detail: namePath,
        },
      },
    },
    labelCol: {
      description: 'Оформление метки.',
    },
    dependencies: {
      description: 'Свойство, которое позволяет указать зависимости для поля ввода.',

      table: {
        type: {
          summary: 'NamePath[]',
          detail: namePath,
        },
      },
    },
    getValueFromEvent: {
      description:
        'Функция, которое позволяет задать пользовательскую логику для извлечения значения из события изменения поля ввода. Это может быть полезно, если требуется преобразовать данные перед их сохранением.',
    },
    normalize: {
      description:
        'Функция, которое позволяет задать пользовательскую логику для нормализации значения поля ввода перед его сохранением. Например, можно привести введенное значение к определенному формату или типу данных.',
    },
    rules: {
      description: 'Свойство, которое позволяет задать правила валидации для поля ввода.',
    },
    shouldUpdate: {
      description: 'Свойство, которое позволяет задать условие, при котором компонент будет обновляться.',
    },
    trigger: {
      description:
        'Свойство, которое позволяет явно указать событие, которое будет вызывать обработчик изменения значения поля ввода.',
    },
    validateTrigger: {
      description:
        'Свойство, которое позволяет задать тип события, при котором будет происходить валидация поля ввода.',
    },
    validateDebounce: {
      description: 'Задержка в миллисекундах до начала проверки.',
    },
    validateFirst: {
      description:
        'Свойство, которое позволяет управлять порядком выполнения валидации полей формы. Если установлено значение "true", то валидация будет выполняться поочередно для каждого правила, и если одно из правил не проходит, проверка прекращается, и сообщение об ошибке отображается пользователю. Если установлено значение "false" (по умолчанию), то все правила валидации будут проверены независимо от результата предыдущих проверок.',
    },
    valuePropName: {
      description:
        'Свойство, которое позволяет настраивать имя свойства, через которое компонент Form.Item будет устанавливать и получать значение из дочернего компонента. Это может быть полезно, когда вы используете компоненты, которые используют нестандартные имена свойств для передачи значения.',
    },
    getValueProps: {
      description:
        'Функция, которое позволяет задать пользовательскую логику для извлечения значения из события изменения поля ввода.',
    },
    initialValue: {
      description: 'Свойство, которое позволяет установить начальное значение поля ввода.',
    },
    onReset: {
      description: 'Функция обратного вызова, которая будет вызвана при сбросе формы.',
    },
    onMetaChange: {
      description: 'Функция обратного вызова, которая будет вызвана при изменении метаданных формы.',
    },
    preserve: {
      description: 'Флаг, указывающий на то, нужно ли сохранять значение поля при перерендеринге компонента.',
    },
    isListField: {
      description: 'Флаг, указывающий на то, что компонент Form.Item является частью списка полей.',
    },
    isList: {
      description: 'Флаг, указывающий на то, что компонент Form.Item является списком полей.',
    },
    noStyle: {
      description:
        'Свойство, которое используется для отключения стандартного стиля компонента Form.Item. Это может быть полезно, если требуется полностью настроить внешний вид поля ввода с помощью пользовательских стилей.',
    },
    style: {
      description: 'Inline стили компонента.',
    },
    rootClassName: {
      description: 'Класс стилей, позволяющий переписать дефолтные библиотечные стили',
    },
    className: {
      description: 'Класс стилей, навешиваемый на компонент',
    },
    hasFeedback: {
      description: 'Флаг, указывающий на то, нужно ли отображать обратную связь для данного поля.',
    },
    validateStatus: {
      description: 'Статус проверки.',
    },
    required: {
      description: 'Флаг, указывающий на то, что поле является обязательным для заполнения.',
    },
    hidden: {
      description: 'Флаг, указывающий на то, что поле должно быть скрыто.',
    },
    wrapperCol: {
      description: 'Свойство для установки ширины обертки поля.',
    },
    extra: {
      control: 'text',
      description: 'Дополнительное содержимое или подсказка для поля.',
    },
    status: {
      description: 'Статус поля.',
    },
    help: {
      control: 'text',
      description: 'Текстовая подсказка или сообщение об ошибке для поля.',
    },
    fieldId: {
      description: ' Идентификатор поля.',
    },
    layout: {
      description: 'Расположение полей',
    },
  },
  render: (args) => (
    <Form>
      <FormItem {...args}>
        <Input />
      </FormItem>
      <Card className={styles.card}>
        <Text>
          Компонент библиотеки Ant Design, который представляет собой элемент формы. Он используется для создания полей
          ввода, меток и других элементов, необходимых для ввода данных в форму.
        </Text>
      </Card>
      <Card className={styles.card}>
        <Text>
          Отличие написанного компонента кнопки от антовской заключается в том, что была добавлена плавающая метка и
          дополнен функционал getValueProps для корректной отработки компонента.
        </Text>
      </Card>
      <Card className={styles.card}>
        Ссылка на компонент <Link href={getLinkToAntDesign('form')}>Ant Design</Link>
      </Card>
    </Form>
  ),
};
