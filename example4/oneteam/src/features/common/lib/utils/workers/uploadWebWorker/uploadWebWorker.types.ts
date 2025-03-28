import { IFilesWithNumState } from '@features/common/ui';
import { IResponseFileData } from '@middleware/template/template.types';

export interface IFileWithNumID {
  file: File;
  numId?: IFilesWithNumState;
}

export type GetFileChunksResolveType  = Array<IFileWithNumID[]>;
export interface IGetFileChunksPayload {
  num?: IFilesWithNumState[];
  files: File[];
}

export interface ISendFormDataPayload {
  chunkedFiles: GetFileChunksResolveType;
  rc: string;
  man?: string;
}

export interface IReducedFilesResponse {
  rejectedFiles: IResponseFileData[];
  fulfilledFiles: IResponseFileData[];
}

export interface IUploadWebWorkerPrimitiveParameters {
  apiAddress: string;
  origin: string;
}

export type SplitFilesFuncType<T = IFileWithNumID> = (filesArray: Array<T>, groupsNum: number) => Array<T[]>
