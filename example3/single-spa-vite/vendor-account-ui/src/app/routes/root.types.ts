import { RouteObject } from 'react-router-dom';

export const Routes = {
  HOME: '/',
  LOGIN: 'login',
  LIMITED: 'limited',
  VENDOR_FORM: 'vendorForm',
  VENDOR_CONTRACT: 'vendorContract',
  // Руты с ограниченным доступом
  BASE: '',
  // Закрытые роуты
  ANALITICS: 'analytics',
  PROFILE: 'profile',
  ACCOUNT: 'account',
  CONTRACTS: 'contracts',
  // Комуникации -> дети
  COMMUNICATIONS: 'communications',
  DIARY: 'diary',
  // Каталог -> дети
  CATALOG: 'catalog',
  DOWNLOAD: 'download',
  GOODS: 'goods',
  CONTROL: 'control',
  CHARACTERISTICS: 'characteristics',
  CERTIFICATES: 'certificates',
  IMAGES: 'images',
  DESCRIPTION: 'description',
  TECH_INFO: 'techInfo',
  ANALOG: 'analog',
  CONSTRUCTOR: 'constructor',
  SAME_TYPE: 'sametype',
  // Логистика -> дети
  LOGISTICS: 'logistics',
  INFO: 'info',
  STATUS: 'status',
  TERM: 'term',
  MANAGEMENT: 'management',
  // Проектные работы -> дети
  DESIGN: 'design',
  PROJECTS: 'projects',
  REQUEST: 'request',
  SUBMITTED: 'submitted',
  // Финансы -> дети
  FINANCE: 'finance',
  RECONCILIATION: 'reconciliation',
  SERVICES: 'services',
  FACTORING: 'factoring',
  // Документы
  ORDERS: 'orders',
  // Интеграция:> дети
  INTEGRATION: 'integration',
  APPLICATION: 'application',
  APP_API: 'applicationApi',
  UZEDO: 'uzedo',
  EDI: 'edi',
  EDI_PROJECT: 'ediProject',
  // Ценообразование
  PRICING: 'pricing',
  PURCHASE: 'purchase',
  PRICE_LIST: 'pricelist',
  PL: 'pl',
  DISCOUNT: 'discount',
} as const;

export const DynamicRoutes = {
  TAB_NAME: 'tabName',
  STATUS: 'status',
  UUID: 'uuid',
} as const;

export type CreateSliceRouteType = RouteObject;

export interface IReturnLoader {
  tabs: {
    key: string;
    id: string;
    path: string;
    label: string;
  }[];
}

export type UseLoaderDataType = () => IReturnLoader;
