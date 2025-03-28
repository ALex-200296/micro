import React from 'react';
import { TemplateFileAware } from '@shared/ui/molecules/Typography/Caption/TemplateFileAware/TemplateFileAware.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from 'antd';

import { getLinkToAntDesign } from '../stories.data';

const meta: Meta<typeof TemplateFileAware> = {
  component: TemplateFileAware,
  title: 'typography/TemplateFileAware/Документация',

  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TemplateFileAware>;

export const Docs: Story = {
  args: {
    path: '',
    name: '',
    description: 'Описание',
  },
  argTypes: {
    description: {
      description: 'Краткое описание о файле.',
    },
    path: {
      description: 'Путь к связываемому файлу.',
    },
    name: {
      description:
        'Указывает браузеру, что необходимо скачать документ, указанный в адресе ссылки, а не переходить на него и  задает новое имя для скачиваемого файла.',
    },
    className: {
      description: 'Класс стилей, навешиваемый на компонент.',
    },
  },
  render: (args) => (
    <>
      <Card>
        <TemplateFileAware {...args} />
      </Card>
      <Card>
        <a href={getLinkToAntDesign('typography')}>ссылка на типографию ant design</a>
      </Card>
    </>
  ),
};
