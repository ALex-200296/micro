import React, { memo } from 'react';
import { FormItem } from '@shared/ui';
import { Form, Radio, Segmented, Space, Typography } from 'antd';

import {
  contractPreviewDocs,
  contractPreviewFieldProps,
  contractPreviewOptions,
  signTheContractOptions,
} from './VendorFormSections.data';

import styles from '../VendorForm.module.scss';
const ContractPreview: React.FC = () => {
  const form = Form.useFormInstance();
  const typeOfContract: string = Form.useWatch('typeOfContract', form);
  return (
    <Space direction='vertical' size='middle' className={styles.space_container}>
      <FormItem {...contractPreviewFieldProps.typeOfContract}>
        <Segmented options={contractPreviewOptions} />
      </FormItem>
      <Space wrap={true} direction='vertical'>
        {contractPreviewDocs[typeOfContract]?.map(({ name, href }, index) => (
          <Typography.Link key={index + 'docsLink'} href={href} target='_blank'>
            {name}
          </Typography.Link>
        ))}
      </Space>
      <FormItem {...contractPreviewFieldProps.signTheContract}>
        <Radio.Group>
          <Space direction='vertical'>
            {signTheContractOptions.map((option) => (
              <Radio value={option} key={`signTheContract${option[0]}`}>
                {option}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </FormItem>
    </Space>
  );
};

export default memo(ContractPreview);
