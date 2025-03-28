import { IResponse } from '@middleware/root.types';
import { IResponseFile } from '@middleware/template/template.types';

export interface IContentData {
  label: string;
  value: string;
}

export interface IPostMailSendActionState {
  files?: IResponseFile[];
  subject?: string;
  target_mail?: string;
  url?: string;
  content?: IContentData[];
  onSuccessMessage?: string;
}

export interface IPostMailSendSagaState {
  payload: IPostMailSendActionState;
  type: string;
}

export interface IResponsePostHelpMail extends IResponse {
  data: any;
}
