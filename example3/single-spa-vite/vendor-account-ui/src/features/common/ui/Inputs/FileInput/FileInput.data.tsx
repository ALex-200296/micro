import React from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import { fileCheckInMb, getFileFormatFromName, IAntdFileListElement } from '@shared/lib';
import { ShowUploadListInterface, UploadFile } from 'antd/es/upload/interface';

export const className = 'ant-upload-list-item ant-upload-list-item-';
export const status = {
  error: 'error',
  done: 'done',
};

export const defaultShowUploadListConfig: ShowUploadListInterface = {
  removeIcon: <CloseCircleFilled style={{ fontSize: '1.25rem' }} />,
};

export const convertNameFiles = (files: IAntdFileListElement[]): File[] =>
  files.map((file) => new File([file.originFileObj], file.name.replace(/[$]/gi, '_'), { type: file.type }));

const isError = (error: boolean) => (error ? `${className}${status.error}` : '');
const getFileExtensionError = (file: UploadFile, accept?: string) => {
  if (accept) {
    const formatsArray = accept.split('.').join('').split(', ');
    return !formatsArray.includes(getFileFormatFromName(file.name));
  }
  return false;
};

const getFileSizeError = (file: UploadFile, fileSize?: number) => {
  return fileSize ? fileCheckInMb(file, fileSize) : false;
};

export const statusItemRender = (file: UploadFile, accept?: string, fileSize?: number): string => {
  return isError(getFileExtensionError(file, accept) || getFileSizeError(file, fileSize));
};

export const itemRender = (
  originNode: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  file: UploadFile,
  accept?: string,
  fileSize?: number,
) => {
  const status = statusItemRender(file, accept, fileSize);
  return status ? React.cloneElement(originNode, { className: status }) : originNode;
};
