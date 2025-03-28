import { FileType } from '@shared/lib';
import { IFormItemProps } from '@shared/ui';

export interface IInitialValuesState {
  email: string;
  description: string;
  files: FileType;
}

export interface IFieldsPropsState {
  email: Omit<IFormItemProps, 'children'>;
  description: Omit<IFormItemProps, 'children'>;
  files: Omit<IFormItemProps, 'children'>;
}

export interface IGetAccessModalProps {
  afterSubmit?: () => void;
  message?: string;
}
