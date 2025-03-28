import React from 'react';
import { DownloadAsExcel } from '@shared/ui/organisms/Toolbar/Tools/DownloadAsExcel.component';
import { linkTo } from '@storybook/addon-links';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Card, Typography } from 'antd';

import { Docs as ButtonDocs } from '../../Buttons/IconButton/Docs.stories';

const { Text, Link } = Typography;

const { icon, ...argTypes } = ButtonDocs.argTypes as ArgTypes;
void icon;

const meta: Meta<typeof DownloadAsExcel> = {
  component: DownloadAsExcel,
  title: 'Toolbar/Tools/DownloadAsExcel',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DownloadAsExcel>;

export const Docs: Story = {
  args: {
    children: 'Выгрузить в Excel',
    type: 'default',
    href: '',
    notification: 0,
    size: 'middle',
    shape: 'default',
    disabled: false,
    block: false,
  },
  argTypes: {
    ...argTypes,
    children: { description: 'Лейбл кнопки', table: { defaultValue: { summary: 'Выгрузить в Excel' } } },
  },

  render: (args) => (
    <>
      <Card>
        <Text>
          <Text strong>DownloadAsExcel</Text> - кнопка компонента Toolbar. Кнопка состоит из иконки и описания. Отвечает
          за выгрузку отчета в формате Excel. Применяется в разделе Ежедневник. При нажатии на кнопку в тулбаре, если
          переданы пропсы модального окна, открывается модальное окно. По нажатию на кнопку внутри модального окна
          формируется отчет с дальнейшей возвожностью скачивания по ссылке. На вход принимает пропсы кнопки -
          ButtonProps (см. компонент <Link onClick={linkTo('buttons/iconButton')}>Buttons</Link>
          ), имеет значения по умолчанию.
        </Text>
      </Card>
      <Card>
        <DownloadAsExcel {...args} />
      </Card>
    </>
  ),
};
