import { IFilesWithNumState } from '@components/Form';

export interface IResponseFile {
  msg: string;
  file_name: string;
}

export interface IPostTemplateActionState {
  files: File[];
  rc: string;
  man?: string;
  num?: IFilesWithNumState[];
  codeNotification?: number;
  actions?: ({ payload: any; type: string } | ((files: TemplateSagaReturnData['fileLinks']) => void))[];
  callActionsWithRejected?: boolean;
}

export interface IPostCreatePdfSagaState {
  payload: IPostCreatePdfActionState;
  type: string;
}

export interface IPostCreatePdfActionState {
  body: any;
  xsl?: string;
  copyTo?: string;
  copyXml?: string;
  action?: (response: IResponsePostCreatePdf['data']) => void;
}

export interface IResponsePostCreatePdf extends Response {
  data: {
    PDF: string;
    URL: string;
  };
}

export interface IPostTemplateSagaState {
  payload: IPostTemplateActionState;
  type: string;
}

export interface IFileData {
  msg: string;
  source_name: string;
  file_name: string;
}

export interface IResponseFileData {
  status: {
    code: number;
    error_code: string;
    message: string;
  };
  data: IFileData;
}

export interface IResponsePostTemplate {
  status: string;
  reason?: IResponseFileData;
  value?: IResponseFileData;
}

export type RejectedFilesType = Record<string, { message?: string; files: IFileData[] }>;

export interface TemplateSagaReturnData {
  rejectedFiles: IResponseFileData[];
  fulfilledFiles: IResponseFileData[];
  fileLinks: IResponseFile[];
}
