import React, { memo, useState } from 'react';
import { delay } from '@shared/lib';
import { Button } from '@shared/ui';
import { Divider, Flex, Form, Typography } from 'antd';

import { dataTestId } from '../VendorContractForm.data';
import { IStepContent } from '../VendorContractForm.types';

import Agreement from './Agreement/Agreement.component';
import BankDetails from './BankDetails/BankDetails.component';
import InformationEntity from './InformationEntity/InformationEntity.component';

import styles from '../VendorContractForm.module.scss';

const { Title } = Typography;

const GenerateContract: React.FC<IStepContent> = ({ form, initialValues, nextStep, prevStep }) => {
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
    <Form form={form} initialValues={initialValues} preserve className={styles.form}>
      <Divider orientation='left'>
        <Title level={2}>Данные о юридическом лице</Title>
      </Divider>
      <InformationEntity />
      <Divider orientation='left'>
        <Title level={2}>Данные для генерации договора</Title>
      </Divider>
      <Agreement />
      <Divider orientation='left'>
        <Title level={2}>Банковские реквизиты</Title>
      </Divider>
      <BankDetails />
      <Flex className={styles.fullwidth_element} justify='space-between'>
        <Button dataTestId={`prev-step-${dataTestId}-generate-contract`} onClick={onPrevStep}>
          Назад
        </Button>
        <Button
          dataTestId={`finish-${dataTestId}-generate-contract`}
          type='primary'
          onClick={onFinish}
          loading={isValidating}
        >
          Продолжить
        </Button>
      </Flex>
    </Form>
  );
};

export default memo(GenerateContract);
