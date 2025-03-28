import React, { useState } from 'react';
import { createId } from '@shared/lib/utils/helpers/string.helpers';
import { Button } from '@shared/ui/atoms/Button/Button.component';
import { Portal } from '@shared/ui/atoms/Portal/Portal.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Flex, Modal } from 'antd';

const meta: Meta<typeof Portal> = {
  component: Portal,
  title: 'Portal/Документация',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Компонент \`Portal\` позволяет рендерить элементы в другую часть DOM-дерева, вне иерархии родительского компонента. Это особенно полезно для модальных окон, всплывающих подсказок и других элементов, которые должны отображаться поверх всего остального контента, независимо от ограничений родительского контейнера.
        `,
      },
    },
  },
  argTypes: {
    children: {
      description: 'Контент, который будет отрендерен внутри портала.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Portal>;

export const Docs: Story = {
  render: (args) => {
    const [isPortalModalVisible, setPortalModalVisible] = useState(false);
    const [isRegularModalVisible, setRegularModalVisible] = useState(false);

    const togglePortalModal = () => {
      setPortalModalVisible((prevState) => !prevState);
    };

    const toggleRegularModal = () => {
      setRegularModalVisible((prevState) => !prevState);
    };

    return (
      <>
        <Card title='Примеры'>
          <Flex gap='middle'>
            <Button dataTestId={createId()} type='primary' onClick={() => togglePortalModal()}>
              Показать модальное окно через Portal
            </Button>
            <Button dataTestId={createId()} onClick={() => toggleRegularModal()}>
              Показать модальное окно без Portal
            </Button>
          </Flex>
          <Portal {...args}>
            <Modal
              title='Модальное окно через Portal'
              open={isPortalModalVisible}
              onCancel={() => togglePortalModal()}
              onOk={() => togglePortalModal()}
              getContainer={false}
            >
              Это модальное окно рендерится с использованием компонента Portal.
            </Modal>
          </Portal>

          <Modal
            title='Модальное окно без использования Portal'
            open={isRegularModalVisible}
            onCancel={() => toggleRegularModal()}
            onOk={() => toggleRegularModal()}
            getContainer={false}
          >
            Это модальное окно рендерится без использования компонента Portal.
          </Modal>
        </Card>
      </>
    );
  },
};
