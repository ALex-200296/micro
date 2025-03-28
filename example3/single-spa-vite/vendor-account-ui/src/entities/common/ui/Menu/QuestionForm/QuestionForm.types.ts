import { FileType } from '@shared/lib';
import { IFormItemProps } from '@shared/ui';

export interface IQuestionFormProps {
  afterSubmit?: () => void;
  message?: string;
}

export interface IQuestionFormState {
  theme: string;
  description: string;
  browser: string;
  email: string;
  files: FileType;
}

export interface IFieldsPropsState {
  theme: Omit<IFormItemProps, 'children'>;
  email: Omit<IFormItemProps, 'children'>;
  browser: Omit<IFormItemProps, 'children'>;
  description: Omit<IFormItemProps, 'children'>;
  files: Omit<IFormItemProps, 'children'>;
}
