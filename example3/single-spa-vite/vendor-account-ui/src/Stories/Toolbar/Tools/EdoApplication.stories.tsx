import React from 'react';
import { EdoApplication } from '@shared/ui/organisms/Toolbar/Tools/EdoApplication.component';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Card, Space, Typography } from 'antd';

import { Docs as ButtonDocs } from '../../Buttons/IconButton/Docs.stories';
import { IntegrationName } from '../Docs.data';

const { Text } = Typography;

const { icon, ...argTypes } = ButtonDocs.argTypes as ArgTypes;
void icon;

const meta: Meta<typeof EdoApplication> = {
  component: EdoApplication,
  title: 'Toolbar/Tools/EdoApplication',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EdoApplication>;

export const Docs: Story = {
  args: {
    children: 'Оставить заявку',
    type: 'primary',
    href: '',
    notification: 0,
    size: 'middle',
    shape: 'default',
    disabled: false,
    block: false,
  },
  argTypes: {
    ...argTypes,
    children: { description: 'Лейбл кнопки', table: { defaultValue: { summary: 'Оставить заявку' } } },
  },
  render: (args) => (
    <>
      <Card>
        <Text>
          <Text strong>EdoApplication</Text> - кнопки компонента Toolbar. Кнопки состоят из иконки и описания. По
          нажатию на кнопку открывается ссылка в новой вкладке для заполнения заявки EDI/ЮЗЭДО/Проектный инфообмен.
          Применяется в разделе Интеграции, подраздел - Заявка на подключение EDI/ЮЗЕДО.
        </Text>
      </Card>
      <Card>
        <Space>
          <EdoApplication {...args} edoType={IntegrationName.Edi} />
          <EdoApplication {...args} />
          <EdoApplication {...args} edoType={IntegrationName.EdiProject} />
        </Space>
      </Card>
    </>
  ),
};
