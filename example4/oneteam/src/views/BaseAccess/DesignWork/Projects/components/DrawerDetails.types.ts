import { ManInfoProps } from './Sections/ManInfo/ManInfo.types';
import { ProjectsResponseFormProps } from './Sections/ProjectsResponseForm/ProjectsResponseForm.types';
import { RequestInfoProps } from './Sections/RequestInfo/RequestInfo.types';
import { SubRequestInfoProps } from './Sections/SubRequestInfo/SubRequestInfo.types';
import { SupplierResponseProps } from './Sections/SupplierResponse/SupplierResponse.types';

export interface DrawerDetailsProps {
  requestInfo: RequestInfoProps;
  manInfo: ManInfoProps;
  subRequestInfo: SubRequestInfoProps;
  supplierResponse?: SupplierResponseProps;
  projectsResponseForm?: ProjectsResponseFormProps;
}
