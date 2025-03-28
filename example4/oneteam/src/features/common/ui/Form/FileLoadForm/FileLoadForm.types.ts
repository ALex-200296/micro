import React from 'react';
import { IFileInputProps } from '@features/common/ui';
import { FileType } from '@shared/lib';
import { IFormItemProps, ITemplateFileAwareProps } from '@shared/ui';
import { FormInstance } from 'antd';
import { Rule } from 'antd/es/form';

export interface IDescriptionsProps {
  title: string;
  text: { label: string; name: string }[];
}

export interface IFileLoadInitialValuesState {
  files: FileType;
}

export interface IFieldsPropsState {
  files: Omit<IFormItemProps, 'children' | 'rules'>;
}

export interface IFileLoadFormProps extends Pick<IFileInputProps, 'multiple' | 'accept' | 'uploadHint' | 'maxCount'> {
  onFinish: (values: IFileLoadInitialValuesState) => void;
  subtitle?: string;
  template?: ITemplateFileAwareProps;
  descriptions?: IDescriptionsProps[];
  rules?: Rule[];
  message?: string;
  fileSizeAccept?: number;
  colon?: boolean;
  extraForm?: (form: FormInstance) => React.ReactElement;
}
export interface IFilesWithNumState {
  parentName: string;
  numId: string;
  attach?: string;
  extension: string;
}
