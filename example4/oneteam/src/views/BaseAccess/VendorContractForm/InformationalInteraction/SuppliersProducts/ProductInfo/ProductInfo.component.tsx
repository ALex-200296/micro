import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { EditableConst, Table } from '@shared/ui';
import { Typography } from 'antd';

import { IStepContent } from '../../../VendorContractForm.types';

import { getDataSource, getProductInfoColumns, productInfoInitialValues } from './ProductInfo.data';

const { Title } = Typography;

const ProductInfo: React.FC<IStepContent> = ({ form, initialValues }) => {
  const goodsTransitionWay = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.co_table, CodeInfoSearch.goods_transition_way),
  );

  const dataSource = useMemo(() => getDataSource(productInfoInitialValues), []);

  const columns = useMemo(() => getProductInfoColumns(goodsTransitionWay), [goodsTransitionWay]);

  return (
    <Table.Editable
      formInstance={form}
      dataSelector={() => dataSource}
      initialValues={initialValues}
      columns={columns}
      bordered
      preserve
      rowKey='id'
      editingConfig={{ tableIsEditable: true }}
      editableEntity={EditableConst.table}
      title={() => <Title level={3}>Наполнение информации о товарах</Title>}
    />
  );
};

export default memo(ProductInfo);
