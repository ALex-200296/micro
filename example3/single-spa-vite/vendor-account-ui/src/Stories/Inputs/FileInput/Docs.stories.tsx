import React from 'react';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { FileInput } from '@features/common/ui/Inputs/FileInput/FileInput.component';
import { ScreenLock } from '@shared/ui/atoms/ScreenLock/ScreenLock.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Typography } from 'antd';
import Link from 'antd/es/typography/Link';

import { disableProps, getLinkToAntDesign } from '../../stories.data';

import { propsToDisable } from './Docs.data';

const meta: Meta<typeof FileInput> = {
  component: FileInput,
  title: 'Inputs/FileInput/Документация',
  tags: ['autodocs'],
  argTypes: {
    ...disableProps(propsToDisable),
  },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Docs: Story = {
  args: {
    uploadHint: 'Загрузите файл в формате ...',
    uploadText: 'Нажмите или перетащите файл в эту область, чтобы загрузить',
  },
  argTypes: {
    uploadText: {
      control: 'text',
      description: 'Позволяет задать сопроводительный текст в области загрузки файлов.',
    },
    uploadHint: {
      control: 'text',
      description: 'Позволяет задать текст - подсказку с указанием доп. информации. Например, формат файлов.',
    },
    showUploadList: {
      description:
        'Позволяет кастомизировать список выбранных файлов. Например, добавить кастомную иконку удаления файла.',
    },
    accept: {
      description:
        'Определяет допустимый формат файла. Также есть возможность перечислить множество допустимых файлов через запятую.',
    },
    disabled: {
      control: 'boolean',
      description: 'Активирует / блокирует область подгрузки файлов.',
    },
    multiple: {
      control: 'boolean',
      description: 'Возможность разовой подгрузки более одного файла.',
    },
    onChange: {
      description: 'Функция, вызываемая при изменении состояния подгрузки файлов.',
    },
    className: {
      description: 'Класс стилей, навешиваемый на компонент.',
    },
    style: {
      description: 'Inline стили компонента.',
      control: 'object',
    },
    onDrop: {
      description: 'Функция, вызываемая при перетаскивании файлов в область подгрузки.',
    },
    defaultFileList: {
      description: 'Список подгружаемых файлов по умолчанию.',
    },
    fileList: {
      description: 'Список выбранных подгружаемых файлов.',
    },
    directory: {
      control: 'boolean',
      description: 'Позволяет выгружать файлы целой директорией, т.е. всю папку за раз.',
    },
    listType: {
      control: 'text',
      description: 'Задает стиль списка подружаемых файлов: текстовый, с изображением, карточка, круг.',
      options: ['text', 'picture', 'picture-card', 'picture-circle'],
    },
    rootClassName: {
      description: 'Корневой стиль компонента.',
    },
    onPreview: {
      description: 'Функция, вызываемая при нажатии на файл-ссылку или значок предварительного просмотра.',
    },
    onRemove: {
      description: 'Функция, вызываемая при удалении файла из списка.',
    },
    iconRender: {
      description: 'Кастомная иконка для подгрузки файлов.',
    },
    isImageUrl: {
      description: 'Кастомизирует картинку, которая присваивается подгружаемому файлу или файлам.',
    },
    progress: {
      description: 'Кастомизация прогресс - бара.',
    },
    itemRender: {
      description: 'Кастомная отрисовка подгружаемых файлов.',
    },
    maxCount: {
      control: 'number',
      description: 'Максимально допустимое количество подгружаемых файлов за раз.',
    },
    dataTestId: {
      description: 'Кастомный атрибут для тестирования',
    },
    fileSizeAccept: {
      description: 'Определяет максимальный допустимый размер файла для загрузки',
    },
  },

  render: (args) => {
    const isScreenLock = useSelector(uiSelectors.getIsScreenLock);

    return (
      <>
        {isScreenLock && <ScreenLock />}
        <Card title='Компонент FileInput.'>
          <FileInput {...args} />
        </Card>
        <Card>
          <Typography.Text>
            Основное отличие данного компонента от компонента Ant Design - передача загруженных файлов в форму без
            отправления. Отправление осуществляется отдельно: по нажатию на кнопку. При временной задержке в момент
            загрузки большого количества файлов на сторону клиента срабатывает скринлок для демонстрации процесса
            подгрузки файлов и блокировки функционала приложения.
          </Typography.Text>
        </Card>
        <Card>
          <Link href={getLinkToAntDesign('upload')}>ссылка на Upload ant design</Link>
        </Card>
      </>
    );
  },
};
