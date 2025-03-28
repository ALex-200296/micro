import React, { memo } from 'react';
import { Space } from 'antd';

import { IStepContent, StepKey } from '../../VendorContractForm.types';
import Employees from '../Common/Employees/Employees.component';
import { InformationalInteractionKey } from '../InformationalInteraction.types';

import ProductInfo from './ProductInfo/ProductInfo.component';
import { SuppliersProductsKey } from './SuppliersProducts.types';

import styles from '../../VendorContractForm.module.scss';

const SuppliersProducts: React.FC<IStepContent> = (props) => {
  return (
    <Space direction='vertical' className={styles.space_container} size='middle'>
      <ProductInfo {...props} />
      <Employees
        {...props}
        tableTitle='Сотрудники, ответственные за наполнение каталога'
        pathValues={[
          StepKey.informationalInteraction,
          InformationalInteractionKey.suppliersProducts,
          SuppliersProductsKey.employees,
        ]}
      />
    </Space>
  );
};

export default memo(SuppliersProducts);
