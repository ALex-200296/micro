import React, { memo } from 'react';
import { replacingCommaWithDot } from '@shared/lib';
import { FormItem } from '@shared/ui';
import { Form, InputNumber } from 'antd';
import cn from 'classnames';

import { IStepContent } from '../../VendorContractForm.types';

import { defermentFieldsProps } from './Deferment.data';
import { DefermentKey } from './Deferment.types';

import styles from '../../VendorContractForm.module.scss';

const Deferment: React.FC<IStepContent> = ({ form, initialValues }) => (
  <Form form={form} initialValues={initialValues} preserve className={cn(styles.space_container, styles.content)}>
    <FormItem {...defermentFieldsProps[DefermentKey.DEFERMENT]}>
      <InputNumber controls={false} className={styles.half_width} parser={replacingCommaWithDot} />
    </FormItem>
  </Form>
);

export default memo(Deferment);
