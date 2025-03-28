import React from 'react';
import { Button } from '@shared/ui/atoms/Button/Button.component';
import { Modal } from '@shared/ui/atoms/Modal/Modal.component';
import { useArgs } from '@storybook/preview-api';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { Card, ModalProps, Typography } from 'antd';

import { dataTestId, disableProps, getLinkToAntDesign } from '../stories.data';

import { propsToDisable } from './Docs.data';

const { Link } = Typography;

const OnChangeSyncArgs: Decorator<ModalProps> = (Story, context) => {
  const [, setArgs] = useArgs();

  return Story({
    ...context,
    args: {
      ...context.allArgs,
      onCancel: () => {
        setArgs({ ...context.args, open: false });
      },
      onOk: () => {
        setArgs({ ...context.args, open: false });
      },
    },
  });
};

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'Modal/Документация',
  tags: ['autodocs'],
  decorators: [OnChangeSyncArgs],
  argTypes: {
    ...disableProps(propsToDisable),
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Docs: Story = {
  args: {
    children: 'Привет, это модальное окно.',
    destroyOnClose: true,
    footer: '',
  },
  render: (args) => {
    const [, setArgs] = useArgs();
    const onOpen = () => {
      setArgs({ ...args, open: true });
    };

    return (
      <>
        <Card>
          <Modal title='Заголовок модального окна' {...args} />
          <Button dataTestId={`modal-${dataTestId}`} onClick={onOpen}>
            Open Modal
          </Button>
        </Card>
        <Card>
          Ссылка на компонент <Link href={getLinkToAntDesign('modal')}>Ant Design</Link>
        </Card>
      </>
    );
  },

  argTypes: {
    children: {
      control: 'text',
      description:
        'Передает контекст внутрь модального окна, который может служить для информирования пользователя или получения данных.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    onCancel: {
      description:
        'Функция, которая вызывается по нажатию кнопки "Отмена", иконки закрытия в правом верхнем углу или маску',
    },
    destroyOnClose: {
      control: { type: 'boolean' },
      description: 'Позволяет размонтировать компонент после закрытия',
    },
    footer: {
      control: 'text',
      description: 'Позволяет отрисовать контент в области футера',
      table: { defaultValue: { summary: 'null' }, type: { summary: 'React.ReactNode | null' } },
    },
    className: {
      description: 'Класс стилей, навешиваемый на тег',
    },
    open: {
      control: { type: 'boolean' },
      description: 'Задает открытое / закрытое состояние модального окна',
    },
    confirmLoading: {
      control: { type: 'boolean' },
      description: 'Добавляет визуальный эффект загрузки для кнопки ОК',
    },
    title: {
      control: 'text',
      description: 'Заголовок модального окна',
    },
    onOk: {
      description: 'Позволяет добавить функцию, которая будет вызываться при нажатии на кнопку ОК',
    },
    afterClose: {
      description: 'Позволяет добавить функцию, которая будет вызываться после закрытия модального окна',
    },
    afterOpenChange: {
      description: 'Вызывает Callback - функцию по завершению анимации при открытии / закрытии модального окна',
    },
    centered: {
      control: { type: 'boolean' },
      description: 'Центрирование модального окна',
    },
    width: {
      control: 'text',
      description: 'Задание ширины модального окна',
    },
    okText: {
      control: 'text',
      description: 'Текст кнопки OK',
    },
    okType: {
      control: {
        type: 'radio',
      },
      description: 'Тип кнопки ОК',
    },
    cancelText: {
      control: 'text',
      description: 'Текст кнопки Отмена',
    },
    maskClosable: {
      control: { type: 'boolean' },
      description: 'Позволяет закрывать модальное окно при нажатии на маску (область вне модального окна)',
    },
    forceRender: {
      control: { type: 'boolean' },
      description: 'Принудительный рендер модального окна',
    },
    okButtonProps: {
      control: 'text',
      description: 'Пропсы кнопки ОК',
    },
    cancelButtonProps: {
      control: 'text',
      description: 'Пропсы кнопки Отмена',
    },
    wrapClassName: {
      control: 'text',
      description: 'Имя класса контейнера модального окна',
    },
    getContainer: {
      control: 'text',
      description: 'Элемент ДОМ-дерева для модального окна',
    },
    zIndex: {
      control: { type: 'number' },
      description: 'z-индекс для модального окна',
    },
    mask: {
      control: { type: 'boolean' },
      description: 'Отвечает за отображение / скрытие маски',
    },
    keyboard: {
      control: { type: 'boolean' },
      description: 'Активирет / деактивирует закрытие модального окна по нажатию на кнопку Esc',
    },
    closeIcon: {
      control: { type: 'boolean' },
      table: {
        type: {
          summary: 'boolean | ReactNode',
        },
      },
      description: 'Иконка закрытия модального окна',
    },
    modalRender: {
      description: 'Кастомная модификация модального окна',
    },
    focusTriggerAfterClose: {
      control: { type: 'boolean' },
      description: 'Позволяет указать фокус на элемент - триггер после закрытия модального окна',
    },
    onClose: {
      description: 'Функция, вызываемая при закрытии модального окна',
    },
    loading: {
      description: 'Отображение индиктора загрузки внутри модального окна',
    },
  },
};
