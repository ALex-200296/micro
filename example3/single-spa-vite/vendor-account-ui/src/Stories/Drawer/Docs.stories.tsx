import React from 'react';
import { Button } from '@shared/ui/atoms/Button/Button.component';
import { Drawer } from '@shared/ui/atoms/Drawer/Drawer.component';
import { IDrawerProps } from '@shared/ui/atoms/Drawer/Drawer.types';
import { useArgs } from '@storybook/preview-api';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { Space } from 'antd';

import { dataTestId, disableProps } from '../stories.data';

import { propsToDisable } from './Docs.data';

import styles from './Drawer.module.scss';

const OnChangeSyncArgs: Decorator<IDrawerProps> = (Story, context) => {
  const [, setArgs] = useArgs();

  return Story({
    ...context,
    args: {
      ...context.allArgs,
      onClose: () => {
        setArgs({ ...context.args, open: false });
      },
    },
  });
};

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  title: 'Drawer/Документация',
  tags: ['autodocs'],
  argTypes: {
    ...disableProps(propsToDisable),
  },
  decorators: [OnChangeSyncArgs],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Docs: Story = {
  args: {
    children: 'Привет, это дровер.',
    copyableTitlePart: '',
    title: 'Заголовок дровера',
    width: 'sm',
    getContainer: false,
  },
  render: (args) => {
    const [, setArgs] = useArgs();
    const onOpen = () => {
      setArgs({ ...args, open: true });
    };

    return (
      <Space>
        <div className={styles.container}>
          <Drawer {...args} />
        </div>
        <Button dataTestId={`drawer-${dataTestId}`} onClick={onOpen}>
          Open Drawer
        </Button>
      </Space>
    );
  },
  argTypes: {
    children: {
      control: 'text',
      description:
        'Передает контекст внутрь дровера, который может служить для информирования пользователя или получения данных.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    copyableTitlePart: {
      control: 'text',
      description: 'Заголовок с возможностью копировать.',
    },
    destroyOnClose: {
      control: { type: 'boolean' },
      description: 'Позволяет размонтировать компонент после закрытия.',
      table: { defaultValue: { summary: 'false' } },
    },
    width: {
      description: 'Позволяет выбрать ширину дровера в открытом состоянии.',
    },
    className: {
      description: 'Класс стилей, навешиваемый на компонент.',
    },
    title: {
      control: 'text',
      description: 'Заголовок дровера.',
    },
    keyboard: {
      description: 'Активирует кнопку esc для закрытия дровера.',
      table: { defaultValue: { summary: 'true' } },
    },
    onClose: {
      description: 'Коллбек, вызываемый при закрытии дровера кликом на маску или кнопку отмены.',
    },
    closeIcon: {
      control: 'text',
      description: 'Иконка закрытия.',
      table: { defaultValue: { summary: '<CloseOutlined />' }, type: { summary: 'ReactNode | boolean' } },
    },
    autoFocus: {
      control: { type: 'boolean' },
      description: 'Наведение фокуса на дровер при его открытии.',
      table: { defaultValue: { summary: 'true' } },
    },
    open: {
      control: { type: 'boolean' },
      description: 'Определение состояние дровера: открыт / закрыт.',
      table: { defaultValue: { summary: 'false' } },
    },
    afterOpenChange: {
      description: 'Коллбек, вызываемый при изменении состояния дровера с открытого на закрытый и наоборот.',
    },
    footer: {
      control: 'text',
      description: 'Позволяет отрисовать контент в области футера.',
      table: { type: { summary: 'ReactNode' } },
    },
    maskClosable: {
      control: { type: 'boolean' },
      description: 'Позволяет закрывать дровер при нажатии на маску (область вне дровера).',
      table: { defaultValue: { summary: 'true' } },
    },
    forceRender: {
      control: { type: 'boolean' },
      description: 'Предварительный рендер дровера.',
      table: { defaultValue: { summary: 'false' } },
    },
    getContainer: {
      description: 'Элемент ДОМ-дерева для дровера. Позволяет задать стили и границы для открытого дровера.',
    },
    zIndex: {
      control: { type: 'number' },
      description: 'z-индекс для дровера.',
    },
    mask: {
      control: { type: 'boolean' },
      description: 'Отвечает за отображение / скрытие маски.',
      table: {
        defaultValue: { summary: 'true' },
        type: {
          summary: 'ReactNode',
        },
      },
    },
    height: {
      description: 'Высота дровера.',
      table: {
        defaultValue: { summary: '378' },
        type: {
          summary: 'string | number',
        },
      },
    },
    push: {
      control: 'text',
      description:
        'Делит экран на контент дровера и основной контент, предоставляя доступ к информации дровера без прекращения взаимодействия с основным контентом.',
      table: { defaultValue: { summary: '{ distance: 180 }' } },
    },
    placement: {
      description: 'Расположение дровера.',
    },
    extra: {
      control: 'text',
      description: 'Позволяет отрисовать дополнительный контент в углу дровера.',
    },
    rootClassName: {
      description: 'Корневой стиль компонента.',
      control: 'object',
    },
    style: {
      description: 'Inline стили компонента.',
      control: 'object',
    },
    drawerRender: {
      description: 'Предварительный рендер содержимого дровера',
    },
    loading: {
      description: 'Отображение индиктора загрузки внутри дровера',
    },
  },
};
