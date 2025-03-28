import { LoginType } from '@middleware/user/user.types';

export const UserRights = {
  ANALOGI: 'analogi',
  CRS: 'crs',
  IZOBR: 'izobr',
  KONF: 'konf',
  KONS: 'kons',
  NALICH_OP: 'nalichop',
  NALICH_POST: 'nalichpost',
  OTKLUVED: 'otkluved',
  PRO_SM_PR: 'prosmpr',
  PRO_SM_RESH: 'prosmresh',
  PRO_SM_RESH_SPEC: 'prosmreshspec',
  RAB_98: 'rab98',
  TX: 'tx',
  ZAGRM: 'zagrm',
  KONKURSP: 'konkursp',
  SKILLS_ACCESS: 'skillsAccess',
  LPR: 'lpr',
  DOSTUP_LKP: 'dostuplkp',
  DOSTUP_FINRAZD: 'dostupfinrazd',
  CREATE_TASK_ONE_TEAM: 'createtaskoneteam',
  RSE_CODE: 'rse_code',
  LIMITED_ACCESS_ONE_TEAM: 'limitedAccessOneTeam',
  DOSTUP_FAKT_ZAUAV: 'dostupfaktzajav',
  FACTOR_MNF: 'factorMNF',
  CLI_LIST: 'cli_list',
} as const;

export type UserRightsType = typeof UserRights[keyof typeof UserRights]

export const UsersLkpAccess = {
  LEAD: 'Lead',
  HEAD: 'Head',
  JUN: '',
} as const;

export interface IUserManufsState {
  code: string;
  name: string;
}

export type UserRightsStateType = {
  [K in UserRightsType]: string;
};

export interface IUserState {
  city: string;
  login_type: (typeof LoginType)[keyof typeof LoginType] | string;
  login: string;
  org_id: string;
  clicode: string;
  manufs: IUserManufsState[];
  rights?: UserRightsStateType | null;
}

interface ITransportConditions {
  ArrTransportConditions_RC: string;
  ArrTransportConditions_MODULAR: string;
  ArrTransportConditions_LORRY: string;
  ArrTransportConditions_CARCONT: string;
  ArrTransportConditions_ORGANIZER: string;
  ArrTransportConditions_PAYMENT: string;
}

interface IContractInfo {
  SignNetNum: string;
  ContractNumber: string;
  BeginDate: string;
  EndDate: string;
  SigningStatus: string;
  ContractSum: string;
  GrowthOverLastYear: string;
  Prolongation: string;
  BeginingWorkWithEtm: string;
  BaseDelay: string;
  Prepayment: string;
  AdditionalDiscount: string;
  LateDeliveryPenaltyPercent: string;
  LateDeliveryPenaltyUpperLimitRub: string;
  LatePaymentPenaltyPercent: string;
  LatePaymentPenaltyUpperLimitRub: string;
  MarketingSupportStands: string;
  MarketingSupportCatalogs: string;
  MarketingSupportEducation: string;
  MarketingSupportBudget: string;
  PriceRegulationPolicy: string;
  PriceRegulationPolicyPlannedDate: string;
  zItemDeliveryRequirements: string;
  zItemDeliveryRequirePlannedDate: string;
  PriceChangesInformingDeadline: string;
  VendorResponsibilityForCertDelay: string;
  EDO: string;
  EDOPlannedDate: string;
  CargoPalletizing: string;
  CargoPalletizingPlannedDate: string;
  ProductBarcoding: string;
  ProductBarcodingPlannedDate: string;
  TTNRegistration: string;
  PretensionDocumentsForms: string;
  DocumentTemplateFiles: string;
  P6P7Instructions: string;
  AdmissionDeadlinesCargoPlaces: string;
  AdmissionDeadlinesOther: string;
  PowerOfAttorneyFrom: string;
  OwnershipAndRiskTransferConds: string;
  UnloadingTimeLimit: string;
  EurotruckStandardTimePallets: string;
  EurotruckStandardTimeBulk: string;
  EurotruckFinePallets: string;
  EurotruckFineBulk: string;
  TenTonsStandardTimePallets: string;
  TenTonsStandardTimeBulk: string;
  TenTonsFinePallets: string;
  TenTonsFineBulk: string;
  IncludedInPricePallets: string;
  IncludedInPricePalletsPrice: string;
  IncludedInPricePalletsSep: string;
  IncludedInPriceBarrel: string;
  IncludedInPriceBarrelPrice: string;
  IncludedInPriceBarrelSep: string;
  IncludedInPricePackage: string;
  IncludedInPricePackagePrice: string;
  IncludedInPricePackageSep: string;
  ContainerReturnability: string;
  MinimumSum: string;
  MinimumVolume: string;
  TypeOfExportTransport: string;
  PriceDiscount: string;
  PricePolicyAgreement: string;
  MarketingSupport: string;
  ArrDelayExceptions: string[];
  ArrDelayCost: string[];
  ArrBonusCoefficients: string[];
  ArrDeliveryCoefficients: string[];
  ArrDeliveryCoefficientsExcept: string[];
  ArrTransportConditions: ITransportConditions[];
}
export interface IContractsInfo {
  OrgCode: string;
  OrgName: string;
  OrgInn: string;
  OrgKpp: string;
  OrgCkg: string;
  OrgCkgCode: string;
  ContractsVendors: IContractInfo[];
}

export interface IArrManagerState {
  ManagerCode: string;
  ManagerFIO: string;
  ClassCode37: string;
  ManagerMail: string;
}

export interface IUsersLkpState {
  access: keyof typeof UsersLkpAccess | '';
  fio: string;
  id: string;
  exm_mancode: string;
  'cli-code': string;
  [UserRights.PRO_SM_PR]: typeof UserRights.PRO_SM_PR;
  [UserRights.PRO_SM_RESH]: typeof UserRights.PRO_SM_RESH;
}

export interface IUserProfileFirmsState {
  code: string;
  firmname: string;
}
export interface IUserProfile {
  fio: string;
  firstname: string;
  lastname: string;
  parentname: string;
  exw_positionName: string;
  cliName: string;
  phone: string;
  email: string;
  mancode: string;
  ofic: string;
  manager: string;
  ArrManagerKuCp: IArrManagerState[];
  ArrEmployeeIvp: IArrManagerState[];
  ArrManagerKuRc: IArrManagerState[];
  users_lkp: IUsersLkpState[];
  firms: IUserProfileFirmsState[];
}

export interface IContractsPreviewData {
  contractNumber: string;
  dates: string;
  edo: string;
}

export interface IVendorClientInfo {
  id: string;
  clientName: string;
  clientCode: string;
}

export interface IUserInitialState {
  isAuth: boolean;
  error: boolean;
  user: IUserState;
  userProfile: IUserProfile;
  contractsInfo: IContractsInfo;
  clients: IVendorClientInfo[];
}

export interface IUserSetState {
  isAuth: boolean;
  error: boolean;
  user: IUserState;
  userProfile: IUserProfile;
}
