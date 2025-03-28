import { IFilesWithNumState } from '@features/common/ui';
import { api, safe } from '@middleware/root.data';
import { createAction } from '@reduxjs/toolkit';
import { http } from '@shared/lib/services';;
import { setRejectedFiles } from '@app/store/template/template.slice';
import { addPendingRequestId, removePendingRequestId, setNotification } from '@app/store/ui/ui.slice';
import { uploadWebWorker } from '@features/common/lib/utils/workers/uploadWebWorker/uploadWebWorker';
import { GetFileChunksResolveType, IReducedFilesResponse } from '@features/common/lib';
import { paramsGenerator } from '@shared/lib/utils/helpers/paramsGenerator.helpers';
import { isFunction } from '@shared/lib/utils/helpers/typeGuards/isFunction';
import { AxiosResponse } from 'axios';
import { createEasyWebWorker } from 'easy-web-worker';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { AdapterResponsesFilesReturnType } from './adapterTemplateWebWorker/adapterTemplate.types';
import { adapterTemplateWebWorker } from './adapterTemplateWebWorker/adapterTemplateWebWorker';
import {
  IPostCreatePdfActionState,
  IPostCreatePdfSagaState,
  IPostTemplateActionState,
  IPostTemplateSagaState,
  IResponsePostCreatePdf,
  RejectedFilesType,
} from './template.types';

export const postTemplateActionType = 'template/file/upload';
export const postCreatePdfActionType = 'template/create/pdf';

const worker = createEasyWebWorker(uploadWebWorker, {
  maxWorkers: 2,
  primitiveParameters: [
    {
      apiAddress: `${api}/file/upload`,
      origin: window.location.origin,
    },
  ],
});

const adapterWebWorker = createEasyWebWorker(adapterTemplateWebWorker);

const sendChunkedFiles = async (chunkedFiles: GetFileChunksResolveType, rc: string, man?: string) =>
  await worker.sendToMethod('sendFormData', { chunkedFiles, rc, man });

const getChunkedFilesFormData = async (
  files: File[],
  rc: string,
  man?: string,
  num?: IFilesWithNumState[],
): Promise<GetFileChunksResolveType> => await worker.sendToMethod('getFilesChunks', { files, num });

export function* templatePostSaga({ payload }: IPostTemplateSagaState) {
  const { files, man, rc, num, actions, codeNotification: code, callActionsWithRejected = true } = payload;
  yield put(addPendingRequestId(postTemplateActionType));

  const chunkedFiles: GetFileChunksResolveType = yield call(() => getChunkedFilesFormData(files, rc, man, num));
  const responses: IReducedFilesResponse[] = yield call(() => sendChunkedFiles(chunkedFiles, rc, man));

  if (responses) {
    const { fulfilledFiles, rejectedFiles } = yield adapterWebWorker.sendToMethod('filesData', responses);

    const adapteedFulfilledFiles: AdapterResponsesFilesReturnType = yield adapterWebWorker.sendToMethod(
      'responsesFiles',
      fulfilledFiles,
    );

    if (rejectedFiles.length) {
      const adaptedRejectedFiles: RejectedFilesType = yield adapterWebWorker.sendToMethod(
        'rejectedFiles',
        rejectedFiles,
      );
      yield put(
        setRejectedFiles({
          rejectedFiles: adaptedRejectedFiles,
          total: rejectedFiles.length + fulfilledFiles.length,
        }),
      );
    } else {
      const callActions = (rejectedFiles.length && callActionsWithRejected) || !rejectedFiles.length;
      if (actions && callActions) {
        yield all([
          ...actions.map((action) =>
            isFunction(action)
              ? action(adapteedFulfilledFiles)
              : put({
                  type: action.type,
                  payload: {
                    ...action.payload,
                    files: adapteedFulfilledFiles,
                  },
                }),
          ),
        ]);
      }
      yield put(
        setNotification({
          code,
          variant: 'success',
          message: { title: 'Данные успешно загружены' },
          noDublicate: true,
        }),
      );
    }

    yield put(removePendingRequestId(postTemplateActionType));

    return { rejectedFiles, fulfilledFiles, fileLinks: adapteedFulfilledFiles };
  }
}

export function* createPdfSaga({ payload }: IPostCreatePdfSagaState) {
  const { body, xsl, copyTo, copyXml, action } = payload;
  const params = paramsGenerator([
    ['xsl', xsl],
    ['copyto', copyTo],
    ['copyxml', copyXml],
  ]);
  yield put(addPendingRequestId(postCreatePdfActionType));
  const response: AxiosResponse<IResponsePostCreatePdf> = yield call(() =>
    http().post<IResponsePostCreatePdf>(`${api}/fop/pdf/create`, body, { params }),
  );
  if (response?.data?.data) {
    yield action?.(response.data.data);
  }
  yield put(removePendingRequestId(postCreatePdfActionType));
}

export const postTemplateAction = createAction<IPostTemplateActionState>(postTemplateActionType);
export const postCreatePdfAction = createAction<IPostCreatePdfActionState>(postCreatePdfActionType);

export function* templateSaga() {
  yield takeEvery(postTemplateAction.type, safe(templatePostSaga));
  yield takeEvery(postCreatePdfAction.type, safe(createPdfSaga));
}
