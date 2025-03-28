export const ReportsFilter = {
  EXM_MAN_CODE: 'exmManCode',
  PME_STATE: 'pme_state',
  PME_SUBTHEME: 'pme_subtheme',
} as const;

export const EventType = {
  CREATE_FORM: 'createForm',
  SELECTED_EVENT: 'selectedEvent',
} as const;

export interface IFilterListState {
  value: string;
  label: string;
}

export interface IInitialFiltersValues {
  [ReportsFilter.EXM_MAN_CODE]: string;
  [ReportsFilter.PME_STATE]: string;
  [ReportsFilter.PME_SUBTHEME]: string;
}
