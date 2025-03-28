import React from 'react';
import { Toolbar as ToolbarComponent } from '@shared/ui/organisms/Toolbar/Toolbar.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Space } from 'antd';

import { getLinkToAntDesign } from '../stories.data';

import { IntegrationName } from './Docs.data';
import { Docs } from './Docs.stories';

import styles from './Toolbar.module.scss';

const meta: Meta<typeof ToolbarComponent> = {
  component: ToolbarComponent,
  title: 'Toolbar/Toolbar',
};

export default meta;
type Story = StoryObj<typeof ToolbarComponent>;

export const Toolbar: Story = {
  ...Docs,
  render: (args) => (
    <Space direction='vertical' size='middle' className={styles.space}>
      <Card title='Компонент Toolbar состоит из кнопок'>
        <ToolbarComponent {...args}>
          <Space direction='horizontal' wrap>
            <ToolbarComponent.DownloadFile />
            <ToolbarComponent.DownloadAsExcel />
            <ToolbarComponent.ApplyFilter />
            <ToolbarComponent.OpenDocumentation />
            <ToolbarComponent.CreateTask />
            <ToolbarComponent.SubscribeToCalendar />
            <ToolbarComponent.CreateAct />
            <ToolbarComponent.EdoProvider />
            <ToolbarComponent.CreateFactoring />
            <ToolbarComponent.EdoApplication edoType={IntegrationName.Edi} />
            <ToolbarComponent.EdoApplication />
            <ToolbarComponent.EdoApplication edoType={IntegrationName.EdiProject} />
          </Space>
        </ToolbarComponent>
      </Card>
      <Card>
        <a href={getLinkToAntDesign('space')}>ссылка на Space ant design</a>
      </Card>
    </Space>
  ),
};
