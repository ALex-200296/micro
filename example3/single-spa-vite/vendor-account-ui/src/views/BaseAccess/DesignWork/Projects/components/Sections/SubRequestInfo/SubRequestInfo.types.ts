import { IProjectDetailsFiles } from '@app/store/project/project.types';

export interface SubRequestInfoProps {
  fileDir?: string;
  files?: IProjectDetailsFiles[];
  compMnf: string;
}
