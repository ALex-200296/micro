import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from '@app/store/user/user.selectors';
import { Manuals } from '@features/common/ui';
import { useToggleState } from '@shared/lib';
import { Table, Toolbar } from '@shared/ui';
import { manualsDrawerTitle } from '@views/BaseAccess/BaseAccessPage.data';
import { Descriptions, Divider } from 'antd';

import AccessTable from './AccessTable/AccessTable.component';
import {
  accountColumsConfig,
  accountLabel,
  companyInfoLabel,
  getAccountInfoConfig,
  getCompanyInfoConfig,
  getCompanySubInfoConfig,
  manualsData,
} from './AccountControl.data';

import styles from './AccountControl.module.scss';

const AccountControl: React.FC = () => {
  const { fio, email, phone } = useSelector(userSelectors.getUserProfile);
  const hasAccess = useSelector(userSelectors.getUserLkpAccess);
  const { OrgName, OrgCode, OrgKpp, OrgInn } = useSelector(userSelectors.getUserCompanyInfo);
  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();

  const accountItems = useMemo(() => getAccountInfoConfig(fio, phone, email), [fio, phone, email]);
  const companySubInfoItems = useMemo(() => getCompanySubInfoConfig(OrgKpp, OrgInn), [OrgKpp, OrgInn]);
  const companyInfoItems = useMemo(() => getCompanyInfoConfig(OrgName, OrgCode), [OrgName, OrgCode]);

  return (
    <>
      <Toolbar>
        <Toolbar.OpenDocumentation
          onClick={handleManualsOpen}
          drawerProps={{
            open: manualsOpen,
            onClose: handleManualsClose,
            title: manualsDrawerTitle,
            children: <Manuals manualsData={manualsData} showManufacturerInfo />,
          }}
        />
      </Toolbar>
      <Descriptions title={accountLabel} column={2} items={accountItems} />
      <Divider />
      <Descriptions title={companyInfoLabel} column={2} items={companyInfoItems} />
      <Table
        className={styles.table}
        dataSelector={userSelectors.getManufacturerData}
        columns={accountColumsConfig}
        rowKey='code'
      />
      <Divider />
      <Descriptions column={1} items={companySubInfoItems} />
      <Divider />
      {hasAccess && <AccessTable />}
    </>
  );
};

export default memo(AccountControl);
