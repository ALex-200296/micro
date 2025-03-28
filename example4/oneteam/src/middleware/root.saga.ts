import { all, fork } from 'redux-saga/effects';

import { calendarSaga } from './calendar/calendar.saga';
import { catalogSaga } from './catalog/catalog.saga';
import { clientSaga } from './client/client.saga';
import { financeSaga } from './finance/finance.saga';
import { infoSaga } from './info/info.saga';
import { invoicesSaga } from './invoice/invoice.saga';
import { mailSaga } from './mail/mail.saga';
import { pricingSaga } from './pricing/pricing.saga';
import { projectSaga } from './project/project.saga';
import { reportsSaga } from './reports/reports.saga';
import { templateSaga } from './template/template.saga';
import { userSaga } from './user/user.saga';

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(mailSaga),
    fork(infoSaga),
    fork(financeSaga),
    fork(projectSaga),
    fork(reportsSaga),
    fork(catalogSaga),
    fork(calendarSaga),
    fork(templateSaga),
    fork(invoicesSaga),
    fork(clientSaga),
    fork(pricingSaga),
  ]);
}
