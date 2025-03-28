export const CalendarFilters = {
  EXM_MAN_CODE: 'exmManCode',
  PME_STATE: 'pme_state',
  PME_SUBTHEME: 'pme_subtheme',
} as const;

export const CalendarFilterLabels = {
  [CalendarFilters.EXM_MAN_CODE]: 'Сотрудник поставщика',
  [CalendarFilters.PME_STATE]: 'Статус',
  [CalendarFilters.PME_SUBTHEME]: 'Раздел',
} as const;
