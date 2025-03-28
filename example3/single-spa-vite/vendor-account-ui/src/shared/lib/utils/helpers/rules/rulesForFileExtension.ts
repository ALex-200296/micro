import { FileType } from '@shared/lib';
import { RuleObject } from 'antd/es/form';
import { UploadFile } from 'antd/es/upload/interface';

export const getFileFormatFromName = (fileName: string) => fileName.toLowerCase().split('.').at(-1) || '';

export const ruleForFileExtension = (_: RuleObject, files: FileType, formats: string, errorMessage: string) => {
  if (files && files.fileList.length) {
    const formatsArray = formats.split('.').join('').split(', ');
    const hasJunkFormats = !!files.fileList.find((file) => !formatsArray.includes(getFileFormatFromName(file.name)));
    return hasJunkFormats ? Promise.reject(new Error(errorMessage)) : Promise.resolve();
  }
  return Promise.resolve();
};
export const fileCheckInMb = (file: File | UploadFile, fileSizeMb = 100) => Number(file?.size) / 1048576 > fileSizeMb;

const hasLargeFilesInMb = (files: FileType, fileSizeMb = 100): boolean =>
  Boolean(files.fileList.find((file) => fileCheckInMb(file, fileSizeMb)));

export const ruleForFileSize = (
  _: RuleObject,
  files: FileType,
  fileSizeMb = 100,
  errorMessage = 'Максимальный размер файла превышен, удалите его и загрузите файл размером не более',
) =>
  hasLargeFilesInMb(files, fileSizeMb)
    ? Promise.reject(new Error(errorMessage + ` ${fileSizeMb} Мб`))
    : Promise.resolve();
