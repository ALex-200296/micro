import { lazy } from 'react';
export { default as LandingPage } from '@views/Landing/LandingPage.component';

export const LoginPage = lazy(() => import('@views/Login/LoginPage.component'));
export const RulesGuard = lazy(() => import('./guards/RulesGuard.guard'));
export const VendorFormPage = lazy(() => import('@views/BaseAccess/VendorForm/VendorForm.component'));
export const VendorContractFormPage = lazy(
  () => import('@views/BaseAccess/VendorContractForm/VendorContractForm.component'),
);
export const BaseAccessPage = lazy(() => import('@views/BaseAccess/BaseAccessPage.component'));
export const FactoringPage = lazy(() => import('@views/Factoring/FactoringPage.component'));
export const FactoringForm = lazy(() => import('@views/Factoring/Form/FactoringForm.component'));
export const CommonPage = lazy(() => import('@views/BaseAccess/CommonPage/CommonPage.component'));
export const RedirectFromParent = lazy(
  () => import('@entities/common/ui/RedirectFromParent/RedirectFromParent.component'),
);
export const CatalogPage = lazy(() => import('@views/BaseAccess/Catalog/CatalogPage.component'));
export const DownloadPage = lazy(() => import('@views/BaseAccess/Catalog/Download/Download.component'));
export const GoodsPage = lazy(() => import('@views/BaseAccess/Catalog/Goods/Goods.component'));
export const ControlPage = lazy(() => import('@views/BaseAccess/Catalog/Control/ControlPage.component'));
export const Characteristics = lazy(
  () => import('@views/BaseAccess/Catalog/Control/Characteristics/Characteristics.component'),
);
export const Certificates = lazy(() => import('@views/BaseAccess/Catalog/Control/Certificates/Certificates.component'));
export const Images = lazy(() => import('@views/BaseAccess/Catalog/Control/Images/Images.component'));
export const Description = lazy(() => import('@views/BaseAccess/Catalog/Control/Description/Description.component'));
export const TechInfo = lazy(() => import('@views/BaseAccess/Catalog/Control/TechInfo/TechInfo.component'));
export const Analog = lazy(() => import('@views/BaseAccess/Catalog/Control/Analog/Analog.component'));
export const Constructor = lazy(() => import('@views/BaseAccess/Catalog/Control/Constructor/Constructor.component'));
export const SameType = lazy(() => import('@views/BaseAccess/Catalog/Control/SameType/SameType.component'));
export const ProfilePage = lazy(() => import('@views/BaseAccess/Profile/ProfilePage.component'));
export const AccountControl = lazy(() => import('@views/BaseAccess/Profile/AccountControl/AccountControl.component'));
export const Contracts = lazy(() => import('@views/BaseAccess/Profile/Contracts/Contracts.component'));
export const AnalyticsPage = lazy(() => import('@views/BaseAccess/Analytics/AnalyticsPage.component'));
export const CommunicationsPage = lazy(() => import('@views/BaseAccess/Communications/CommunicationsPage.component'));
export const DiaryPage = lazy(() => import('@views/BaseAccess/Communications/Diary/DiaryPage.component'));
export const LogisticsPage = lazy(() => import('@views/BaseAccess/Logistics/LogisticsPage.component'));
export const InfoPage = lazy(() => import('@views/BaseAccess/Logistics/Info/InfoPage.component'));
export const GoodsStatus = lazy(() => import('@views/BaseAccess/Logistics/Info/GoodsStatus/GoodsStatus.component'));
export const Timelines = lazy(() => import('@views/BaseAccess/Logistics/Info/Timelines/Timelines.component'));
export const ManagementPage = lazy(() => import('@views/BaseAccess/Logistics/Management/Management.component'));
export const DesignWorkPage = lazy(() => import('@views/BaseAccess/DesignWork/DesignWorkPage.component'));
export const ProjectsPage = lazy(() => import('@views/BaseAccess/DesignWork/Projects/Projects.component'));
export const ProjectInquiries = lazy(
  () => import('@views/BaseAccess/DesignWork/Projects/ProjectInquiries/ProjectInquiries.component'),
);
export const SubmittedProjects = lazy(
  () => import('@views/BaseAccess/DesignWork/Projects/SubmittedProjects/SubmittedProjects.component'),
);
export const Orders = lazy(() => import('@views/BaseAccess/Orders/Orders.component'));
export const FinancePage = lazy(() => import('@views/BaseAccess/Finance/FinancePage.component'));
export const Reconciliation = lazy(() => import('@views/BaseAccess/Finance/Reconciliation/Reconciliation.component'));
export const Services = lazy(() => import('@views/BaseAccess/Finance/Services/Services.component'));
export const FinanceFactoring = lazy(() => import('@views/BaseAccess/Finance/Factoring/Factoring.component'));
export const IntegrationPage = lazy(() => import('@views/BaseAccess/Integration/IntegrationPage.component'));
export const Application = lazy(() => import('@views/BaseAccess/Integration/Application/Application.component'));
export const Edi = lazy(() => import('@views/BaseAccess/Integration/Application/Edi/Edi.component'));
export const Uzedo = lazy(() => import('@views/BaseAccess/Integration/Application/Uzedo/Uzedo.component'));
export const EdiProject = lazy(
  () => import('@views/BaseAccess/Integration/Application/EdiProject/EdiProject.component'),
);
export const AppApi = lazy(() => import('@views/BaseAccess/Integration/AppApi/AppApi.component'));
export const PricingPage = lazy(() => import('@views/BaseAccess/Pricing/PricingPage.component'));
export const PurchasePage = lazy(() => import('@views/BaseAccess/Pricing/Purchase/PurchasePage.component'));
export const PriceListsPage = lazy(() => import('@views/BaseAccess/Pricing/PriceLists/PriceListsPage.component'));
export const PriceLists = lazy(() => import('@views/BaseAccess/Pricing/PriceLists/PriceLists/PriceLists.component'));
export const Discounts = lazy(() => import('@views/BaseAccess/Pricing/PriceLists/Discounts/Discounts.component'));
