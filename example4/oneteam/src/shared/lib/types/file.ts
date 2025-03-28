import { RcFile } from 'antd/es/upload';

export interface IAntdFileListElement extends File {
  originFileObj: RcFile;
  uid: string;
}

export type FileType = {
  file: File | null;
  fileList: IAntdFileListElement[];
};

