import { UploadProps } from 'antd';
import { ShowUploadListInterface } from 'antd/es/upload/interface';
export interface IFileInputProps extends Omit<UploadProps, 'showUploadList' | 'beforeUpload'> {
  dataTestId: string;
  uploadText?: string;
  uploadHint?: string;
  showUploadList?: ShowUploadListInterface;
  fileSizeAccept?: number;
}
