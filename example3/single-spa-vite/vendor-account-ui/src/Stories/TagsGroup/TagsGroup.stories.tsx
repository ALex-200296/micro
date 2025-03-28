import React from 'react';
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleFilled,
  ScissorOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { ITagsGroupProps } from '@shared/lib';
import { TagsGroup as TagsGroupComponent } from '@shared/ui/molecules/TagsGroup/TagsGroup.component';
import { Meta, StoryObj } from '@storybook/react';
import { Card, Space, Typography } from 'antd';

import { dataTestId, getLinkToAntDesign } from '../stories.data';

import { Docs } from './Docs.stories';

import theme from '@styles/themeExports.module.scss';

const { Link } = Typography;

const meta: Meta<typeof TagsGroupComponent> = {
  component: TagsGroupComponent,
  title: 'Tags/TagsGroup',
};

export default meta;
type Story = StoryObj<typeof TagsGroupComponent>;

const TagsGroupWithColors: React.FC = () => {
  const colors: ITagsGroupProps['color'][] = [
    'processing',
    'error',
    'warning',
    'success',
    'default',
    'neutral',
    theme.success,
    theme.error,
    theme.warning,
  ];
  const tagsData: ITagsGroupProps['tagsData'] = colors.map((color) => ({ value: `Tag ${color}`, color }));

  return <TagsGroupComponent tagsData={tagsData} dataTestId={`tags-group-${dataTestId}`} />;
};

const TagsGroupWithIcons: React.FC = () => {
  const iconsAndStatus: Omit<ITagsGroupProps, 'tagsData'>[] = [
    { icon: <CheckCircleOutlined />, color: 'success', dataTestId: `tags-group-${dataTestId}` },
    { icon: <CheckCircleFilled />, color: theme.success, dataTestId: `tags-group-${dataTestId}` },
    {
      icon: <CloseCircleOutlined />,
      color: 'error',
      closable: true,
      closeIcon: <ScissorOutlined />,
      dataTestId: `tags-group-${dataTestId}`,
    },
    { icon: <QuestionCircleFilled />, color: theme.error, closable: true, dataTestId: `tags-group-${dataTestId}` },
    { icon: <SyncOutlined spin />, color: 'processing', dataTestId: `tags-group-${dataTestId}` },
    { icon: <ExclamationCircleOutlined />, color: 'warning', dataTestId: `tags-group-${dataTestId}` },
  ];
  const tagsData: ITagsGroupProps['tagsData'] = iconsAndStatus.map((entry) => ({
    value: `Tag ${entry.color}`,
    ...entry,
  }));

  return <TagsGroupComponent tagsData={tagsData} dataTestId={`tags-group-${dataTestId}`} />;
};

export const TagsGroup: Story = {
  ...Docs,
  render: (args) => (
    <Space wrap direction='vertical' size='middle'>
      <Card title='Демо тегов'>
        <TagsGroupComponent {...args} />
      </Card>
      <Card title='Теги разных цветов (статус и hex)'>
        <TagsGroupWithColors />
      </Card>
      <Card title='Теги с иконками (начало контента и закрытие тега)'>
        <TagsGroupWithIcons />
      </Card>
      <Card>
        <Link href={getLinkToAntDesign('tag')}>Cсылка на компонент тега AntDesign</Link>
      </Card>
    </Space>
  ),
};
