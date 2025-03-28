import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { getReportsFilesAction, postTaskAction } from '@middleware/reports/reports.saga';
import { postTemplateAction } from '@middleware/template/template.saga';
import { useWebWorkerInterval } from '@shared/lib/hooks/useWebWorkers/useWebWorkerInterval/useWebWorkerInterval.hook';
import { createNumberId } from '@shared/lib/utils/helpers/number.helpers';
import { msDelayWorkerInterval } from '@views/BaseAccess/BaseAccessPage.data';

import { getNumForFiles } from '../../../ui/Form/FileLoadForm/FileLoadForm.data';
import { IFileLoadInitialValuesState } from '../../../ui/Form/FileLoadForm/FileLoadForm.types';
import { convertNameFiles } from '../../../ui/Inputs/FileInput/FileInput.data';

import { IUseConstructReportsPage } from './useConstructReportsPage.types';

export const useConstructReportsPage = ({
  sliceName,
  computedProperty,
  dataSelector,
  type,
  resetFilters,
  setUpdate,
  templateProps,
  postTaskProps,
  resourceUploadProps,
  getExtraTaskParams,
}: IUseConstructReportsPage) => {
  const dispatch = useDispatch();
  const { runInterval, stopInterval } = useWebWorkerInterval(msDelayWorkerInterval);

  const {
    page,
    rows,
    sidx,
    sortDate,
    sortStatus,
    filters: { status, date },
    update,
    loadedData: { records },
  } = useSelector(dataSelector);

  const isLoading = useSelector(uiSelectors.getIsRequestPending(`${sliceName}/${computedProperty}`));

  const getReportsFiles = useCallback(() => {
    dispatch(
      getReportsFilesAction({
        page,
        rows,
        sidx,
        sortDate,
        sortStatus,
        status,
        date: date ? date : '',
        type,
        sliceName,
        computedProperty,
      }),
    );
  }, [date, page, rows, sidx, sortDate, sortStatus, status, update]);

  useEffect(() => {
    getReportsFiles();
    runInterval(getReportsFiles);
  }, [getReportsFiles]);

  useEffect(
    () => () => {
      dispatch(resetFilters());
      stopInterval();
    },
    [],
  );

  const onFinishResourceUploadForm = useCallback(
    (values: IFileLoadInitialValuesState) => {
      const {
        files: { fileList },
      } = values;
      const codeNotification = createNumberId();
      const convertedFileList = convertNameFiles(fileList);
      if (resourceUploadProps) {
        dispatch(postTemplateAction({ ...resourceUploadProps.params, files: convertedFileList, codeNotification }));
        resourceUploadProps.handleClose();
      }
    },
    [resourceUploadProps],
  );

  const onFinishTemplateForm = useCallback(
    (values: IFileLoadInitialValuesState) => {
      const {
        files: { fileList },
      } = values;
      const convertedFilelist = convertNameFiles(fileList);
      const numForFiles = getNumForFiles(fileList);
      const codeNotification = createNumberId();
      if (templateProps)
        dispatch(
          postTemplateAction({ ...templateProps.params, files: convertedFilelist, num: numForFiles, codeNotification }),
        );
      dispatch(
        postTaskAction({
          nameFile: numForFiles,
          type,
          codeNotification,
          ...getExtraTaskParams?.(values),
          actions: [
            {
              ...resetFilters(),
            },
            {
              ...setUpdate(),
            },
          ],
          ...postTaskProps,
        }),
      );
      templateProps?.handleClose();
    },
    [templateProps],
  );

  return {
    sliceData: {
      date,
      records,
      update,
      page,
      rows,
      sidx,
      status,
      sortDate,
      sortStatus,
    },
    isLoading,
    onFinishTemplateForm,
    onFinishResourceUploadForm,
  };
};
