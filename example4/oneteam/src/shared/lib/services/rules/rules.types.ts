import { IUserInitialState } from '@app/store/user/user.types';

type checkRule = (userData: IUserInitialState) => boolean;

export interface IAccessRoute {
  type?: checkRule;
  role?: checkRule;
  rights?: checkRule;
}

export interface IActions {
  createTask?: checkRule;
  excelDownload?: checkRule;
  templateDownload?: checkRule;
}

export interface IRule {
  accessRoute: IAccessRoute;
  actions?: IActions;
}
