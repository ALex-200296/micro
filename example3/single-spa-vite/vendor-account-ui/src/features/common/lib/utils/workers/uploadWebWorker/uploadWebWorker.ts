import { IResponseFileData, IResponsePostTemplate } from '@middleware/template/template.types';
import { EasyWebWorkerBody } from 'easy-web-worker';

import {
  GetFileChunksResolveType,
  IFileWithNumID,
  IGetFileChunksPayload,
  IReducedFilesResponse,
  ISendFormDataPayload,
  IUploadWebWorkerPrimitiveParameters,
  SplitFilesFuncType,
} from './uploadWebWorker.types';

export const uploadWebWorker: EasyWebWorkerBody = ({ onMessage }, context) => {
  const errorRegexp = /[4|5|6]\d{2}/;
  const getFileNameForTemplate = (file: File) => file!.name.split('.').slice(0, -1).join('.');

  const formDataGenerator = (params: [string, any][]) => {
    const formData = new FormData();
    params.forEach((item) => item[1] && formData.set(item[0], item[1]));
    return formData;
  };

  const splitToNChunks: SplitFilesFuncType = (filesArray, groupsNum) => {
    const result = [];
    const copyArray = [...filesArray];
    for (let i = groupsNum; i > 0; i--) {
      result.push(copyArray.splice(0, Math.ceil(copyArray.length / i)));
    }
    return result;
  };

  const getResponseFiles = (responses: IResponsePostTemplate[]): IReducedFilesResponse => {
    return responses.reduce(
      (acc: { rejectedFiles: IResponseFileData[]; fulfilledFiles: IResponseFileData[] }, file) => ({
        rejectedFiles: [...acc.rejectedFiles, ...(file.reason ? [file.reason] : [])],
        fulfilledFiles: [...acc.fulfilledFiles, ...(file.value ? [file.value] : [])],
      }),
      { rejectedFiles: [], fulfilledFiles: [] },
    );
  };

  onMessage<ISendFormDataPayload, Array<IReducedFilesResponse>>('sendFormData', async (message) => {
    const { chunkedFiles, rc, man } = message.payload;
    const { origin, apiAddress } = context.primitiveParameters[0] as IUploadWebWorkerPrimitiveParameters;
    const formData: Array<Array<FormData>> = chunkedFiles.map((filesGroup) =>
      filesGroup.map(({ numId, file }: IFileWithNumID) =>
        formDataGenerator([
          ['rc', rc],
          ['man', man],
          ['fileToUpload', file],
          ['num', numId ? numId.numId : getFileNameForTemplate(file)],
        ]),
      ),
    );

    const url = new URL(apiAddress, origin);
    const formDataIterator = formData[Symbol.iterator]();
    const response: Array<IReducedFilesResponse> = [];

    while (formDataIterator) {
      const { value, done } = formDataIterator.next();
      if (done) break;
      const res = await Promise.allSettled(
        value.map((file: FormData) =>
          fetch(url, {
            method: 'post',
            body: file,
          })
            .then((res) => res.json())
            .then((res) => {
              return errorRegexp.test(res.status.code)
                ? Promise.reject({ data: res.data, status: res.status })
                : Promise.resolve({ data: res.data, status: res.status });
            })
            .catch((error) => {
              return Promise.reject(error);
            }),
        ),
      );
      const result = getResponseFiles(res);
      response.push(result);
    }
    message.resolve(response);
  });

  onMessage<IGetFileChunksPayload, GetFileChunksResolveType>('getFilesChunks', (message) => {
    const { files, num } = message.payload;
    const filesWithNumId = files.map((file, index) => ({
      file,
      numId: num?.[index],
    }));
    const chunkedFiles = splitToNChunks(filesWithNumId, 4);
    message.resolve(chunkedFiles);
  });
};
