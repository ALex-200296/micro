import { api, safe } from '@middleware/root.data';
import { createAction } from '@reduxjs/toolkit';
import { http } from '@shared/lib/services';;
import { setNotification } from '@app/store/ui/ui.slice';
import { formDataGenerator } from '@shared/lib/utils/helpers/formDataGenerator.helpers';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { getMailContent, toMail } from './mail.data';
import { IPostMailSendActionState, IPostMailSendSagaState, IResponsePostHelpMail } from './mail.types';

function* mailSendSaga({ payload }: IPostMailSendSagaState) {
  const {
    files,
    subject,
    target_mail = toMail,
    content,
    url,
    onSuccessMessage = 'Ваше письмо успешно отправлено',
  } = payload;
  const message = getMailContent(files, url, content);
  const formData = formDataGenerator([
    ['target_mail', target_mail],
    ['subject', subject],
    ['content', message],
  ]);
  const response: AxiosResponse<IResponsePostHelpMail> = yield call(() =>
    http().post<IResponsePostHelpMail>(`${api}/mail/send`, formData),
  );
  yield put(setNotification({ code: response?.data.status.code, message: { title: onSuccessMessage } }));
}

export const mailSendAction = createAction<IPostMailSendActionState>('mail/send');

export function* mailSaga() {
  yield takeEvery(mailSendAction.type, safe(mailSendSaga));
}
