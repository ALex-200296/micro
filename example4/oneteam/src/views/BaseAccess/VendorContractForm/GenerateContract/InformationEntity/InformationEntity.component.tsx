import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { userSelectors } from '@app/store/user/user.selectors';
import { infoSearchAction } from '@middleware/info/info.saga';
import { FormItem } from '@shared/ui';
import { Flex, Input, Select, Space } from 'antd';

import { informationEntityFieldsProps } from './InformationEntity.data';
import { InformationEntityKey } from './InformationEntity.types';

import styles from '../../VendorContractForm.module.scss';

const InformationEntity: React.FC = () => {
  const dispatch = useDispatch();
  const managmentOptions = useSelector(infoSelectors.getInfoSearch(TypeInfoSearch.co_table, CodeInfoSearch.managment));
  const { OrgKpp, OrgInn } = useSelector(userSelectors.getUserCompanyInfo);

  useEffect(() => {
    if (!managmentOptions.length)
      dispatch(
        infoSearchAction({
          type: TypeInfoSearch.co_table,
          code: CodeInfoSearch.managment,
        }),
      );
  }, []);

  return (
    <Space direction='vertical' className={styles.space_container} size='middle'>
      <Flex justify='space-between' gap='small'>
        <FormItem {...informationEntityFieldsProps[InformationEntityKey.managment]}>
          <Select options={managmentOptions} />
        </FormItem>
        <FormItem {...informationEntityFieldsProps[InformationEntityKey.ogrn]}>
          <Input />
        </FormItem>
      </Flex>
      <Flex justify='space-between' gap='small'>
        <FormItem {...informationEntityFieldsProps[InformationEntityKey.orgName]}>
          <Input />
        </FormItem>
        <FormItem {...informationEntityFieldsProps[InformationEntityKey.inn]}>
          <Input readOnly={!!OrgInn} />
        </FormItem>
        <FormItem {...informationEntityFieldsProps[InformationEntityKey.kpp]}>
          <Input readOnly={!!OrgKpp} />
        </FormItem>
      </Flex>
    </Space>
  );
};

export default memo(InformationEntity);
