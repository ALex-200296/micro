import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoClass, CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { userSelectors } from '@app/store/user/user.selectors';
import { filterOption, FormItem } from '@shared/ui';
import { Input, Select, Space } from 'antd';

import { commonInfoFieldsProps } from './VendorFormSections.data';

import styles from '../VendorForm.module.scss';

const CommonInfo: React.FC = () => {
  const categoryOptions = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.CO_TABLE, CodeInfoSearch.TYPE_MERCHANT),
  );
  const goodsCategory = useSelector(infoSelectors.getInfoClass(CodeInfoClass.CODE_81));
  const { OrgKpp, OrgInn } = useSelector(userSelectors.getUserCompanyInfo);
  return (
    <Space direction='vertical' className={styles.space_container} size='middle'>
      <FormItem {...commonInfoFieldsProps.orgName}>
        <Input />
      </FormItem>
      <FormItem {...commonInfoFieldsProps.inn}>
        <Input disabled={!!OrgInn} />
      </FormItem>
      <FormItem {...commonInfoFieldsProps.kpp}>
        <Input disabled={!!OrgKpp} />
      </FormItem>
      <FormItem {...commonInfoFieldsProps.orgCategory}>
        <Select options={categoryOptions} />
      </FormItem>
      <FormItem {...commonInfoFieldsProps.goodsCategory}>
        <Select
          mode='multiple'
          options={goodsCategory}
          fieldNames={{ value: 'title', label: 'title' }}
          allowClear
          showSearch
          filterOption={(input, option) => filterOption(input, option, 'title')}
        />
      </FormItem>
      <FormItem {...commonInfoFieldsProps.goodsExtraCategory}>
        <Input />
      </FormItem>
      <FormItem {...commonInfoFieldsProps.brands}>
        <Input />
      </FormItem>
      <FormItem {...commonInfoFieldsProps.orgSite}>
        <Input />
      </FormItem>
      <FormItem {...commonInfoFieldsProps.orgCatalogLink}>
        <Input />
      </FormItem>
    </Space>
  );
};

export default memo(CommonInfo);
