import {
  IGetProjectAction,
  ISetProjectsListAction,
  ISetProjectsPageAction,
  ISetSelectedIdActionPayload,
} from '@middleware/project/project.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { projectFilters } from './project.data';
import { IProjectState, ProjectsComputedProperty } from './project.types';

export const projectSliceName = 'project';

const initialState: IProjectState = {
  [ProjectsComputedProperty.projectRequests]: {
    selectedProjectId: '',
    projectsData: {
      page: 1,
      rows: 10,
      total: 0,
      records: 0,
      data: [],
    },
    details: {},
  },
  [ProjectsComputedProperty.projects]: {
    selectedProjectId: '',
    projectFilters: {
      extCode: '',
      prjName: '',
      mnfDCode: '',
      prjSupply: '',
      prjAddr: '',
      prjMst: '',
      exmManCode: '',
      subPrjStatus: '',
    },
    projectsData: {
      page: 1,
      rows: 10,
      total: 0,
      records: 0,
      data: [],
    },
    details: {},
  },
};
const projectSlice = createSlice({
  name: projectSliceName,
  initialState,
  reducers: {
    setProjectDetails: (state, action: PayloadAction<IGetProjectAction>) => {
      const { computedProperty, id, projectData } = action.payload;
      state[computedProperty].details[id] = { projectData, id };
    },
    updateProjectDetails: (state, action: PayloadAction<IGetProjectAction>) => {
      const { computedProperty, id, projectData } = action.payload;
      const { [id]: _, ...rest } = state[computedProperty].details;
      void _;
      state[computedProperty].details = { ...rest, [id]: { id, projectData } };
    },
    setProjectsData: (state, action: PayloadAction<ISetProjectsListAction>) => {
      const {
        computedProperty,
        list: { rows, records, total },
      } = action.payload;
      state[computedProperty].projectsData.data = rows;
      state[computedProperty].projectsData.records = records;
      state[computedProperty].projectsData.total = total;
    },
    setSelectedProjectId: (state, action: PayloadAction<ISetSelectedIdActionPayload>) => {
      const { id, computedProperty } = action.payload;
      state[computedProperty].selectedProjectId = id;
    },
    setProjectFilters: (state, action) => {
      state.projects.projectFilters = { ...initialState.projects.projectFilters, ...action.payload };
      state.projects.projectsData.page = initialState.projects.projectsData.page;
    },
    resetProjectsData: (state, action: PayloadAction<keyof typeof ProjectsComputedProperty>) => {
      state[action.payload].projectsData = initialState[action.payload].projectsData;
    },
    resetProjectFilters: (state) => {
      state.projects.projectFilters = initialState.projects.projectFilters;
      state.projects.projectsData.page = initialState.projects.projectsData.page;
    },
    resetProjectFilter: (state, action: PayloadAction<keyof typeof projectFilters>) => {
      state.projects.projectFilters[action.payload] = initialState.projects.projectFilters[action.payload];
    },
    setProjectsPagination: (state, action: PayloadAction<ISetProjectsPageAction>) => {
      const { page, computedProperty, rows } = action.payload;
      state[computedProperty].projectsData.page = page;
      state[computedProperty].projectsData.rows = rows;
    },
    resetProjects: (state) => {
      state.projects = initialState.projects;
    },
  },
});

export const {
  actions: {
    updateProjectDetails,
    setProjectDetails,
    setSelectedProjectId,
    resetProjects,
    setProjectsData,
    setProjectsPagination,
    setProjectFilters,
    resetProjectsData,
    resetProjectFilters,
    resetProjectFilter,
  },
  reducer: projectStateReducer,
} = projectSlice;
