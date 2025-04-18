import { IResponseFileData, RejectedFilesType } from '@middleware/template/template.types';

import { IReducedFilesResponse } from  '@features/common/lib';

export type AdapterResponsesFilesReturnType = Array<{
  file_name: any;
  msg: any;
}>;

export type AdapterResponsesFilesType = (responses: IResponseFileData[]) => AdapterResponsesFilesReturnType;
export type AdapterForFilesDataType = (responsesData: IReducedFilesResponse[]) => IReducedFilesResponse;
export type AdapterRejectedFilesType = (rejectedFiles: IResponseFileData[]) => RejectedFilesType;
