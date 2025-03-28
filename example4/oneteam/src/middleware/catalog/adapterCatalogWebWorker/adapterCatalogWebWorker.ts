import {
  IAdaptedGoodsFilesData,
  IConfigChars,
  IGoodsFilesData,
  IGoodsListItem,
  IRSupplierResponse,
} from '@middleware/catalog/catalog.types';
import { ICatalogState, ICatalogTableItems } from '@store/catalog/catalog.types';
import { EasyWebWorkerBody } from 'easy-web-worker';

import {
  AdapterCatalogConfigCharsType,
  AdapterUnpublishedGoodsType,
  GoodsListAdapterType,
  IFilesDataStateAdapterType,
} from './adapterCatalog.types';

export const adapterCatalogWebWorker: EasyWebWorkerBody = ({ onMessage }) => {
  
  const adapterFilesDataState: IFilesDataStateAdapterType = ({ page = 1, records = 0, rows = [] }) => ({
    page,
    records,
    rows: rows.map((fileDataItem) => ({
      date: fileDataItem?.obf_credate || '',
      file: { name: fileDataItem?.obf_name || '', url: fileDataItem.url || '' },
    })),
  });

  const adapterGoodsList: GoodsListAdapterType = (rows) => {
    return rows.map((row) => {
      const {
        id = '',
        isIndex = false,
        image = '',
        name = '',
        gdsExtArt = '',
        mnf_ser = '',
        gdsSubBrand = '',
        edizm = '',
        gdscode = '',
        config = '',
        labelConfig = '',
      } = row;
      return {
        id,
        isIndex,
        image,
        name,
        gdsExtArt,
        mnfSer: mnf_ser,
        gdsSubBrand,
        edizm,
        gdsCode: gdscode,
        config,
        labelConfig,
      };
    });
  };

  const adapterCatalogConfigChars: AdapterCatalogConfigCharsType = (data) =>
    data.reduce<ICatalogState['configChars']>((acc, item) => {
      const options = item.ConfigCharContent.map((option) => ({
        value: option.ConfigCharIdVal,
        label: option.ConfigCharVal,
      }));

      acc[item.ConfigCharCode] = {
        name: item.ConfigCharName,
        options: [...(acc?.[item.ConfigCharCode]?.options || []), ...options],
      };
      return acc;
    }, {});

  const adapterUnpublishedGoods: AdapterUnpublishedGoodsType = (items) =>
    items.map((item) => ({
      obfId: item.obf_id || '',
      name: item.obf_name || '',
      fileName: item.obf_file || '',
      date: item.obf_credate || '',
      fileUrl: item.url || '',
    }));

  onMessage<IGoodsFilesData, IRSupplierResponse>('filesData', (message) => {
    const { payload } = message;
    const adaptedFilesData = adapterFilesDataState(payload);
    message.resolve(adaptedFilesData);
  });

  onMessage<IGoodsListItem[], ICatalogTableItems[]>('goodsListAdapter', (message) => {
    const { payload } = message;
    const adaptedFilesData = adapterGoodsList(payload);
    message.resolve(adaptedFilesData);
  });

  onMessage<IConfigChars[], ICatalogState['configChars']>('configChars', (message) => {
    const { payload } = message;
    const adaptedConfig = adapterCatalogConfigChars(payload);
    message.resolve(adaptedConfig);
  });

  onMessage<IGoodsFilesData, IAdaptedGoodsFilesData>('unpublishedGoods', (message) => {
    const { payload } = message;
    const adaptedData: IAdaptedGoodsFilesData = { ...payload, rows: adapterUnpublishedGoods(payload.rows) };
    message.resolve(adaptedData);
  });
};
