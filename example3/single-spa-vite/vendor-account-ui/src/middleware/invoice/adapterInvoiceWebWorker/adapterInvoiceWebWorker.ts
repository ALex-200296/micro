import {
  AdapterInvoiceBoxesReturnType,
  IResponseInvoice,
  IResponseInvoiceBody,
  IResponseInvoiceBoxes,
  IReturnAdapterInvoice,
  IReturnAdapterInvoiceBody,
  IReturnAdapterInvoices,
} from '@middleware/invoice/invoice.types';
import { EasyWebWorkerBody } from 'easy-web-worker';

import {
  AdapterInvoiceBodyType,
  AdapterInvoiceBoxesType,
  AdapterInvoicesType,
  AdapterInvoiceType,
  IAdapterInvoicesPayload,
} from './adapterInvoice.types';

export const adapterInvoiceWebWorker: EasyWebWorkerBody = ({ onMessage }) => {
  const InvoiceOperations = {
    MERCH_ACCEPT: 'merchAccept',
    MERCH_REJECT: 'merchReject',
    MERCH_SHIPMENT: 'merchShipment',
    MERCH_SPLIT: 'merchSplit',
    MERCH_1C: 'merch1C',
    PRINT_ACT: 'printAct',
    DOWNLOAD_UPD: 'downloadUPD',
    UPDATE_CDK: 'updateCDK',
    LABEL_PRINT: 'labelPrint',
    MERCH_KDK: 'merchKdk',
    MERCH_PRINT_LABEL: 'merchPrintlabel',
    MERCH_SHIP_KDK: 'merchShipkdk',
  } as const;

  const createId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

  const adapterInvoice: AdapterInvoiceType = (invoice) => {
    const { gruz_pol, st_adress } = invoice;
    const consignee = {
      bik: gruz_pol[0]?.gruz_pol_bik || '',
      inn: gruz_pol[0]?.gruz_pol_inn || '',
      kpp: gruz_pol[0]?.gruz_pol_kpp || '',
      name: gruz_pol[0]?.gruz_pol_name || '',
      bank: gruz_pol[0]?.gruz_pol_bank || '',
      polGln: gruz_pol[0]?.gruz_pol_gln || '',
      address: gruz_pol[0]?.gruz_pol_address || '',
      korschet: gruz_pol[0]?.gruz_pol_korschet || '',
      rasschet: gruz_pol[0]?.gruz_pol_rasschet || '',
      st_adress: gruz_pol[0]?.gruz_pol_st_adress || '',
    };

    return { consignee, logisticCenter: st_adress };
  };

  const adapterInvoices: AdapterInvoicesType = ({ rows, records }) => ({
    dataList: rows.map(({ id, usr_inv_num, inv_date, status_name, summa, status_code, operations }) => {
      return {
        id,
        sum: summa,
        date: inv_date,
        orderNum: usr_inv_num,
        statusName: status_name,
        statusCode: status_code,
        operations: {
          [InvoiceOperations.MERCH_1C]: true,
          [InvoiceOperations.PRINT_ACT]: true,
          [InvoiceOperations.UPDATE_CDK]: true,
          [InvoiceOperations.LABEL_PRINT]: true,
          [InvoiceOperations.DOWNLOAD_UPD]: true,
          [InvoiceOperations.MERCH_SPLIT]: Boolean(operations.split),
          [InvoiceOperations.MERCH_KDK]: Boolean(operations.merch_kdk),
          [InvoiceOperations.MERCH_ACCEPT]: Boolean(operations.merch_accept),
          [InvoiceOperations.MERCH_REJECT]: Boolean(operations.merch_reject),
          [InvoiceOperations.MERCH_SHIPMENT]: Boolean(operations.merch_ship),
          [InvoiceOperations.MERCH_SHIP_KDK]: Boolean(operations.merch_shipkdk),
          [InvoiceOperations.MERCH_PRINT_LABEL]: Boolean(operations.merch_printlabel),
        },
      };
    }),
    records: records,
  });

  const adapterInvoiceBody: AdapterInvoiceBodyType = (invoices) =>
    invoices.map(
      ({
        id,
        cnt,
        sum,
        price,
        manuf,
        weight,
        volume,
        gdscode,
        gdsname,
        linenum,
        comment,
        measure,
        article,
        cli_code,
        dateotgr,
        datepost,
        merchdate,
        rejection_value,
      }) => ({
        id,
        sum,
        price,
        volume,
        weight,
        article,
        lineNum: linenum,
        productCount: cnt,
        rowId: createId(),
        manufacturer: manuf,
        productName: gdsname,
        productCode: gdscode,
        comment: comment || '',
        measure: measure || '',
        deliveryTime: dateotgr,
        supplierDate: merchdate,
        clientProductCode: cli_code,
        requiredDeliveryDate: datepost,
        rejectionReason: rejection_value,
      }),
    );

  const adapterInvoiceBoxes: AdapterInvoiceBoxesType = (boxes) =>
    boxes.reduce<AdapterInvoiceBoxesReturnType>((prev, { boxId, goods }) => {
      prev[boxId] = adapterInvoiceBody(goods);
      return prev;
    }, {});

  onMessage<IResponseInvoice, IReturnAdapterInvoice>('invoice', (message) => {
    const { payload } = message;
    const adaptedInvoice = adapterInvoice(payload);
    message.resolve(adaptedInvoice);
  });

  onMessage<IAdapterInvoicesPayload, IReturnAdapterInvoices>('invoices', (message) => {
    const { payload } = message;
    const adaptedInvoices = adapterInvoices(payload);
    message.resolve(adaptedInvoices);
  });

  onMessage<IResponseInvoiceBody[], IReturnAdapterInvoiceBody[]>('invoiceBody', (message) => {
    const { payload } = message;
    const adaptedInvoiceBody = adapterInvoiceBody(payload);
    message.resolve(adaptedInvoiceBody);
  });

  onMessage<IResponseInvoiceBoxes[], AdapterInvoiceBoxesReturnType>('invoiceBoxes', (message) => {
    const { payload } = message;
    const adaptedInvoiceBoxesInfo = adapterInvoiceBoxes(payload);
    message.resolve(adaptedInvoiceBoxesInfo);
  });
};
