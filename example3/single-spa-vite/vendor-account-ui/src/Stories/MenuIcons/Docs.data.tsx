import React from 'react';
import {
  AuditOutlined,
  BankOutlined,
  BarChartOutlined,
  BlockOutlined,
  BuildOutlined,
  CarOutlined,
  CommentOutlined,
  ContainerOutlined,
  ControlOutlined,
  DiffOutlined,
  FileDoneOutlined,
  FileOutlined,
  FileProtectOutlined,
  GiftOutlined,
  GoldOutlined,
  LineChartOutlined,
  LoginOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  ReadOutlined,
  ReconciliationOutlined,
  RetweetOutlined,
  RightCircleOutlined,
  RocketOutlined,
  ScheduleOutlined,
  SoundOutlined,
  StarOutlined,
  SyncOutlined,
  TeamOutlined,
  TrademarkCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';

export const iconMenuList = {
  catalogPage: {
    icon: <ReadOutlined />,
    name: 'ReadOutlined - Каталог.',
    text: 'Используется для оглавления раздела Каталог.',
  },
  downloadPage: {
    icon: <PlusCircleOutlined />,
    name: 'PlusCircleOutlined - Загрузить новые товары.',
    text: 'Подраздел Каталога.',
  },
  controlPage: {
    icon: <ControlOutlined />,
    name: 'ControlOutlined - Управление данными о товарах.',
    text: 'Подраздел Каталога.',
  },
  iPRO3Catalog: {
    icon: <ReadOutlined />,
    name: 'ReadOutlined - Каталог товаров iPRO.',
    text: 'Подраздел Каталога.',
  },
  logisticsPage: {
    icon: <ReconciliationOutlined />,
    name: 'ReconciliationOutlined - Ассортимент и логистика.',
    text: 'Используется для оглавления раздела Ассортимент и логистика.',
  },
  infoPage: {
    icon: <CarOutlined />,
    name: 'CarOutlined - Управление логистическими данными.',
    text: 'Подраздел Ассортимента и логистики.',
  },
  managementPage: {
    icon: <BankOutlined />,
    name: 'BankOutlined - Управление складским ассортиментом.',
    text: 'Подраздел Ассортимента и логистики.',
  },
  designWorkPage: {
    icon: <TeamOutlined />,
    name: 'TeamOutlined - Проектная работа.',
    text: 'Используется для оглавления раздела Проектная работа.',
  },
  projectsPage: {
    icon: <RocketOutlined />,
    name: 'RocketOutlined - Проекты.',
    text: 'Подраздел Проектной работы.',
  },
  communicationsPage: {
    icon: <CommentOutlined />,
    name: 'CommentOutlined - Коммуникации.',
    text: 'Используется для оглавления раздела Коммуникации.',
  },
  diaryPage: {
    icon: <ScheduleOutlined />,
    name: 'ScheduleOutlined - Ежедневник.',
    text: 'Подраздел Коммуникации.',
  },
  orders: {
    icon: <FileOutlined />,
    name: 'FileOutlined - Заказы.',
    text: 'Используется для оглавления раздела Заказы.',
  },
  financePage: {
    icon: <LineChartOutlined />,
    name: 'LineChartOutlined - Финансы.',
    text: 'Используется для оглавления раздела Финансы.',
  },
  reconciliation: {
    icon: <FileDoneOutlined />,
    name: 'FileDoneOutlined - Акты сверки.',
    text: 'Подраздел Финансов.',
  },
  services: {
    icon: <DiffOutlined />,
    name: 'DiffOutlined - Акты за услуги.',
    text: 'Подраздел Финансов.',
  },
  integrationPage: {
    icon: <SyncOutlined />,
    name: 'SyncOutlined - Интеграция.',
    text: 'Используется для оглавления раздела Интеграция.',
  },
  application: {
    icon: <RetweetOutlined />,
    name: 'RetweetOutlined - Заявка на подключение EDI/ЮЗЭДО.',
    text: 'Подраздел Интеграции.',
  },
  marketing: {
    icon: <SoundOutlined />,
    name: 'SoundOutlined - Маркетинг.',
    text: 'Используется для оглавления раздела Маркетинг.',
  },
  sourseInfo: {
    icon: <FileProtectOutlined />,
    name: 'FileProtectOutlined - Инфресурс.',
    text: 'Подраздел Маркетинга.',
  },
  konkursp: {
    icon: <GiftOutlined />,
    name: 'GiftOutlined - Конкурсы.',
    text: 'Подраздел Маркетинга.',
  },
  skills: {
    icon: <StarOutlined />,
    name: 'StarOutlined - Мероприятия.',
    text: 'Подраздел Маркетинга.',
  },
  analyticsPage: {
    icon: <BarChartOutlined />,
    name: 'BarChartOutlined - Аналитика.',
    text: 'Используется для оглавления раздела Аналитика.',
  },
  profilePage: {
    icon: <UserOutlined />,
    name: 'UserOutlined - Профиль.',
    text: 'Используется для оглавления раздела Профиль.',
  },
  help: {
    icon: <QuestionCircleOutlined />,
    name: 'QuestionCircleOutlined - Помощь.',
    text: 'Используется для вызова формы Задать вопрос.',
  },
  logout: {
    icon: <LoginOutlined />,
    name: 'LoginOutlined - Войти / Выйти.',
    text: 'Используется для входа неавторизованного пользователя в личный кабинет. Для авторизованного пользователя - раздел Выйти.',
  },
  linkTo: {
    icon: <RightCircleOutlined />,
    name: 'RightCircleOutlined - ссылка.',
    text: 'Используется для перехода на внешний API.',
  },
  vendorForm: {
    icon: <AuditOutlined />,
    name: 'AuditOutlined - Анкета поставщика.',
    text: 'Используется для оглавления раздела Анкета поставщика.',
  },
  vendorContract: {
    icon: <ContainerOutlined />,
    name: 'ContainerOutlined - Договор поставщика.',
    text: 'Используется для оглавления раздела Договор поставщика.',
  },
  factoring: {
    icon: <TrademarkCircleOutlined />,
    name: 'TrademarkCircleOutlined - Факторинг.',
    text: 'Подраздел Финансов.',
  },
  pricingPage: {
    icon: <GoldOutlined />,
    name: 'GoldOutlined - Ценообразование.',
    text: 'Используется для оглавления раздела Ценообразование.',
  },
  priceList: {
    icon: <BlockOutlined />,
    name: 'BlockOutlined - Управление прайс-листами.',
    text: 'Подраздел Ценообразования.',
  },
  purchase: {
    icon: <BuildOutlined />,
    name: 'BuildOutlined - Управление ценами.',
    text: 'Подраздел Ценообразования.',
  },
};
