import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/root.store';

import { FinanceReportsType } from './finance.types';

const selectFinanceSlice = (state: RootState) => state.finance;

const selectFinanceReconciliationFilters = (state: RootState) => state.finance.reconciliation.filters;
const selectFinanceReconciliation = (state: RootState) => state.finance.reconciliation;
const selectFinanceServices = (state: RootState) => state.finance.services;
const selectFinanceServicesFilters = (state: RootState) => state.finance.services.filters;

export const financeSelectors = {
  getFinanceReportsData: (property: FinanceReportsType) =>
    createSelector(selectFinanceSlice, (financeState) => ({
      ...financeState[property],
      records: financeState[property].loadedData.records,
    })),
  getFinanceReportsTableData: (property: FinanceReportsType) =>
    createSelector(selectFinanceSlice, (financeState) => financeState[property].loadedData.data),
  getFinanceReportsFiltersCount: (property: FinanceReportsType) =>
    createSelector(selectFinanceSlice, (financeState) =>
      Object.values(financeState[property].filters).reduce((accum, current) => (current ? accum + 1 : accum), 0),
    ),

  getFiltersReconciliation: createSelector([selectFinanceReconciliationFilters], ({ startDate, endDate }) => ({
    startDate,
    endDate,
  })),
  getReconciliationFiltersCount: createSelector(selectFinanceReconciliationFilters, ({ startDate, endDate }) =>
    [`${startDate || ''}${endDate || ''}`].reduce((accum, current) => (current ? accum + 1 : accum), 0),
  ),

  getReconciliationData: createSelector(selectFinanceReconciliation, (financeReconciliationState) => ({
    data: financeReconciliationState.data,
    page: financeReconciliationState.page,
    rows: financeReconciliationState.rows,
    records: financeReconciliationState.records,
  })),
  getReconciliationTableData: createSelector(
    selectFinanceReconciliation,
    (financeReconciliationState) => financeReconciliationState.data,
  ),

  getServicesFiltersCount: createSelector(selectFinanceServicesFilters, (financeServicesFiltersState) => {
    const { startDate, endDate, status, orderCode } = financeServicesFiltersState;
    return [`${startDate}${endDate}`, status.length, orderCode].reduce<number>(
      (accum, current) => (current ? accum + 1 : accum),
      0,
    );
  }),

  getServicesData: createSelector(selectFinanceServices, (financeServicesState) => ({
    page: financeServicesState.page,
    rows: financeServicesState.rows,
    records: financeServicesState.records,
    filters: financeServicesState.filters,
    sorts: financeServicesState.sorts,
  })),
  getServicesTableData: createSelector(selectFinanceServices, (financeServicesState) => financeServicesState.dataList),
  getServicesFilter: createSelector(selectFinanceServices, (financeServicesState) => financeServicesState.filters),
};
