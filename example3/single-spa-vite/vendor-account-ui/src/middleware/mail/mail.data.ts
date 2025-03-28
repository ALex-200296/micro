import { IResponseFile } from '@middleware/template/template.types';
import { CreateFileReturnType } from '@views/BaseAccess/VendorForm/VendorForm.types';

import { getNumForFiles } from '../../features/common/ui/Form/FileLoadForm/FileLoadForm.data';

import { IContentData } from './mail.types';

export const getLinkHref = (fileHref: string, label: string, url?: string) =>
  `${import.meta.env.VITE_APP_REDIRECT_URL}/upload/${url}/${fileHref}`.replace(/\s/g, '');
export const getHtmlLink = (fileHref: string, label: string, url?: string) =>
  `<a href="${getLinkHref(fileHref, label, url)}" download target="_blank">${label.replace(/\s/g, '')}</a></br>`;

export const getMailContent = (files?: IResponseFile[], url?: string, content?: IContentData[]): string => {
  const link = files ? files?.map(({ file_name, msg }) => `${getHtmlLink(file_name, msg, url)}`).join('') : '';
  const contentData = content
    ? content.map((dataEntry) => `<p><strong>${dataEntry.label} </strong>${dataEntry.value}</p>`)
    : '';
  return [...contentData, link].join('');
};

const createTxtFile = (fileName: string, fileContent: string): CreateFileReturnType => {
  const formFile = new File([fileContent], `${fileName}.txt`, {
    type: 'text/plain;charset=UTF-8',
  });
  const numForFiles = getNumForFiles([formFile]);
  return { files: [formFile], numForFiles };
};

export const createFileWithFormData = (
  fileName: string,
  fileContent: string,
  url = '',
  fileLinks?: IResponseFile[],
): CreateFileReturnType => {
  if (fileLinks) {
    const linksForMail = fileLinks.map(({ file_name, msg }) => getLinkHref(file_name, msg, url));
    const formStringWithLinks = [fileContent, '\nПриложение:', linksForMail.join('\n')].join('\n');
    return createTxtFile(fileName, formStringWithLinks);
  }
  return createTxtFile(fileName, fileContent);
};

export const toMail: string = 'helponeteam@etm.ru';
