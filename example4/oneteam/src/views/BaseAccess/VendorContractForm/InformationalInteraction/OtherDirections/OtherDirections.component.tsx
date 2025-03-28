import React, { memo } from 'react';
import { Space } from 'antd';

import { IStepContent, StepKey } from '../../VendorContractForm.types';
import Employees from '../Common/Employees/Employees.component';
import { InformationalInteractionKey } from '../InformationalInteraction.types';

import Supplier from './Supplier/Supplier.component';
import { OtherDirectionsKey } from './OtherDirections.types';

import styles from '../../VendorContractForm.module.scss';

const OtherDirections: React.FC<IStepContent> = (props) => {
  return (
    <Space direction='vertical' className={styles.space_container} size='middle'>
      <Supplier {...props} />
      <Employees
        {...props}
        tableTitle='Сотрудники, ответственные за публикацию материалов через "Инфресурс"'
        pathValues={[
          StepKey.informationalInteraction,
          InformationalInteractionKey.otherDirections,
          OtherDirectionsKey.employees,
        ]}
      />
    </Space>
  );
};

export default memo(OtherDirections);
