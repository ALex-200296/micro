import { IAntdFileListElement } from '@shared/lib';
import { shortTimeDottedFormat } from '@shared/ui';
import { shortYearSlashedFormat } from '@shared/ui/atoms/Inputs/DatePicker/DatePicker.formats';
import dayjs from 'dayjs';

import { findClient } from '../EventForm/EventForm.data';
import { EventKeys, NestedEventKeys } from '../EventForm/EventForm.types';

import { GetInitialValuesForUpdateType } from './EventUpdate.types';

export const btnSubmitName = 'Сохранить изменения';

export const infoSearchClassParams = {
  len: 6,
  lenLim: 6,
  term: 'ВТ99',
};

export const infoSearchClientParams = {
  len: 0,
  lenLim: 0,
};

export const getFilesUploadedAndForUpload = (fileList: IAntdFileListElement[]) =>
  fileList.reduce<{
    uploadFiles: IAntdFileListElement[];
    uploadedFiles: (IAntdFileListElement & { uid?: string })[];
  }>(
    (accum, current) =>
      current.originFileObj
        ? { ...accum, uploadFiles: [...accum.uploadFiles, current] }
        : { ...accum, uploadedFiles: [...accum.uploadedFiles, current] },
    { uploadedFiles: [], uploadFiles: [] },
  );

export const getInitialValuesForUpdate: GetInitialValuesForUpdateType = ({
  obj_id,
  execList,
  pme_task,
  pme_timep,
  pme_datep,
  pme_subtheme,
  pme_endtimep,
  pme_state,
  pme_comdoc,
  codeCli,
  RO_subtheme,
  RO_state,
  usersLkp,
}) => {
  const clientObject = findClient(pme_subtheme) && codeCli.at(-1);
  const responsible = execList.at(-1);
  const exmManCodeSelectedOptions = usersLkp
    .filter((user) => codeCli.find((objCli) => objCli.exm_mancode === user.exm_mancode))
    .map(({ fio, exm_mancode, 'cli-code': cliCode }) => ({ label: fio, value: exm_mancode, cliCode }));
  const fileList = pme_comdoc
    ? pme_comdoc.split(',').map((value) => ({ uid: value, name: value.split('$')[1].replace(/_[a-z\d]+\./gi, '.') }))
    : [];

  return {
    [EventKeys.DATE]: dayjs(pme_datep, shortYearSlashedFormat),
    [EventKeys.RANGE_TIME]: [dayjs(pme_timep, shortTimeDottedFormat), dayjs(pme_endtimep, shortTimeDottedFormat)],
    [EventKeys.SUB_THEME]: { label: RO_subtheme, value: pme_subtheme },
    [EventKeys.PROJECT]: obj_id,
    [EventKeys.CLIENT]: {
      [NestedEventKeys.LABEL]: clientObject?.label || '',
      [NestedEventKeys.VALUE]: clientObject?.code || '',
    },
    [EventKeys.RESPONSIBLE]: {
      [NestedEventKeys.LABEL]: responsible?.labelMan || '',
      [NestedEventKeys.VALUE]: responsible?.codeMan || '',
      classCode: responsible?.codeOP || '',
    },
    [EventKeys.EXM_MAN_CODE]: exmManCodeSelectedOptions,
    [EventKeys.status]: { label: RO_state, value: pme_state },
    [EventKeys.task]: pme_task,
    [EventKeys.FILES]: {
      file: null,
      fileList: fileList,
    },
  };
};
