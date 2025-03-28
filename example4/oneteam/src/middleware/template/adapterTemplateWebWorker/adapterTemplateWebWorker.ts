import { IResponseFileData, RejectedFilesType } from '@middleware/template/template.types';
import { EasyWebWorkerBody } from 'easy-web-worker';

import {  IReducedFilesResponse } from  '@features/common/lib';
import {
  AdapterForFilesDataType,
  AdapterRejectedFilesType,
  AdapterResponsesFilesReturnType,
  AdapterResponsesFilesType,
} from './adapterTemplate.types';

export const adapterTemplateWebWorker: EasyWebWorkerBody = ({ onMessage }) => {
  const adapterResponsesFiles: AdapterResponsesFilesType = (responses) =>
    responses.map((file) => ({
      file_name: file?.data?.file_name,
      msg: file?.data?.source_name || '',
    }));

  const adapterRejectedFiles: AdapterRejectedFilesType = (rejectedFiles) => {
    return rejectedFiles.reduce((acc: RejectedFilesType, file: IResponseFileData) => {
      const {
        data,
        status: { error_code, message },
      } = file;
      acc[error_code]
        ? (acc[error_code] = { message: acc[error_code].message, files: [...acc[error_code].files, { ...data }] })
        : (acc[error_code] = { message, files: [data] });
      return acc;
    }, {});
  };

  const adapterForFilesData: AdapterForFilesDataType = (responsesData) =>
    responsesData.reduce(
      (acc, current) => ({
        rejectedFiles: [...acc.rejectedFiles, ...current.rejectedFiles],
        fulfilledFiles: [...acc.fulfilledFiles, ...current.fulfilledFiles],
      }),
      {
        rejectedFiles: [],
        fulfilledFiles: [],
      },
    );

  onMessage<IResponseFileData[], AdapterResponsesFilesReturnType>('responsesFiles', (message) => {
    const { payload } = message;
    const adaptedFileData = adapterResponsesFiles(payload);
    message.resolve(adaptedFileData);
  });

  onMessage<IResponseFileData[], RejectedFilesType>('rejectedFiles', (message) => {
    const { payload } = message;
    const rejectedFileData = adapterRejectedFiles(payload);
    message.resolve(rejectedFileData);
  });

  onMessage<IReducedFilesResponse[], IReducedFilesResponse>('filesData', (message) => {
    const { payload } = message;
    const adaptedFilesData = adapterForFilesData(payload);
    message.resolve(adaptedFilesData);
  });
};
