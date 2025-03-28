import { RouteObject } from 'react-router-dom';

export const Routes = {
  Home: '/',
  Login: 'login',
  Limited: 'limited',
  VendorForm: 'vendorForm',
  VendorContract: 'vendorContract',
  // Руты с ограниченным доступом
  Base: '',
  // Закрытые роуты
  Analytics: 'analytics',
  Profile: 'profile',
  Account: 'account',
  Contracts: 'contracts',
  // Комуникации -> дети
  Communications: 'communications',
  Diary: 'diary',
  // Каталог -> дети
  Catalog: 'catalog',
  Download: 'download',
  Goods: 'goods',
  Control: 'control',
  Characteristics: 'characteristics',
  Certificates: 'certificates',
  Images: 'images',
  Description: 'description',
  TechInfo: 'techInfo',
  Analog: 'analog',
  Constructor: 'constructor',
  SameType: 'sametype',
  // Логистика -> дети
  Logistics: 'logistics',
  Info: 'info',
  Status: 'status',
  Term: 'term',
  Management: 'management',
  // Проектные работы -> дети
  Design: 'design',
  Projects: 'projects',
  Request: 'request',
  Submitted: 'submitted',
  // Финансы -> дети
  Finance: 'finance',
  Reconciliation: 'reconciliation',
  Services: 'services',
  Factoring: 'factoring',
  // Документы
  Orders: 'orders',
  // Интеграция:> дети
  Integration: 'integration',
  Application: 'application',
  AppApi: 'applicationApi',
  Uzedo: 'uzedo',
  Edi: 'edi',
  EdiProject: 'ediProject',
  // Ценообразование
  Pricing: 'pricing',
  Purchase: 'purchase',
  PriceList: 'pricelist',
  Pl: 'pl',
  Discount: 'discount',
} as const;

export const DynamicRoutes = {
  tabName: 'tabName',
  status: 'status',
  uuid: 'uuid',
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
