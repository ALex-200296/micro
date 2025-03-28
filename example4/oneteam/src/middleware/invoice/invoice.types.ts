import { financeSliceName } from '@app/store/finance/finance.slice';
import { InfoParamsGroup } from '@app/store/info/info.types';
import { ordersSliceName } from '@app/store/orders/orders.slice';
import { OrderRowListsType } from '@app/store/orders/orders.types';
import { IResponse } from '@middleware/root.types';
import { AxiosResponse } from 'axios';

export const invoiceOperations = {
  merchAccept: 'merchAccept',
  merchReject: 'merchReject',
  merchShipment: 'merchShipment',
  merchSplit: 'merchSplit',
  merch1C: 'merch1C',
  printAct: 'printAct',
  downloadUPD: 'downloadUPD',
  updateCDK: 'updateCDK',
  labelPrint: 'labelPrint',
  merchKdk: 'merchKdk',
  merchPrintlabel: 'merchPrintlabel',
  merchShipkdk: 'merchShipkdk',
} as const;
export const InvoiceProcedure = {
  [invoiceOperations.merchAccept]: '40105512',
  [invoiceOperations.merchReject]: '40105511',
  [invoiceOperations.merchShipment]: '40105510',
  [invoiceOperations.merchSplit]: '40109121',
  [invoiceOperations.merch1C]: '40108035',
  [invoiceOperations.printAct]: '40048481',
  [invoiceOperations.downloadUPD]: '40048118',
  [invoiceOperations.updateCDK]: '40109047',
  [invoiceOperations.labelPrint]: '20048003',
  [invoiceOperations.merchKdk]: '',
  [invoiceOperations.merchPrintlabel]: '',
  [invoiceOperations.merchShipkdk]: '40105614',
} as const;

export interface IReturnAdapterRowsInvoices {
  id: string;
  date: string;
  statusName: string;
  sum: string;
  orderNum: string;
  statusCode: string;
  operations: Record<keyof typeof invoiceOperations, boolean>;
}

export interface IReturnAdapterInvoices {
  dataList: IReturnAdapterRowsInvoices[];
  records: number;
}

export type AdapterInvoiceBoxesReturnType = Record<string, IReturnAdapterInvoiceBody[]>

export interface IInvoiceConsignee {
  name: string;
  address: string;
  inn: string;
  kpp: string;
  bank: string;
  rasschet: string;
  korschet: string;
  bik: string;
  polGln: string;
  st_adress: string;
}

export interface IReturnAdapterInvoice {
  consignee: IInvoiceConsignee;
  logisticCenter: string;
}

export interface IReturnAdapterInvoiceBody {
  lineNum: number;
  rowId: string;
  id: string;
  productCode: string;
  clientProductCode: string;
  productName: string;
  manufacturer: string;
  article: string;
  productCount: number;
  price: string;
  sum: string;
  deliveryTime: string;
  requiredDeliveryDate: string;
  supplierDate: string;
  rejectionReason: string;
  comment: string;
  measure: string;
}

export interface IGetInvoicesAction {
  sliceName: typeof ordersSliceName | typeof financeSliceName;
  startDate: string;
  endDate: string;
  status?: string;
  sidx: string;
  sord: string;
  orderCode?: string;
  page?: number;
  rows?: number;
  type?: string;
  group?: (typeof InfoParamsGroup)[keyof typeof InfoParamsGroup];
}

export interface IGetInvoiceAction {
  sliceName: typeof ordersSliceName;
  id: string;
}

export interface IGetInvoiceBodyAction {
  sliceName: typeof ordersSliceName;
  id: string;
}

export interface IGetInvoiceBoxesAction {
  id: string;
}

interface IInvoiceProcedureAccept {
  supplierDate: OrderRowListsType['supplierDate'];
}
interface IInvoiceProcedureReject extends Partial<IInvoiceProcedureAccept> {
  rejectionReason: OrderRowListsType['rejectionReason'];
  comment: OrderRowListsType['comment'];
}

export interface IInvoiceBodyParams {
  [InvoiceProcedure.merchAccept]: Record<string, IInvoiceProcedureAccept>;
  [InvoiceProcedure.merchReject]: Record<string, IInvoiceProcedureReject>;
  [InvoiceProcedure.merchSplit]: Record<string, boolean>;
  [InvoiceProcedure.updateCDK]: Record<string, number | string>[];
}

export interface IPostInvoiceAction {
  id: string;
  proc: (typeof InvoiceProcedure)[keyof typeof InvoiceProcedure];
  body: unknown;
  datalist?: OrderRowListsType[];
  email?: string;
  action?: (response: AxiosResponse<Blob | IResponsePrintSaga>) => void;
}

export interface IUpdateInvoiceBodyAction {
  post: IPostInvoiceAction;
  getInvoice?: IGetInvoiceBodyAction;
  getInvoices?: IGetInvoicesAction;
  action?: () => void;
}

export interface IGetInvoicesSaga {
  payload: IGetInvoicesAction;
  type: string;
}

export interface IGetInvoiceSaga {
  payload: IGetInvoiceAction;
  type: string;
}

export interface IGetInvoiceBodySaga {
  payload: IGetInvoiceBodyAction;
  type: string;
}

export interface IPostInvoiceSaga {
  payload: IPostInvoiceAction;
  type: string;
}

export interface IPrintInvoiceSaga {
  payload: Pick<IPostInvoiceAction, 'id' | 'proc' | 'action'>;
  type: string;
}

export interface IUpdateInvoiceBodySaga {
  payload: IUpdateInvoiceBodyAction;
  type: string;
}

export interface IGetInvoiceBoxesSaga {
  payload: IGetInvoiceBoxesAction;
  type: string;
}

export interface IResponseInvoices {
  id: string;
  usr_inv_num: string;
  inv_date: string;
  status_name: string;
  summa: string;
  status_code: string;
  operations: {
    merch_accept?: boolean;
    merch_reject?: boolean;
    merch_ship?: boolean;
    split?: boolean;
    merch_kdk?: boolean;
    merch_printlabel?: boolean;
    merch_shipkdk?: boolean;
  };
}
interface ICargoRecipient {
  gruz_pol_name: string;
  gruz_pol_address: string;
  gruz_pol_inn: string;
  gruz_pol_kpp: string;
  gruz_pol_bank: string;
  gruz_pol_rasschet: string;
  gruz_pol_korschet: string;
  gruz_pol_bik: string;
  gruz_pol_gln: string;
  gruz_pol_st_adress: string;
}
interface IInvoiceEmail {
  email: string;
  name: string;
}
export interface IResponseInvoice {
  gruz_pol: ICargoRecipient[];
  emails: IInvoiceEmail[];
  invCondFact: string;
  invContract: string;
  invDelivery: string;
  invFirm: string;
  invFirmCode: string;
  invGdTypeCode: string;
  invInvDate: string;
  invNetNum: string;
  invPays: string;
  invStatus: string;
  invStatusPay: string;
  invStoreSum: string;
  invTimecre: string;
  invTimemod: string;
  invUsrInvNum: string;
  invWhencre: string;
  invWhenmod: string;
  invWhomcre: string;
  invWhommod: string;
  invWriteInvDate: string;
  inviPro: string;
  msg: string;
  operations: string;
  st_adress: string;
  st_code: string;
  st_res_code: string;
  st_res_name: string;
}

export interface IResponseInvoiceBody {
  id: string;
  gdscode: string;
  gdsname: string;
  comment: string;
  manuf: string;
  article: string;
  cnt: number;
  price: string;
  sum: string;
  dateotgr: string;
  datepost: string;
  merchdate: string;
  rejection_value: string;
  volume: string;
  weight: string;
  cli_code: string;
  measure: string;
  linenum: number;
}

export interface IResponseInvoiceBoxes {
  boxId: string;
  boxNumber: number;
  goods: IResponseInvoiceBody[];
}

interface IPrintSagaResponseData {
  FileName: string;
  InvoiceRowId: string;
  change: string;
  csv: string;
  doctype: string;
  emailfrom: string;
  img: string;
  js: string;
  login_type: string;
  mailbody: string;
  mailsubj: string;
  noStamp: string;
  syf_prog: string;
  xls: string;
  url?: string;
}

export interface IResponseGetInvoice extends IResponse, IResponseInvoice {}

interface IInvoiceOperations {
  bill: boolean;
  copy: boolean;
  merch_ship: boolean;
  split: boolean;
}
export interface IResponseGetInvoiceBody extends IResponse {
  data: {
    rows: IResponseInvoiceBody[];
    volume: string;
    weight: string;
    ClientType: string;
    addr_city_desc: string;
    bonus: string;
    checkurl: string;
    cli_class71: string;
    cli_code: number;
    cli_name: string;
    discount: number;
    invStatus: string;
    invdate: string;
    invnetnum: string;
    invnum: string;
    invsum: number;
    nds: number;
    paysum: number;
    pmo_address: string;
    pro_id: string;
    pro_name: string;
    records: number;
    signRowid: string;
    store: number;
    operations: IInvoiceOperations;
  };
}

export interface IResponseGetInvoiceBoxes extends IResponse {
  invnum: string;
  invnetnum: string;
  invdate: string;
  invsum: string;
  boxes: IResponseInvoiceBoxes[];
}
export interface IResponseGetInvoices extends IResponse {
  data: {
    rows: IResponseInvoices[];
    records: number;
  };
}

export interface IResponsePostInvoice extends IResponse {
  status: {
    code: number;
    message: string;
  };
}

export interface IResponsePrintSaga extends IResponse {
  data: IPrintSagaResponseData;
}
