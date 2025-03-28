export { intervalWebWorker } from './workers/intervalWebWorker/intervalWebWorker';
export type { IMessage, IWorkerContext } from './workers/intervalWebWorker/intervalWebWorker.types';
export { uploadWebWorker } from './workers/uploadWebWorker/uploadWebWorker';
export type {
  GetFileChunksResolveType,
  IFileWithNumID,
  IGetFileChunksPayload,
  IReducedFilesResponse,
  ISendFormDataPayload,
  IUploadWebWorkerPrimitiveParameters,
  SplitFilesFuncType,
} from './workers/uploadWebWorker/uploadWebWorker.types';
