import React from 'react';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import { downloadObjectAsJson } from '@shared/lib/utils/helpers/download.helpers';
import { IconButton } from '@shared/ui/molecules/Button/IconButton/IconButton.component';
import { Flex, TabsProps, Typography } from 'antd';
import cn from 'classnames';

import { antdTheme } from '../../index.theme';

import { ITabContentProps, ItemNames } from './AppTheme.types';

import styles from './AppTheme.module.scss';

const theme = antdTheme;

const errorText = 'Произошла ошибка, попробуйте позже';

export const listData = [
  'Скопируйте или скачайте действующую настройку',
  'Перейдите на сайт ant design в соответствующий раздел по ссылке ниже',
  'Кликните на кнопку Config',
  'Вставьте или загрузите скопированную настройку в открывшемся окне',
];

export const linkToAntDesignThemeEditor = 'https://ant.design/theme-editor';

const animationBlockConfig = [
  { name: 'backPulse', className: styles.backPulse },
  { name: 'floatBlock', className: styles.floatBlock },
  { name: 'growBlock', className: styles.growBlock },
  { name: 'showBlockTransition', className: styles.showBlockTransition },
  { name: 'growBlockTransition', className: styles.growBlockTransition },
  { name: 'blinkTransition', className: styles.blinkTransition },
];

const stringifyToken = (token: typeof theme | typeof theme.components) => JSON.stringify(token, null, '\t');

export const getAppThemeItem = (itemName: ItemNames): string => {
  const result: Record<string, string> = {};
  const { components, token } = theme;

  if (theme && itemName === ItemNames.appTheme) {
    return stringifyToken(theme);
  }
  if (components && itemName === ItemNames.COMPONENTS) {
    return stringifyToken(components);
  }

  if (token) {
    Object.entries(token).forEach((el) => {
      if (el[0].includes(itemName)) {
        result[el[0]] = el[1].toString();
      }
    });
    return stringifyToken(result);
  }
  return errorText;
};

const TabContent: React.FC<ITabContentProps> = ({ tabItemName }) => {
  const onCopyClick = () => navigator.clipboard.writeText(getAppThemeItem(tabItemName));
  const onDownloadClick = () => downloadObjectAsJson(getAppThemeItem(tabItemName), tabItemName);
  return (
    <>
      <Flex gap='small'>
        <IconButton onClick={onCopyClick} icon={<CopyOutlined />} iconPosition='end' dataTestId='copy-theme'>
          Скопировать
        </IconButton>
        <IconButton
          onClick={onDownloadClick}
          icon={<DownloadOutlined />}
          iconPosition='end'
          dataTestId='download-theme'
        >
          Скачать
        </IconButton>
      </Flex>
      <pre>{getAppThemeItem(tabItemName)}</pre>
    </>
  );
};

const AnimationTabContent: React.FC = () => (
  <Flex vertical gap='middle'>
    <Typography.Text>Для просмотра анимации наведите курсор на блок</Typography.Text>
    {animationBlockConfig.map(({ name, className }) => (
      <Typography.Text key={name} className={cn(styles.block, className)}>
        {name}
      </Typography.Text>
    ))}
  </Flex>
);

export const storyItems: TabsProps['items'] = [
  {
    key: '0',
    label: 'AppTheme',
    children: <TabContent tabItemName={ItemNames.appTheme} />,
  },
  {
    key: '1',
    label: 'Components',
    children: <TabContent tabItemName={ItemNames.COMPONENTS} />,
  },
  {
    key: '2',
    label: 'Colors',
    children: <TabContent tabItemName={ItemNames.COLOR} />,
  },
  {
    key: '3',
    label: 'Shadows',
    children: <TabContent tabItemName={ItemNames.BOX_SHADOW} />,
  },
  {
    key: '4',
    label: 'Font',
    children: <TabContent tabItemName={ItemNames.FONT} />,
  },
  {
    key: '5',
    label: 'LineHeights',
    children: <TabContent tabItemName={ItemNames.LINE} />,
  },
  {
    key: '6',
    label: 'Breakpoints',
    children: <TabContent tabItemName={ItemNames.SCREEN} />,
  },
  {
    key: '7',
    label: 'Animation',
    children: <AnimationTabContent />,
  },
];
