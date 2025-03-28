import React, { memo } from 'react';
import { Button, FormItem } from '@shared/ui';
import { Form, Radio } from 'antd';
import cn from 'classnames';

import { dataTestId } from '../VendorContractForm.data';
import { IStepContent, StepKey } from '../VendorContractForm.types';

import { pathwiseFieldsProps, radioData } from './Pathwise.data';
import { PathwiseKey } from './Pathwise.types';

import styles from '../VendorContractForm.module.scss';

const Pathwise: React.FC<IStepContent> = ({ form, initialValues, nextStep }) => {
  const onFinish = async () => {
    try {
      await form.validateFields();
      const radio = form.getFieldValue([StepKey.pathwise, PathwiseKey.radio]);
      nextStep?.(radio === 'Да' ? 4 : 1);
    } catch (error) {
      void error;
    }
  };

  return (
    <Form form={form} initialValues={initialValues} preserve className={cn(styles.form, styles.space_container)}>
      <FormItem {...pathwiseFieldsProps.radio}>
        <Radio.Group className={styles.radio_group}>
          {radioData.map(({ label, value }) => (
            <Radio key={value} value={value}>
              {label}
            </Radio>
          ))}
        </Radio.Group>
      </FormItem>
      <Button dataTestId={`${dataTestId}-pathwise`} type='primary' onClick={onFinish}>
        Продолжить
      </Button>
    </Form>
  );
};

export default memo(Pathwise);
