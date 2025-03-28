import React from 'react';
import { Button } from '@shared/ui/atoms/Button/Button.component';
import { Drawer } from '@shared/ui/atoms/Drawer/Drawer.component';
import { ModalMobile } from '@shared/ui/molecules/ModalMobile/ModalMobile.component';
import { IModalMobileProps } from '@shared/ui/molecules/ModalMobile/ModalMobile.types';
import { useArgs } from '@storybook/preview-api';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { Card, Flex, Space, Typography } from 'antd';

import { dataTestId } from '../../stories.data';

import styles from './ModalMobile.module.scss';

const { Text } = Typography;

const OnChangeSyncArgs: Decorator<IModalMobileProps> = (Story, context) => {
  const [, setArgs] = useArgs();

  return Story({
    ...context,
    args: {
      ...context.allArgs,
      onClose: () => {
        setArgs({ ...context.args, isOpen: false });
      },
    },
  });
};

const meta: Meta<typeof ModalMobile> = {
  component: ModalMobile,
  title: 'Modal/ModalMobile/Документация',
  tags: ['autodocs'],
  decorators: [OnChangeSyncArgs],
};

export default meta;
type Story = StoryObj<typeof ModalMobile>;

export const Docs: Story = {
  args: {
    title: 'Заголовок мобильного модального окна',
    children: 'Привет, это мобильное модальное окно.',
    footer: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description:
        'Передает контекст внутрь мобильного модального окна, который может служить для информирования пользователя или получения данных.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    footer: {
      control: 'text',
      description: 'Позволяет отрисовать контент в области футера',
      table: { defaultValue: { summary: 'null' }, type: { summary: 'React.ReactNode | null' } },
    },
    title: {
      control: 'text',
      description: 'Заголовок мобильного модального окна',
    },
    isOpen: {
      control: 'boolean',
      description:
        'Используется для управления состоянием видимости компонента. Указывает, открыт или закрыт комопнент.',
      table: { defaultValue: { summary: 'false' } },
    },
    handleClose: {
      description: 'Функция, которая вызывается для закрытия модального окна',
      table: { type: { summary: '() => void' } },
    },
  },
  render: (args) => {
    const [, setArgs] = useArgs();
    const onOpen = () => {
      setArgs({ ...args, isOpen: true });
    };

    return (
      <Space>
        <Flex vertical gap='small'>
          <Card>
            <Text>
              Компонент используется в качестве модального окна при isMobile (мобильных расширениях) xs или sm (до
              600px). На не мобильных расширениях (isDesktop, isTablet) работает как всплывающее модальное окно, а на
              мобильных расширениях становится нижним дровером.
            </Text>
          </Card>
          <Card className={styles.container}>
            <Drawer {...args} open={args.isOpen} getContainer={false} placement='bottom' height='30vh' />
            <Button dataTestId={`modalMobile-${dataTestId}`} onClick={onOpen}>
              Open ModalMobile
            </Button>
          </Card>
        </Flex>
      </Space>
    );
  },
};
