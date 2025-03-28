import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/root.store';

import { IProjectsDataForTable, IProjectsListDataForTable, ProjectsComputedProperty } from './project.types';

const selectProjectsSlice = (state: RootState) => state.project;

const selectProjects = (state: RootState) => state.project.projects;
const selectProjectRequestsListData = (state: RootState) => state.project.projectRequests.projectsData.data;
const selectProjectSelectedId = (state: RootState) => state.project.projects.selectedProjectId;
const selectProjectDetails = (state: RootState) => state.project.projects.details;
const selectProjectsData = (state: RootState) => state.project.projects.projectsData;
const selectProjectsListData = (state: RootState) => state.project.projects.projectsData.data;
const selectProjectsFilters = (state: RootState) => state.project.projects.projectFilters;

export const projectSelectors = {
  getProjectsPaginationData: (property: keyof typeof ProjectsComputedProperty) =>
    createSelector(selectProjectsSlice, (projectState) => ({
      page: projectState[property].projectsData.page,
      rows: projectState[property].projectsData.rows,
      records: projectState[property].projectsData.records,
    })),
  getProjectDetailsById: (property: keyof typeof ProjectsComputedProperty) =>
    createSelector(
      selectProjectsSlice,
      (projectState) => projectState[property].details[projectState[property].selectedProjectId]?.projectData,
    ),
  getSelectedProjectId: (property: keyof typeof ProjectsComputedProperty) =>
    createSelector(selectProjectsSlice, (projectState) => projectState[property].selectedProjectId),
  getExtCodeOfSelectedProject: (property: keyof typeof ProjectsComputedProperty) =>
    createSelector(
      selectProjectsSlice,
      (projectState) =>
        [...projectState[property].projectsData.data].find((row) => row.id === projectState[property].selectedProjectId)
          ?.mnf_ext_prj_code,
    ),

  getProjectsListFilters: createSelector(selectProjects, (projectsState) => projectsState.projectFilters),

  getProjectsListDataForTable: createSelector(selectProjectRequestsListData, (projectRequestsListState) =>
    projectRequestsListState.map(
      (row): IProjectsListDataForTable => ({
        id: row.id,
        type: row.type,
        reg_code: row?.mnf_ext_prj_code || '-',
        reg_num: row.subPrjCode,
        name: row.name.split('\\').join(''),
        op_name: row.op_name,
        rp_data: `${row.RP_name} ${row.RP_phone}`,
        obj_addr: row.obj_addr,
        stage: row.sub_prj_statusDesc || '-',
        period: `${row.mnf_dbeg} - ${row.mnf_dend}`,
        plan_sum: row.type.toLowerCase() === 'регистрация' ? '-' : row.mnf_planTO_sum,
        comp: row.mnf_comp_mnf,
      }),
    ),
  ),

  getProjectCodeOfSelectedProject: createSelector(
    [selectProjectSelectedId, selectProjectsListData],
    (projectSelectedIdState, projectsListState) =>
      projectsListState.filter((row) => row.id === projectSelectedIdState)[0]?.prj_code,
  ),

  getProjectForCalendar: createSelector(
    [selectProjectsData, selectProjectDetails],
    (projectsDataState, projectDetailsState) => ({
      projectInfo: projectsDataState.data[0],
      projectCliRole: projectDetailsState.length
        ? Object.values(projectDetailsState).slice(-1)[0].projectData.cliRole
        : [],
    }),
  ),

  getProjectsDataForTable: createSelector(selectProjectsListData, (projectsListState) =>
    projectsListState.map(
      (row): IProjectsDataForTable => ({
        id: row.id,
        reg_code: row?.mnf_ext_prj_code || '-',
        reg_num: row.subPrjCode,
        name: row.name.split('\\').join(''),
        status: row.mnf_ext_status,
        op_name: row.op_name,
        rp_data: `${row.RP_name} ${row.RP_phone}`,
        obj_addr: row.obj_addr,
        stage: row.sub_prj_statusDesc || '-',
        period: `${row.mnf_dbeg} - ${row.mnf_dend}`,
        plan_sum: row.mnf_planTO_sum,
        comp: row.mnf_comp_mnf,
      }),
    ),
  ),

  getProjectsFiltersCount: createSelector(selectProjectsFilters, (projectsFiltersState) =>
    Object.values(projectsFiltersState).reduce((accum, current) => (current ? accum + 1 : accum), 0),
  ),
};
