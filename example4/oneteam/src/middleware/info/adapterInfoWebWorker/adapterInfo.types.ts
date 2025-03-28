import { IInfoClientsRows } from '@middleware/info/info.types';
import { IInfoClientListElem, ITreeInfoParams } from '@store/info/info.types';

export interface IInfoParamsAdapterPayload {
  items: ITreeInfoParams[];
  parentId?: string;
}

export type InfoClientAdapterType = (rows: IInfoClientsRows[]) => IInfoClientListElem[];
export type InfoParamsAdapterType = (payload: IInfoParamsAdapterPayload) => ITreeInfoParams[];
