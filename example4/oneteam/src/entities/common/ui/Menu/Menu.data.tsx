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

const envIsProd = process.env.VITE_APP_IS_PROD || '';

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

const toIproCatalog = `${process.env.VITE_APP_REDIRECT_URL}${process.env.VITE_APP_LINK_TO_CATALOG}`;
const toSourseInfo = `${process.env.VITE_APP_REDIRECT_IPRO2}${process.env.VITE_APP_LINK_TO_INFOSOURSE}`;
const toKonkurs = `${process.env.VITE_APP_REDIRECT_IPRO2}${process.env.VITE_APP_LINK_TO_KONKURS}`;
const toSkills = `${process.env.VITE_APP_REDIRECT_SKILLS}`;

const { Link: AntdLink } = Typography;

const getMainMenuData = (menuIsOpen: boolean): MenuItemWithRules[] => {
  const getTitle = (text: string) => (menuIsOpen ? text : '');

  return [
    {
      key: 'limited',
      id: LimitedRulesKey.limited,
      dontShow: true,
      children: [
        {
          key: Routes.VendorForm,
          label: <Link to={`/${Routes.VendorForm}`}>Анкета поставщика</Link>,
          icon: <VendorFormIcon />,
        },
        {
          key: Routes.VendorContract,
          label: <Link to={`/${Routes.VendorContract}`}>Договор поставщика</Link>,
          icon: <VendorContractIcon />,
        },
      ],
    },
    {
      key: 'base',
      id: BaseRulesKey.base,
      dontShow: true,
      children: [
        {
          id: CatalogRulesKey.catalog,
          label: 'Каталог',
          key: Routes.Catalog,
          icon: <CatalogIcon />,
          children: [
            {
              label: <Link to={`/${Routes.Catalog}/${Routes.Goods}`}>Управление списком товаров</Link>,
              key: Routes.Goods,
              icon: <CatalogGoodsListIcon />,
            },
            {
              label: <Link to={`/${Routes.Catalog}/${Routes.Download}`}>Загрузить новые товары</Link>,
              key: Routes.Download,
              icon: <CatalogGoodsLoadIcon />,
            },
            {
              label: (
                <Link title={getTitle('Управление данными о товарах')} to={`/${Routes.Catalog}/${Routes.Control}`}>
                  Управление данными о товарах
                </Link>
              ),
              key: Routes.Control,
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
          id: PricingRulesKey.pricing,
          label: 'Ценообразование',
          key: Routes.Pricing,
          icon: <PricingOutlinedIcon />,
          children: [
            {
              id: PricingRulesKey.purchase,
              label: (
                <Link title={getTitle('Управление ценами')} to={`/${Routes.Pricing}/${Routes.Purchase}`}>
                  Управление ценами
                </Link>
              ),
              key: Routes.Purchase,
              icon: <PurchaseOutlinedIcon />,
            },
            {
              id: PricingRulesKey.pricelist,
              label: (
                <Link title={getTitle('Управление прайс-листами')} to={`/${Routes.Pricing}/${Routes.PriceList}`}>
                  Управление прайс-листами
                </Link>
              ),
              key: Routes.PriceList,
              icon: <PriceListIcon />,
            },
          ],
        },
        {
          id: LogisticsRulesKey.logistics,
          label: 'Ассортимент и логистика',
          key: Routes.Logistics,
          icon: <LogisticsIcon />,
          children: [
            {
              label: (
                <Link title={getTitle('Управление логистическими данными')} to={`/${Routes.Logistics}/${Routes.Info}`}>
                  Управление логистическими данными
                </Link>
              ),
              key: Routes.Info,
              icon: <LogisticsInfoIcon />,
            },
            {
              label: (
                <Link
                  title={getTitle('Управление складским ассортиментом')}
                  to={`/${Routes.Logistics}/${Routes.Management}`}
                >
                  Управление складским ассортиментом
                </Link>
              ),
              key: Routes.Management,
              icon: <LogisticsManagementIcon />,
            },
          ],
        },
        {
          id: ProjectsRulesKey.design,
          label: 'Проектная работа',
          key: Routes.Design,
          icon: <ProjectsWorkIcon />,
          children: [
            {
              label: <Link to={`/${Routes.Design}/${Routes.Projects}`}>Проекты</Link>,
              key: Routes.Projects,
              icon: <ProjectsIcon />,
            },
          ],
        },
        {
          id: CommunicationsRulesKey.diary,
          label: 'Коммуникации',
          key: Routes.Communications,
          icon: <CommunicationsIcon />,
          children: [
            {
              label: <Link to={`/${Routes.Communications}/${Routes.Diary}`}>Ежедневник</Link>,
              key: Routes.Diary,
              icon: <CalendarIcon />,
            },
          ],
        },
        {
          id: OrdersRulesKey.orders,
          label: <Link to={`/${Routes.Orders}`}>Заказы</Link>,
          key: Routes.Orders,
          icon: <OrdersIcon />,
        },
        {
          label: 'Финансы',
          key: Routes.Finance,
          id: FinanceRulesKey.finance,
          icon: <FinancesIcon />,
          children: [
            {
              id: FinanceRulesKey.financeReconciliation,
              label: <Link to={`/${Routes.Finance}/${Routes.Reconciliation}`}>Акты сверки</Link>,
              key: Routes.Reconciliation,
              icon: <FinancesReconciliationIcon />,
            },
            {
              id: FinanceRulesKey.financeServices,
              label: <Link to={`/${Routes.Finance}/${Routes.Services}`}>Акты за услуги</Link>,
              key: Routes.Services,
              icon: <ServicesIcon />,
            },
            {
              id: FinanceRulesKey.financeFactoring,
              label: <Link to={`/${Routes.Finance}/${Routes.Factoring}`}>Факторинг</Link>,
              key: Routes.Factoring,
              icon: <FactoringIcon />,
            },
          ],
        },
        {
          id: IntegrationRulesKey.integration,
          label: 'Интеграция',
          key: Routes.Integration,
          icon: <IntegrationIcon />,
          children: [
            {
              label: (
                <Link
                  title={getTitle('Заявка на подключение EDI/ЮЗЭДО')}
                  to={`/${Routes.Integration}/${Routes.Application}`}
                >
                  Заявка на подключение EDI/ЮЗЭДО
                </Link>
              ),
              key: Routes.Application,
              icon: <ApplicationIcon />,
            },
            {
              label: (
                <Link title={getTitle('Заявка на подключение к API')} to={`/${Routes.Integration}/${Routes.AppApi}`}>
                  Заявка на подключение к API
                </Link>
              ),
              key: Routes.AppApi,
              icon: <ApiOutlined />,
            },
          ],
        },
        {
          id: MarketingRulesKey.marketing,
          label: 'Маркетинг',
          key: 'marketing',
          icon: <MarketingIcon />,
          children: [
            {
              id: MarketingRulesKey.marketingSourseInfo,
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
              id: MarketingRulesKey.marketingKonkurs,
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
              id: MarketingRulesKey.marketingSkills,
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
          id: AnalyticsRulesKey.analytics,
          label: <Link to={`/${Routes.Analytics}`}>Аналитика</Link>,
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
            { label: <Link to={Routes.Profile}>Профиль</Link>, key: 'profile', icon: <UserOutlined /> },
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
      : [{ label: <Link to={Routes.Login}>Войти / Зарегистрироваться</Link>, key: 'login', icon: <LoginOutlined /> }]),
  ];
};
