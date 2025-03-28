import { RejectedFilesType } from '@middleware/template/template.types';

export interface ITemplateState {
  rejectedFiles: RejectedFilesType;
  total: number;
}
