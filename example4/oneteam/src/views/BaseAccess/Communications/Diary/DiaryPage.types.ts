export const ReportsFilter = {
  exmManCode: 'exmManCode',
  pme_state: 'pme_state',
  pme_subtheme: 'pme_subtheme',
} as const;

export const EventType = {
  createForm: 'createForm',
  selectedEvent: 'selectedEvent',
} as const;

export interface IFilterListState {
  value: string;
  label: string;
}

export interface IInitialFiltersValues {
  [ReportsFilter.exmManCode]: string;
  [ReportsFilter.pme_state]: string;
  [ReportsFilter.pme_subtheme]: string;
}
