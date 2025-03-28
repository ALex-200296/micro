export const calendarFilters = {
  exmManCode: 'exmManCode',
  pme_state: 'pme_state',
  pme_subtheme: 'pme_subtheme',
} as const;

export const calendarFilterLabels = {
  [calendarFilters.exmManCode]: 'Сотрудник поставщика',
  [calendarFilters.pme_state]: 'Статус',
  [calendarFilters.pme_subtheme]: 'Раздел',
} as const;
