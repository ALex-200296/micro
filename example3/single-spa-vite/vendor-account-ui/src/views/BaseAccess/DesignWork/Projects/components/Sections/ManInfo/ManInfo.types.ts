import { ICliRole } from '@app/store/project/project.types';

export interface ManInfoProps {
  clients: ICliRole[];
  requestType: string;
  author?: ICliRole;
}
