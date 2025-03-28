import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateFinanceClientAct } from '@middleware/finance/finance.saga';
import { Button, DateRangePicker, FormItem, reversedDashedFormat } from '@shared/ui';
import { Form } from 'antd';
import dayjs from 'dayjs';

import { dataTestId, initialValues, reconciliationCreateFormItemProps } from './ReconciliationCreateForm.data';
import { IInitialValues, IReconciliationCreateFormProps } from './ReconciliationCreateForm.types';

import styles from './ReconciliationCreateForm.module.scss';

const ReconciliationCreateForm: React.FC<IReconciliationCreateFormProps> = ({
  organizationCode,
  startDate,
  endDate,
  afterSubmit,
}) => {
  const dispatch = useDispatch();

  const createReconciliationAct = useCallback(
    (values: IInitialValues) => {
      const { dateRange } = values;
      dispatch(
        updateFinanceClientAct({
          post: {
            organizationCode,
            startDate: dayjs(dateRange[0]).format(reversedDashedFormat),
            endDate: dayjs(dateRange[1]).format(reversedDashedFormat),
          },
          get: {
            organizationCode,
            startDate: dayjs(startDate).format(reversedDashedFormat),
            endDate: dayjs(endDate).format(reversedDashedFormat),
          },
        }),
      );
      afterSubmit?.();
    },
    [organizationCode, startDate, endDate],
  );

  return (
    <Form initialValues={initialValues} onFinish={createReconciliationAct} className={styles.form}>
      <FormItem {...reconciliationCreateFormItemProps.dateRange}>
        <DateRangePicker dataTestId={dataTestId} />
      </FormItem>
      <FormItem>
        <Button dataTestId={dataTestId} type='primary' htmlType='submit'>
          Сформировать акт сверки
        </Button>
      </FormItem>
    </Form>
  );
};

export default memo(ReconciliationCreateForm);
