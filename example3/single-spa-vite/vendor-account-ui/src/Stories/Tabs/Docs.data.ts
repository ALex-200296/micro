import { TabsProps } from 'antd';

export const tabsProps =
  'key: string;\n' +
  'label: React.ReactNode;\n' +
  'children?: React.ReactNode;\n' +
  'className?: string;\n' +
  'style?: React.CSSProperties;\n' +
  'disabled?: boolean;\n' +
  'forceRender?: boolean;\n' +
  'closable?: boolean;\n' +
  'closeIcon?: React.ReactNode;\n' +
  'prefixCls?: string;\n' +
  'tabKey?: string;\n' +
  'id?: string;\n' +
  'animated?: boolean;\n' +
  'active?: boolean;\n' +
  'destroyInactiveTabPane?: boolean;\n' +
  '};';

export const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Каталог',
    children: 'Контент каталога',
  },
  {
    key: '2',
    label: 'Логистика',
    children: 'Контент логистики',
  },
  {
    key: '3',
    label: 'Аналитика',
    children: 'Контент аналитики',
  },
  {
    key: '4',
    label: 'Финансы',
    children: 'Контент финансов',
  },
  {
    key: '5',
    label: 'Заказы',
    children: 'Контент заказов',
  },
];

export const propsToDisable = [
  'addIcon',
  'hideAdd',
  'indicatorSize',
  'moreIcon',
  'renderTabBar',
  'onTabScroll',
  'className',
  'id',
  'prefixCls',
  'locale',
  'moreTransitionName',
  'more',
  'removeIcon',
  'getPopupContainer',
  'indicator',
];

export const routerProps = {
  key: 'string',
  label: 'string',
  children: 'React.ReactNode',
  parentPath: 'string(Необязательный)',
  path: 'string(Необязательный)',
  accessOption: 'keyof typeof UserRights(Необязательный, параметр отвечает за доступ к данному табу)',
  description: 'Description(Необязательный, параметр отвечает за заголовок и подзаголов)',
};

export const imageExample = {
  parentPath: 'catalog/control',
  path: 'images',
};
