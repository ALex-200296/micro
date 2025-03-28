import {
  IProjectDetailsData,
  IProjectFiltersBase,
  IProjectRequestsListData,
  IProjectsListData,
  ProjectsComputedProperty,
} from '@app/store/project/project.types';
import { IResponse } from '@middleware/root.types';

export interface IGetProjectRequestDetailsResponse extends IResponse {
  data: {
    rows: IProjectDetailsData[];
  };
}

interface IProjectRequestsListResponse extends IProjectRequestsListData {
  page: string;
}

export interface IGetProjectRequestsListResponse extends IResponse {
  data: IProjectRequestsListResponse;
}

export interface IProjectsListResponse extends IProjectsListData {
  page: string;
}

export interface IGetProjectsListResponse extends IResponse {
  data: IProjectsListResponse;
}

export interface IGetProjectAction {
  id: string;
  projectData: IProjectDetailsData;
  computedProperty: keyof typeof ProjectsComputedProperty;
}

export interface ISetProjectsListAction {
  computedProperty: keyof typeof ProjectsComputedProperty;
  list: IProjectRequestsListData | IProjectsListData;
}

export interface IGetRequestDetailsActionPayload {
  id: string;
  detailsType: keyof typeof ProjectsComputedProperty;
  pendingRequest?: string;
  getResponse?: (data?: IProjectDetailsData) => void;
}

export interface ISetSelectedIdActionPayload {
  id: string;
  computedProperty: keyof typeof ProjectsComputedProperty;
}

export interface IUpdateRequestDetailsActionPayload {
  data: string;
  id: string;
  computedProperty: keyof typeof ProjectsComputedProperty;

  listFilterData?: IGetProjectsListActionPayload;
}

export interface IGetProjectsListActionPayload extends Partial<IProjectFiltersBase> {
  page: number;
  rows: number;
  isSetId?: boolean;
  getResponse?: (isProject: boolean) => void;
}

export interface IGetRequestDetailsSagaState {
  payload: IGetRequestDetailsActionPayload;
  type: string;
}

export interface IUpdateRequestDetailsSagaState {
  payload: IUpdateRequestDetailsActionPayload;
  type: string;
}

export interface IGetProjectsListSagaState {
  payload: IGetProjectsListActionPayload;
  type: string;
}

export interface ISetProjectsPageAction {
  page: number;
  rows: number;
  computedProperty: keyof typeof ProjectsComputedProperty;
}

export interface IProjectsRequestsPayload {
  page?: number;
  rows?: number;
}

export interface IGetProjectsRequestsSagaState {
  type: string;
  payload: IProjectsRequestsPayload;
}
