import React from 'react';
import { Link } from 'react-router-dom';
import {
  ApiOutlined,
  AuditOutlined as VendorFormIcon,
  BankOutlined as LogisticsManagementIcon,
  BarChartOutlined as AnalyticsIcon,
  BlockOutlined as PriceListIcon,
  BuildOutlined as PurchaseOutlinedIcon,
  CarOutlined as LogisticsInfoIcon,
  CommentOutlined as CommunicationsIcon,
  ContainerOutlined as VendorContractIcon,
  ControlOutlined as CatalogGoodsControlIcon,
  DiffOutlined as CatalogGoodsListIcon,
  DiffOutlined as ServicesIcon,
  FileDoneOutlined as FinancesReconciliationIcon,
  FileOutlined as OrdersIcon,
  FileProtectOutlined as SourseInfoIcon,
  GiftOutlined as KonkursIcon,
  GoldOutlined as PricingOutlinedIcon,
  LineChartOutlined as FinancesIcon,
  LoginOutlined,
  LogoutOutlined,
  PlusCircleOutlined as CatalogGoodsLoadIcon,
  QuestionCircleOutlined,
  ReadOutlined as CatalogIcon,
  ReconciliationOutlined as LogisticsIcon,
  RetweetOutlined as ApplicationIcon,
  RightCircleOutlined as LinkIcon,
  RocketOutlined as ProjectsIcon,
  ScheduleOutlined as CalendarIcon,
  SoundOutlined as MarketingIcon,
  StarOutlined as SkillsIcon,
  SyncOutlined as IntegrationIcon,
  TeamOutlined as ProjectsWorkIcon,
  TrademarkCircleOutlined as FactoringIcon,
  UserOutlined,
} from '@ant-design/icons';
import { Routes } from '@app/routes/root.types';
import { UserRightsStateType } from '@app/store/user/user.types';
import { GetAccessRouteType } from '@shared/lib/hooks/useRules/useRules.types';
import { AnalyticsRulesKey } from '@shared/lib/services/rules/analytics/analytics.rules';
import { BaseRulesKey } from '@shared/lib/services/rules/base/base.rules';
import { CatalogRulesKey } from '@shared/lib/services/rules/catalog/catalog.rules';
import { CommunicationsRulesKey } from '@shared/lib/services/rules/communications/Communications.rules';
import { FinanceRulesKey } from '@shared/lib/services/rules/finance/finance.rules';
import { IntegrationRulesKey } from '@shared/lib/services/rules/integration/integration.rules';
import { LimitedRulesKey } from '@shared/lib/services/rules/limited/limited.rules';
import { LogisticsRulesKey } from '@shared/lib/services/rules/logistics/logistics.rules';
import { MarketingRulesKey } from '@shared/lib/services/rules/marketing/marketing.rules';
import { OrdersRulesKey } from '@shared/lib/services/rules/orders/orders.rules';
import { PricingRulesKey } from '@shared/lib/services/rules/pricing/pricing.rules';
import { ProjectsRulesKey } from '@shared/lib/services/rules/projects/projects.rules';
import { isUndefined } from '@shared/lib/utils/helpers/typeGuards/isUndefined';
import { Typography } from 'antd';

import { MenuItemType, MenuItemWithRules } from './Menu.types';

import styles from './Menu.module.scss';
import theme from '@styles/themeExports.module.scss';

const envIsProd = import.meta.env.VITE_APP_IS_PROD || '';

export const isProd = envIsProd;
export const menuTitle = 'Задать вопрос';

export const menuThemeConfig = {
  components: {
    Tooltip: {
      colorBgSpotlight: theme.primaryBlack,
      colorTextLightSolid: theme.primaryWhite,
      fontSize: Number(theme.fontSize),
    },
  },
};

const toIproCatalog = `${import.meta.env.VITE_APP_REDIRECT_URL}${import.meta.env.VITE_APP_LINK_TO_CATALOG}`;
const toSourseInfo = `${import.meta.env.VITE_APP_REDIRECT_IPRO2}${import.meta.env.VITE_APP_LINK_TO_INFOSOURSE}`;
const toKonkurs = `${import.meta.env.VITE_APP_REDIRECT_IPRO2}${import.meta.env.VITE_APP_LINK_TO_KONKURS}`;
const toSkills = `${import.meta.env.VITE_APP_REDIRECT_SKILLS}`;

const { Link: AntdLink } = Typography;

const getMainMenuData = (menuIsOpen: boolean): MenuItemWithRules[] => {
  const getTitle = (text: string) => (menuIsOpen ? text : '');

  return [
    {
      key: 'limited',
      id: LimitedRulesKey.LIMITED,
      dontShow: true,
      children: [
        {
          key: Routes.VENDOR_FORM,
          label: <Link to={`/${Routes.VENDOR_FORM}`}>Анкета поставщика</Link>,
          icon: <VendorFormIcon />,
        },
        {
          key: Routes.VENDOR_CONTRACT,
          label: <Link to={`/${Routes.VENDOR_CONTRACT}`}>Договор поставщика</Link>,
          icon: <VendorContractIcon />,
        },
      ],
    },
    {
      key: 'base',
      id: BaseRulesKey.BASE,
      dontShow: true,
      children: [
        {
          id: CatalogRulesKey.CATALOG,
          label: 'Каталог',
          key: Routes.CATALOG,
          icon: <CatalogIcon />,
          children: [
            {
              label: <Link to={`/${Routes.CATALOG}/${Routes.GOODS}`}>Управление списком товаров</Link>,
              key: Routes.GOODS,
              icon: <CatalogGoodsListIcon />,
            },
            {
              label: <Link to={`/${Routes.CATALOG}/${Routes.DOWNLOAD}`}>Загрузить новые товары</Link>,
              key: Routes.DOWNLOAD,
              icon: <CatalogGoodsLoadIcon />,
            },
            {
              label: (
                <Link title={getTitle('Управление данными о товарах')} to={`/${Routes.CATALOG}/${Routes.CONTROL}`}>
                  Управление данными о товарах
                </Link>
              ),
              key: Routes.CONTROL,
              icon: <CatalogGoodsControlIcon />,
            },
            {
              label: (
                <AntdLink rel='noreferrer' href={toIproCatalog} target='_blank'>
                  Каталог товаров iPRO
                  <span className={styles.link_icon}>
                    <LinkIcon />
                  </span>
                </AntdLink>
              ),
              key: 'iPRO3Catalog',
              icon: <CatalogIcon />,
            },
          ],
        },
        {
          id: PricingRulesKey.PRICING,
          label: 'Ценообразование',
          key: Routes.PRICING,
          icon: <PricingOutlinedIcon />,
          children: [
            {
              id: PricingRulesKey.PURCHASE,
              label: (
                <Link title={getTitle('Управление ценами')} to={`/${Routes.PRICING}/${Routes.PURCHASE}`}>
                  Управление ценами
                </Link>
              ),
              key: Routes.PURCHASE,
              icon: <PurchaseOutlinedIcon />,
            },
            {
              id: PricingRulesKey.PRICELIST,
              label: (
                <Link title={getTitle('Управление прайс-листами')} to={`/${Routes.PRICING}/${Routes.PRICE_LIST}`}>
                  Управление прайс-листами
                </Link>
              ),
              key: Routes.PRICE_LIST,
              icon: <PriceListIcon />,
            },
          ],
        },
        {
          id: LogisticsRulesKey.LOGISTICS,
          label: 'Ассортимент и логистика',
          key: Routes.LOGISTICS,
          icon: <LogisticsIcon />,
          children: [
            {
              label: (
                <Link title={getTitle('Управление логистическими данными')} to={`/${Routes.LOGISTICS}/${Routes.INFO}`}>
                  Управление логистическими данными
                </Link>
              ),
              key: Routes.INFO,
              icon: <LogisticsInfoIcon />,
            },
            {
              label: (
                <Link
                  title={getTitle('Управление складским ассортиментом')}
                  to={`/${Routes.LOGISTICS}/${Routes.MANAGEMENT}`}
                >
                  Управление складским ассортиментом
                </Link>
              ),
              key: Routes.MANAGEMENT,
              icon: <LogisticsManagementIcon />,
            },
          ],
        },
        {
          id: ProjectsRulesKey.DESIGN,
          label: 'Проектная работа',
          key: Routes.DESIGN,
          icon: <ProjectsWorkIcon />,
          children: [
            {
              label: <Link to={`/${Routes.DESIGN}/${Routes.PROJECTS}`}>Проекты</Link>,
              key: Routes.PROJECTS,
              icon: <ProjectsIcon />,
            },
          ],
        },
        {
          id: CommunicationsRulesKey.DIARY,
          label: 'Коммуникации',
          key: Routes.COMMUNICATIONS,
          icon: <CommunicationsIcon />,
          children: [
            {
              label: <Link to={`/${Routes.COMMUNICATIONS}/${Routes.DIARY}`}>Ежедневник</Link>,
              key: Routes.DIARY,
              icon: <CalendarIcon />,
            },
          ],
        },
        {
          id: OrdersRulesKey.ORDERS,
          label: <Link to={`/${Routes.ORDERS}`}>Заказы</Link>,
          key: Routes.ORDERS,
          icon: <OrdersIcon />,
        },
        {
          label: 'Финансы',
          key: Routes.FINANCE,
          id: FinanceRulesKey.FINANCE,
          icon: <FinancesIcon />,
          children: [
            {
              id: FinanceRulesKey.FINANCE_RECONCILIATION,
              label: <Link to={`/${Routes.FINANCE}/${Routes.RECONCILIATION}`}>Акты сверки</Link>,
              key: Routes.RECONCILIATION,
              icon: <FinancesReconciliationIcon />,
            },
            {
              id: FinanceRulesKey.FINANCE_SERVICES,
              label: <Link to={`/${Routes.FINANCE}/${Routes.SERVICES}`}>Акты за услуги</Link>,
              key: Routes.SERVICES,
              icon: <ServicesIcon />,
            },
            {
              id: FinanceRulesKey.FINANCE_FACTORING,
              label: <Link to={`/${Routes.FINANCE}/${Routes.FACTORING}`}>Факторинг</Link>,
              key: Routes.FACTORING,
              icon: <FactoringIcon />,
            },
          ],
        },
        {
          id: IntegrationRulesKey.INTEGRATION,
          label: 'Интеграция',
          key: Routes.INTEGRATION,
          icon: <IntegrationIcon />,
          children: [
            {
              label: (
                <Link
                  title={getTitle('Заявка на подключение EDI/ЮЗЭДО')}
                  to={`/${Routes.INTEGRATION}/${Routes.APPLICATION}`}
                >
                  Заявка на подключение EDI/ЮЗЭДО
                </Link>
              ),
              key: Routes.APPLICATION,
              icon: <ApplicationIcon />,
            },
            {
              label: (
                <Link title={getTitle('Заявка на подключение к API')} to={`/${Routes.INTEGRATION}/${Routes.APP_API}`}>
                  Заявка на подключение к API
                </Link>
              ),
              key: Routes.APP_API,
              icon: <ApiOutlined />,
            },
          ],
        },
        {
          id: MarketingRulesKey.MARKETING,
          label: 'Маркетинг',
          key: 'marketing',
          icon: <MarketingIcon />,
          children: [
            {
              id: MarketingRulesKey.MARKETING_SOURSE_INFO,
              label: (
                <AntdLink rel='noreferrer' href={toSourseInfo} target='_blank'>
                  Инфресурс
                  <span className={styles.link_icon}>
                    <LinkIcon />
                  </span>
                </AntdLink>
              ),
              key: 'sourseInfo',
              icon: <SourseInfoIcon />,
            },
            {
              id: MarketingRulesKey.MARKETING_KONKURS,
              label: (
                <AntdLink rel='noreferrer' href={toKonkurs} target='_blank'>
                  Конкурсы
                  <span className={styles.link_icon}>
                    <LinkIcon />
                  </span>
                </AntdLink>
              ),
              key: 'konkursp',
              icon: <KonkursIcon />,
            },
            {
              id: MarketingRulesKey.MARKETING_SKILLS,
              label: (
                <AntdLink rel='noreferrer' href={toSkills} target='_blank'>
                  Мероприятия
                  <span className={styles.link_icon}>
                    <LinkIcon />
                  </span>
                </AntdLink>
              ),
              key: 'skills',
              icon: <SkillsIcon />,
            },
          ],
        },
        {
          id: AnalyticsRulesKey.ANALYTICS,
          label: <Link to={`/${Routes.ANALITICS}`}>Аналитика</Link>,
          key: 'analytics',
          icon: <AnalyticsIcon />,
        },
      ],
    },
  ];
};

const constructMenu = (
  menu: MenuItemWithRules[],
  isAuth: boolean,
  getAccessRoute: GetAccessRouteType,
): MenuItemType[] =>
  menu.reduce<MenuItemType[]>((accum, current) => {
    const access = current.id ? getAccessRoute(current.id) : true;
    if (access) {
      const { id: _, ...rest } = current;
      void _;
      if (rest.children) {
        const children = constructMenu(rest.children, isAuth, getAccessRoute);

        if (rest.dontShow) return [...accum, ...children];
        return [...accum, { ...rest, children: children } as MenuItemType];
      }
      return [...accum, rest as MenuItemType];
    }
    return accum as MenuItemType[];
  }, []);

export const getMainMenu = (
  menuIsOpen: boolean,
  isAuth: boolean,
  getAccessRoute: GetAccessRouteType,
): MenuItemType[] => {
  if (!isAuth) return [];
  return constructMenu(getMainMenuData(menuIsOpen), isAuth, getAccessRoute);
};

export const getBottomMenu = (
  sId: boolean,
  onHelpClick: () => void,
  onLogout: () => void,
  rights?: UserRightsStateType | null,
  isMobile?: boolean,
): MenuItemWithRules[] => {
  if (sId) {
    if (isUndefined(rights)) return [];
    if (!rights?.dostuplkp && !isMobile) {
      return [
        {
          label: 'Каталог',
          key: 'catalog',
          icon: <CatalogIcon />,
          children: [
            {
              label: (
                <AntdLink rel='noreferrer' href={toIproCatalog} target='_blank'>
                  Каталог товаров iPRO
                  <span className={styles.link_icon}>
                    <LinkIcon />
                  </span>
                </AntdLink>
              ),
              key: 'iPRO3Catalog',
              icon: <CatalogIcon />,
            },
          ],
        },
        { label: 'Помощь', key: 'help', icon: <QuestionCircleOutlined />, onClick: onHelpClick },
        { label: 'Выйти', key: 'logout', icon: <LogoutOutlined />, onClick: onLogout },
      ];
    }
    return [
      ...(isMobile
        ? [{ key: 'help', icon: <QuestionCircleOutlined />, onClick: onHelpClick }]
        : [
            { label: <Link to={Routes.PROFILE}>Профиль</Link>, key: 'profile', icon: <UserOutlined /> },
            { label: 'Помощь', key: 'help', icon: <QuestionCircleOutlined />, onClick: onHelpClick },
            { label: 'Выйти', key: 'logout', icon: <LogoutOutlined />, onClick: onLogout },
          ]),
    ];
  }
  return [
    {
      label: isMobile ? '' : 'Помощь',
      key: 'help',
      icon: <QuestionCircleOutlined />,
      onClick: onHelpClick,
    },
    ...(isMobile
      ? []
      : [{ label: <Link to={Routes.LOGIN}>Войти / Зарегистрироваться</Link>, key: 'login', icon: <LoginOutlined /> }]),
  ];
};
