import React, { memo } from 'react';
import { DatePicker,disabledPastDate, FormItem } from '@shared/ui';
import { dataTestId } from '@views/BaseAccess/VendorContractForm/VendorContractForm.data';
import { Form } from 'antd';

import { IStepContent } from '../../../VendorContractForm.types';
import { OtherDirectionsKey } from '../OtherDirections.types';

import { fieldsProps } from './Supplier.data';

import styles from '../../../VendorContractForm.module.scss';

const Supplier: React.FC<IStepContent> = ({ form, initialValues }) => {
  return (
    <Form form={form} initialValues={initialValues} preserve className={styles.half_width}>
      <FormItem {...fieldsProps[OtherDirectionsKey.supplierStartDate]}>
        <DatePicker disabledDate={disabledPastDate} dataTestId={dataTestId} />
      </FormItem>
    </Form>
  );
};

export default memo(Supplier);
