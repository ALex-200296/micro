import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { getJobPriceListsActionType, getPriceListAction } from '@middleware/pricing/pricing.saga';
import { ScreenLock } from '@shared/ui';
import ExtraFileLoadForm from '@views/BaseAccess/components/ExtraFileLoadForm/ExtraFileLoadForm.component';
import { IExtraFileLoadFormInitialValues } from '@views/BaseAccess/components/ExtraFileLoadForm/ExtraFileLoadForm.types';
import { Form } from 'antd';

import { submitButtonText } from './ReportsPriceListsDrawerForm.data';

import styles from './ReportsPriceListsDrawerForm.module.scss';

const ReportsPriceListsDrawerForm: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const isPriceListsLoading = useSelector(uiSelectors.getIsRequestPending(`${getJobPriceListsActionType}`));

  const onSubmit = (values: IExtraFileLoadFormInitialValues) => {
    const { holding, client, allClientsChosen } = values;
    if (client?.length) {
      const choosenClients = allClientsChosen ? holding : client.join(',');
      dispatch(getPriceListAction(choosenClients));
    }
  };

  return (
    <div className={styles.form}>
      {isPriceListsLoading && <ScreenLock />}
      <ExtraFileLoadForm form={form} showSubmitButton submitButtonText={submitButtonText} onFinish={onSubmit} />
    </div>
  );
};

export default memo(ReportsPriceListsDrawerForm);
