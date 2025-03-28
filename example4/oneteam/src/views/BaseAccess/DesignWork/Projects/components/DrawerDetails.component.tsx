import React, { memo } from 'react';

import ManInfo from './Sections/ManInfo/ManInfo.component';
import ProjectsResponseForm from './Sections/ProjectsResponseForm/ProjectsResponseForm.component';
import RequestInfo from './Sections/RequestInfo/RequestInfo.component';
import SubRequestInfo from './Sections/SubRequestInfo/SubRequestInfo.component';
import SupplierResponse from './Sections/SupplierResponse/SupplierResponse.component';
import { DrawerDetailsProps } from './DrawerDetails.types';

const DrawerDetails: React.FC<DrawerDetailsProps> = ({
  requestInfo,
  manInfo,
  subRequestInfo,
  supplierResponse,
  projectsResponseForm,
}) => {
  return (
    <>
      <RequestInfo {...requestInfo} />
      <ManInfo {...manInfo} />
      <SubRequestInfo {...subRequestInfo} />
      {!!supplierResponse && <SupplierResponse {...supplierResponse} />}
      {!!projectsResponseForm && <ProjectsResponseForm {...projectsResponseForm} />}
    </>
  );
};

export default memo(DrawerDetails);
