import { createId } from '@shared/lib';

import { IFieldsPropsState, IFileLoadInitialValuesState, IFilesWithNumState } from './FileLoadForm.types';

export const dataTestId = 'fileload-form';

export const initialValues: IFileLoadInitialValuesState = {
  files: {
    file: null,
    fileList: [],
  },
};

export const fieldsProps: IFieldsPropsState = {
  files: {
    name: 'files',
    inputType: 'file',
    validateFirst: false,
  },
};

export const fileFormats = {
  pdf: '.pdf',
  image: '.jpg, .png',
  excel: '.xlsx',
  csv: '.csv',
  video: '.mp4',
  cad: '.step, .stp, .dxf',
  autodesk: '.3ds, .ifc, .dwg',
  gif: '.gif',
  jpeg: '.jpeg',
  odg: '.odg',
  xls: '.xls',
  ods: '.ods',
  word: '.doc, .docx',
  oldWord: '.odt, .rtf',
  zip: '.zip',
  rar: '.rar',
  arj: '.arj',
  sevenZip: '.7z',
  text: '.txt',
};

export const getFileFormatString = (...fileFormats: string[]) => fileFormats.join(', ');

export const getFileNameForTemplate = (file: File) => file!.name.split('.').slice(0, -1).join('.');
export const getFileExtensionForTemplate = (file: File) => file!.name.split('.').slice(-1).join('');
export const regWithoutUnderscoresAndSpace = /_| /g;

export const getNumForFiles = (files: File[], makeNumComplex?: boolean): IFilesWithNumState[] =>
  files.map((file) => ({
    parentName: getFileNameForTemplate(file),
    numId: makeNumComplex
      ? `${getFileNameForTemplate(file).replace(regWithoutUnderscoresAndSpace, '-')}_${createId()}`
      : createId(),
    extension: getFileExtensionForTemplate(file),
  }));

export const getCliUploadInfoFromNums = (numForFiles: IFilesWithNumState[], cat: string) => {
  const cliUploadedCat = new Array(numForFiles.length).fill(cat).join(',');
  const clientUploadFile = numForFiles.map(({ extension, numId }) => `${numId}.${extension}`).join(',');
  const clientUploadNum = numForFiles.map(({ extension, parentName }) => `${parentName}.${extension}`).join(',');

  return {
    clientUploadFile,
    cliUploadedCat,
    clientUploadNum,
  };
};

export const getNumForFilesWithAttach = (files: IFilesWithNumState[], numberingFrom?: number): IFilesWithNumState[] =>
  files.map((file, idx) => ({
    ...file,
    attach: `ATTACH${numberingFrom ? idx + numberingFrom : idx + 1}`,
  }));
