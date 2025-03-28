import React, { memo } from 'react';
import { Space } from 'antd';

import { IStepContent, StepKey } from '../../VendorContractForm.types';
import Employees from '../Common/Employees/Employees.component';
import { InformationalInteractionKey } from '../InformationalInteraction.types';

import ListMessages from './ListMessages/ListMessages.component';
import { ElectronicExchangeKey } from './ElectronicExchange.types';

import styles from '../../VendorContractForm.module.scss';

const ElectronicExchange: React.FC<IStepContent> = (props) => {
  return (
    <Space direction='vertical' className={styles.space_container} size='middle'>
      <ListMessages {...props} />
      <Employees
        {...props}
        tableTitle='Сотрудники, ответственные за EDI-обмен'
        pathValues={[
          StepKey.informationalInteraction,
          InformationalInteractionKey.electronicExchange,
          ElectronicExchangeKey.employees,
        ]}
      />
    </Space>
  );
};

export default memo(ElectronicExchange);
