import React, { memo } from 'react';
import { Space } from 'antd';

import { IStepContent, StepKey } from '../../VendorContractForm.types';
import Employees from '../Common/Employees/Employees.component';
import { InformationalInteractionKey } from '../InformationalInteraction.types';

import UzedoTerm from './UzedoTerm/UzedoTerm.component';
import { UzedoKey } from './Uzedo.types';

import styles from '../../VendorContractForm.module.scss';

const Uzedo: React.FC<IStepContent> = (props) => {
  return (
    <Space direction='vertical' className={styles.space_container} size='middle'>
      <UzedoTerm {...props} />
      <Employees
        {...props}
        tableTitle='Сотрудники, ответственные за ЮЗЭДО'
        pathValues={[StepKey.informationalInteraction, InformationalInteractionKey.uzedo, UzedoKey.employees]}
      />
    </Space>
  );
};

export default memo(Uzedo);
