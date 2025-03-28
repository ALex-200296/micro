import { IInfoClientsRows } from '@middleware/info/info.types';
import { IInfoClientListElem, ITreeInfoParams } from '@store/info/info.types';
import { EasyWebWorkerBody } from 'easy-web-worker';

import { IInfoParamsAdapterPayload, InfoClientAdapterType, InfoParamsAdapterType } from './adapterInfo.types';

export const adapterInfoWebWorker: EasyWebWorkerBody = ({ onMessage }) => {

  const adapterInfoParams: InfoParamsAdapterType = ({ items, parentId }) =>
    items
      .filter((item) => item.parent === parentId)
      .map((item) => ({
        ...item,
        children: adapterInfoParams({ items, parentId: item.id }),
      }))
      .map(({ children, ...item }) => (!children.length ? item : { ...item, children }));

  const adapterInfoClient: InfoClientAdapterType = (rows) =>
    rows.map((row) => ({
      clientCode: row['cli-code'] || '',
      clientName: row['cli-name'] || '',
      longName: row['long-name1'] || '',
      subs:
        row?.svyaz?.map((sub) => ({
          clientCode: sub['cli-code'] || '',
          clientName: sub['cli-name'] || '',
          isActive: sub.isActive || false,
          inn: sub.inn || '',
          suppCustomer: sub['supp-cust'] || '',
        })) || [],
    }));

  onMessage<IInfoParamsAdapterPayload, ITreeInfoParams[]>('infoParams', (message) => {
    const { payload } = message;
    const adaptedInfo = adapterInfoParams(payload);
    message.resolve(adaptedInfo);
  });

  onMessage<IInfoClientsRows[], IInfoClientListElem[]>('infoClient', (message) => {
    const { payload } = message;
    const adaptedInfoClient = adapterInfoClient(payload);
    message.resolve(adaptedInfoClient);
  });
};
