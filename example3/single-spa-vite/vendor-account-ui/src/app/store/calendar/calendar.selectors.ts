import { createSelector } from '@reduxjs/toolkit';
import { getUniqueObjArray } from '@shared/lib';
import { shortYearSlashedFormat } from '@shared/ui';
import { RootState } from '@store/root.store';
import dayjs from 'dayjs';

const selectCalendarSlice = (state: RootState) => state.calendar;
const selectCalendarFilters = (state: RootState) => state.calendar.calendarFilters;

export const calendarSelectors = {
  getCalendarEvent: createSelector(selectCalendarSlice, (calendarState) => calendarState.calendarEvent),
  getEventResponsibles: createSelector(selectCalendarSlice, (calendarState) =>
    getUniqueObjArray(calendarState.calendarEvent.execList, 'codeMan'),
  ),
  getEventSupplierEmployees: (cliCode: string) =>
    createSelector(selectCalendarSlice, (calendarState) =>
      cliCode ? calendarState.calendarEvent.codeCli.filter(({ code }) => code === cliCode) : [],
    ),
  getEventPartners: (cliCode: string) =>
    createSelector(selectCalendarSlice, (calendarState) =>
      cliCode ? calendarState.calendarEvent.codeCli.filter(({ code }) => code !== cliCode) : [],
    ),
  getCalendarEvents: createSelector(selectCalendarSlice, (calendarState) => calendarState.calendarEvents),
  getCalendarEventsCount: createSelector(selectCalendarSlice, (calendarState) => calendarState.calendarEventsCount),
  getCalendarExportFileName: createSelector(selectCalendarSlice, (calendarState) => calendarState.calendarFile),

  getCalendarFilters: createSelector(selectCalendarFilters, (calendarFiltersState) => ({
    ...calendarFiltersState,
    startVisibleDate: dayjs(calendarFiltersState.startVisibleDate).format(shortYearSlashedFormat),
    endVisibleDate: dayjs(calendarFiltersState.endVisibleDate).format(shortYearSlashedFormat),
  })),
  getAreCalendarFiltersSet: createSelector(
    selectCalendarFilters,
    (calendarFiltersState) =>
      !!(
        calendarFiltersState.pme_state ||
        calendarFiltersState.exmManCode ||
        calendarFiltersState.man_code ||
        calendarFiltersState.pme_subtheme
      ),
  ),
  getCalendarFiltersCount: createSelector(selectCalendarFilters, (calendarFiltersState) =>
    [
      calendarFiltersState.pme_state,
      calendarFiltersState.exmManCode,
      calendarFiltersState.man_code,
      calendarFiltersState.pme_subtheme,
    ].reduce((accum, current) => (current ? accum + 1 : accum), 0),
  ),
};
