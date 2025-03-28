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
  const managmentOptions = useSelector(infoSelectors.getInfoSearch(TypeInfoSearch.CO_TABLE, CodeInfoSearch.MANAGMENT));
  const { OrgKpp, OrgInn } = useSelector(userSelectors.getUserCompanyInfo);

  useEffect(() => {
    if (!managmentOptions.length)
      dispatch(
        infoSearchAction({
          type: TypeInfoSearch.CO_TABLE,
          code: CodeInfoSearch.MANAGMENT,
        }),
      );
  }, []);

  return (
    <Space direction='vertical' className={styles.space_container} size='middle'>
      <Flex justify='space-between' gap='small'>
        <FormItem {...informationEntityFieldsProps[InformationEntityKey.MANAGMENT]}>
          <Select options={managmentOptions} />
        </FormItem>
        <FormItem {...informationEntityFieldsProps[InformationEntityKey.OGRN]}>
          <Input />
        </FormItem>
      </Flex>
      <Flex justify='space-between' gap='small'>
        <FormItem {...informationEntityFieldsProps[InformationEntityKey.ORG_NAME]}>
          <Input />
        </FormItem>
        <FormItem {...informationEntityFieldsProps[InformationEntityKey.INN]}>
          <Input readOnly={!!OrgInn} />
        </FormItem>
        <FormItem {...informationEntityFieldsProps[InformationEntityKey.KPP]}>
          <Input readOnly={!!OrgKpp} />
        </FormItem>
      </Flex>
    </Space>
  );
};

export default memo(InformationEntity);
