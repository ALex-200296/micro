import React from 'react';
import { EdoProvider } from '@shared/ui/organisms/Toolbar/Tools/EdoProvider.component';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Card, Typography } from 'antd';

import { Docs as ButtonDocs } from '../../Buttons/IconButton/Docs.stories';

const { Text } = Typography;

const { icon } = ButtonDocs.argTypes as ArgTypes;
void icon;

const meta: Meta<typeof EdoProvider> = {
  component: EdoProvider,
  title: 'Toolbar/Tools/EdoProvider',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EdoProvider>;

export const Docs: Story = {
  argTypes: {
    menu: { description: 'Элементы выпадающего списка' },
    buttonProps: { description: 'Настройка кнопки' },
  },
  render: (args) => (
    <>
      <Card>
        <Text>
          <Text strong>EdoProvider</Text> - кнопка компонента Toolbar. Кнопка состоит из иконки, описания и выпадающего
          списка. При наведении и нажати на кнопку появялется выпадающий список с заявками. При переходе на заявку,
          пользователь переходит на новую вкалдку по ссылке. Применяется в разделе Интеграции, подраздел - Заявка на
          подключение EDI/ЮЗЭДО, таб - Заявка EDI.
        </Text>
      </Card>
      <Card>
        <EdoProvider {...args} />
      </Card>
    </>
  ),
};
