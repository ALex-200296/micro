import React, { memo } from 'react';
import { userSelectors } from '@app/store/user/user.selectors';
import { Manuals } from '@features/common/ui';
import { useToggleState } from '@shared/lib';
import { Table, Toolbar } from '@shared/ui';
import { manualsDrawerTitle } from '@views/BaseAccess/BaseAccessPage.data';

import { contractsTableConfig, manualsData } from './Contracts.data';

const Contracts: React.FC = () => {
  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();

  return (
    <>
      <Toolbar>
        <Toolbar.OpenDocumentation
          onClick={handleManualsOpen}
          drawerProps={{
            open: manualsOpen,
            onClose: handleManualsClose,
            title: manualsDrawerTitle,
            children: <Manuals manualsData={manualsData} />,
          }}
        />
      </Toolbar>
      <Table
        columns={contractsTableConfig}
        dataSelector={userSelectors.getContractsPreviewData}
        rowKey='contractNumber'
      />
    </>
  );
};

export default memo(Contracts);
