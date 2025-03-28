import React, { memo, useState } from 'react';
import { delay } from '@shared/lib';
import { Button } from '@shared/ui';
import { Flex } from 'antd';

import { dataTestId } from '../VendorContractForm.data';
import { IStepContent } from '../VendorContractForm.types';

import Deferment from './Deferment/Deferment.component';
import Discount from './Discount/Discount.component';

import styles from '../VendorContractForm.module.scss';

const DiscountDeferment: React.FC<IStepContent> = ({ form, initialValues, prevStep, nextStep }) => {
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const onPrevStep = () => {
    prevStep?.();
  };

  const onFinish = async () => {
    try {
      setIsValidating(true);
      await delay(100);
      await form.validateFields().finally(() => {
        setIsValidating(false);
      });
      nextStep?.();
    } catch (error) {
      void error;
    }
  };

  return (
    <div className={styles.container}>
      <Deferment form={form} initialValues={initialValues} />
      <Discount form={form} initialValues={initialValues} />
      <Flex className={styles.fullwidth_element} justify='space-between'>
        <Button dataTestId={`prev-step-${dataTestId}-discount-deferment`} onClick={onPrevStep}>
          Назад
        </Button>
        <Button
          dataTestId={`finish-${dataTestId}-discount-deferment`}
          type='primary'
          htmlType='submit'
          onClick={onFinish}
          loading={isValidating}
        >
          Продолжить
        </Button>
      </Flex>
    </div>
  );
};

export default memo(DiscountDeferment);
