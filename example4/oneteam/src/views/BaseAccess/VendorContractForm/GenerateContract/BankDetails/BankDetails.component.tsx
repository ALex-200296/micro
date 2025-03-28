import React, { memo } from 'react';
import { FormItem } from '@shared/ui';
import { Flex, Input, Space } from 'antd';

import { bankDetailsFieldsProps } from './BankDetails.data';
import { BankDetailsKey } from './BankDetails.types';

import styles from '../../VendorContractForm.module.scss';

const BankDetails: React.FC = () => {
  return (
    <Space direction='vertical' className={styles.space_container} size='middle'>
      <Flex justify='space-between' gap='small'>
        <FormItem {...bankDetailsFieldsProps[BankDetailsKey.bik]}>
          <Input />
        </FormItem>
        <FormItem {...bankDetailsFieldsProps[BankDetailsKey.nameBank]}>
          <Input />
        </FormItem>
      </Flex>
      <Flex justify='space-between' gap='small'>
        <FormItem {...bankDetailsFieldsProps[BankDetailsKey.correspondentAccount]}>
          <Input />
        </FormItem>
        <FormItem {...bankDetailsFieldsProps[BankDetailsKey.currentAccount]}>
          <Input />
        </FormItem>
      </Flex>
    </Space>
  );
};

export default memo(BankDetails);
