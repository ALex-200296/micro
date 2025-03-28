import { IFilesWithNumState } from '@features/common/ui';
import { IReportsFilesData, IResponseGetFile, IResponseGetJobUuid, IUuidData } from '@middleware/reports/reports.types';
import { IResponseFile } from '@middleware/template/template.types';

export interface AdapterReportsFilesReturnType {
  records: number;
  data: IReportsFilesData[];
}

export interface IGetTaskParamsPayload {
  files: IFilesWithNumState[];
  oneRequest?: boolean;
  pExtParam?: string;
}

export type GetTaskParamsReturnType = Array<{
  [k: string]: any;
}>;

export type AdapterReportsFilesType = (data: IResponseGetFile['data']) => AdapterReportsFilesReturnType;
export type AdapterJobUuidType = (response: IResponseGetJobUuid['data']) => IUuidData;
export type GetTaskParamsType = (payload: IGetTaskParamsPayload) => GetTaskParamsReturnType;
export type GetUuidBodyType = (files: IResponseFile[]) => string
