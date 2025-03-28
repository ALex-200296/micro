import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Typography } from 'antd';

const { Link } = Typography;

import { MenuButton } from '@shared/ui/organisms/Button/MenuButton/MenuButton.component';
import { linkTo } from '@storybook/addon-links';

import { disableProps, getLinkToAntDesign } from '../../stories.data';

import {
  buttonPropsConfig,
  defaultButtonPropsConfig,
  dropdownMenuItems,
  menuPropsConfig,
  propsToDisable,
} from './Docs.data';

const meta: Meta<typeof MenuButton> = {
  component: MenuButton,
  title: 'buttons/MenuButton/Документация',
  argTypes: {
    ...disableProps(propsToDisable),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MenuButton>;

export const Docs: Story = {
  args: {
    menu: { items: dropdownMenuItems },
    buttonProps: { ...defaultButtonPropsConfig },
    autoAdjustOverflow: true,
  },
  render: (args) => {
    return (
      <>
        <Card>
          <MenuButton {...args} />
        </Card>
        <Card>
          Ссылка на компонент <Link href={getLinkToAntDesign('dropdown')}>Ant Design.</Link> Ссылка на компонент
          <Link onClick={linkTo('buttons/iconButton')}> IconButton</Link>.
        </Card>
      </>
    );
  },
  argTypes: {
    buttonProps: {
      description: 'Принимает пропсы для кнопки.',
      table: {
        type: { detail: buttonPropsConfig },
      },
    },
    dropdownIcon: {
      description: 'Иконка выпадающего списка.',
    },
    menu: {
      description: 'Принимает пропсы для меню.',
      table: {
        type: { detail: menuPropsConfig },
      },
    },
    autoFocus: {
      control: { type: 'boolean' },
      description: 'Ставит / убирает фокус на содержимое выпадающего списка при открытии.',
      table: { defaultValue: { summary: 'false' } },
    },
    arrow: {
      control: { type: 'boolean' },
      description: 'Делает видимым / скрывает и позиционирует декоративную стрелку выпадающего списка.',
      table: { defaultValue: { summary: 'false' } },
    },
    trigger: {
      description:
        'Навешивает на событие активацию выпадающего списка. Например, при ховерном эффекте - наведение на кнопку. Не активен на сенсорных экранах.',
    },
    dropdownRender: {
      description: 'Функция для кастомизации выпадающего списка. Принимает элементы меню как ReactNode.',
    },
    onOpenChange: {
      description:
        'Функция, которая вызывается при открытии / свертывании выпадающего списка. Не реагирует в случае свертывания по клику на элемент.',
    },
    open: {
      control: { type: 'boolean' },
      description: 'Открывает / сворачивает выпадающий список.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Активирует / блокирует кнопку разворачивания выпадающего списка.',
    },
    destroyPopupOnHide: {
      control: { type: 'boolean' },
      description: 'Очищает / оставляет без изменений выпадающий список после сворачивания.',
      table: { defaultValue: { summary: 'false' } },
    },
    getPopupContainer: {
      description: 'Функция, позволяющая получить и изменить контейнер выпадающего списка.',
    },
    className: {
      description: 'Класс стилей, навешиваемый на компонент.',
    },
    rootClassName: {
      description: 'Класс стилей, позволяющий переписать дефолтные библиотечные стили.',
    },
    placement: {
      description: 'Позволяет задать положение выпадающего списка.',
    },
    overlayClassName: {
      control: 'string',
      description: 'Класс стилей, навешиваемый на корневой элемент выпадающего списка.',
    },
    overlayStyle: {
      description: 'Inline стили выпадающего списка.',
    },
    autoAdjustOverflow: {
      control: { type: 'boolean' },
      description:
        'Активирует / деактивирует автоматическое расположение выпадающего списка с учетом внешних границ экрана в случае, если выпадающий список выходит за их пределы.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};
