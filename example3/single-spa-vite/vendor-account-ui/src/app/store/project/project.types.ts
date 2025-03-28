import { ProjectFilters } from './project.data';

export interface ICliRole {
  role: string;
  roleName?: string;
  manCode?: string;
  manName?: string;
  departCode?: string;
  departName?: string;
  manPost: string;
  manEmail?: string;
  manPhone?: string;
  cliName?: string;
  cliCode?: string;
  inn?: string;
  fio?: string;
  phone?: string;
  email?: string;
  address?: string;
  exm_mancode?: string;
}

export interface IProjectDetailsFiles {
  file: string;
  name: string;
  comment: string;
}

export interface IProjectDetailsResponsibleData {
  fio: string;
  exm_mancode: string;
  email: string;
  phone: string;
  access: string;
}

export interface IProjectDetailsData {
  id: string;
  addressF_desc: string;
  address_cladr: string;
  avtor_email: string;
  avtor_fio: string;
  avtor_phone: string;
  avtor_pos: string;
  compMnf: string;
  fileDir: string;
  files: IProjectDetailsFiles[];
  planTOSum: string;
  cliRole: ICliRole[];
  extCode: string;
  extComment: string;
  extCRMDateCreate: string;
  extDateChange: string;
  extDateCreate: string;
  extName: string;
  extStatus: string;
  opCode: string;
  opName: string;
  prj_code: string;
  subPrjCode: string;
  prjName: string;
  requestDate: string;
  requestNum: string;
  requestTime: string;
  requestType: string;
  rowid: string;
  statusList: string[];
  begSupply: string;
  endSupply: string;
  SubBegSupply: string;
  SubEndSupply: string;
  lpr_list: IProjectDetailsResponsibleData[];
}

export interface IProjectDetails {
  id: string;
  projectData: IProjectDetailsData;
}

interface IProjectsRequestListRow {
  id: string;
  prj_code: string;
  subPrjCode: string;
  mnf_ext_prj_code?: string;
  type: string;
  name: string;
  op_code: string;
  op_name: string;
  RP_name: string;
  RP_phone: string;
  obj_addr: string;
  stage_name: string;
  mnf_prj_statusDesc: string;
  mnf_dbeg: string;
  mnf_dend: string;
  mnf_planTO_sum: string;
  avtor_fio: string;
  avtor_pos: string;
  avtor_phone: string;
  avtor_email: string;
  mnf_comp_mnf: string;
  sub_prj_statusDesc: string;
}

export interface IProjectsListRow {
  id: string;
  prj_code: string;
  subPrjCode: string;
  mnf_ext_prj_code: string;
  mnf_prj_status: string;
  mnf_prj_statusDesc: string;
  mnf_ext_status: string;
  name: string;
  op_code: string;
  op_name: string;
  RP_name: string;
  RP_phone: string;
  obj_addr: string;
  stage_name: string;
  mnf_dbeg: string;
  mnf_dend: string;
  mnf_planTO_sum: string;
  mnf_comp_mnf: string;
  sub_prj_statusDesc: string;
}

export interface IProjectRequestsListData {
  rows: IProjectsRequestListRow[];
  total: number;
  records: number;
}

export interface IProjectRequestsList {
  page: number;
  rows: number;
  data: IProjectsRequestListRow[];
  total: number;
  records: number;
}

export interface IProjectsListData {
  rows: IProjectsListRow[];
  total: number;
  records: number;
}

export interface IProjectsList {
  page: number;
  rows: number;
  data: IProjectsListRow[];
  total: number;
  records: number;
}

export interface IProjectFiltersBase {
  extCode: string;
  prjName: string;
  mnfDCode: string;
  prjSupply: string;
  prjAddr: string;
  prjMst: string;
  exmManCode: string;
  subPrjStatus: string;
}

export interface IProjectState {
  projectRequests: {
    selectedProjectId: string;
    projectsData: IProjectRequestsList;
    details: Record<string, IProjectDetails>;
  };
  projects: {
    selectedProjectId: string;
    projectFilters: IProjectFiltersBase;
    projectsData: IProjectsList;
    details: Record<string, IProjectDetails>;
  };
}

export const ProjectsComputedProperty = {
  PROJECTS: 'projects',
  PROJECT_REQUESTS: 'projectRequests',
} as const;

export interface IProjectsListDataForTable
  extends Pick<IProjectsRequestListRow, 'id' | 'type' | 'name' | 'op_name' | 'obj_addr'> {
  reg_code: string;
  reg_num: string;
  rp_data: string;
  stage: string;
  period: string;
  plan_sum: string;
  comp: string;
}

export interface IProjectsDataForTable extends Pick<IProjectsListRow, 'id' | 'name' | 'op_name' | 'obj_addr'> {
  reg_code: string;
  reg_num: string;
  status: string;
  rp_data: string;
  stage: string;
  period: string;
  plan_sum: string;
  comp: string;
}

export type ProjectFiltersType = (typeof ProjectFilters)[keyof typeof ProjectFilters];
