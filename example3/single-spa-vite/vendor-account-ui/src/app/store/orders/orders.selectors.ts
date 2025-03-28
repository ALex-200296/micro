import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/root.store';

import { initialInvoice, initialInvoiceBody } from './orders.slice';

const selectOrdersSlice = (state: RootState) => state.orders;

export const ordersSelectors = {
  getOrders: createSelector(selectOrdersSlice, (ordersState) => ordersState),
  getOrdersInvoice: (id: string) =>
    createSelector(selectOrdersSlice, (ordersState) =>
      ordersState.invoice[id] ? ordersState.invoice[id] : initialInvoice,
    ),
  getOrdersInvoiceBody: (id: string) =>
    createSelector(selectOrdersSlice, (ordersState) =>
      ordersState.invoiceBody[id] ? ordersState.invoiceBody[id]?.dataList : [],
    ),
  getOrdersInvoiceBoxes: createSelector(selectOrdersSlice, (ordersState) => ordersState.invoiceBoxes),
  getOrdersInvoiceBodySorts: (id: string) =>
    createSelector(
      selectOrdersSlice,
      (ordersState) => (ordersState.invoiceBody[id] && ordersState.invoiceBody[id]?.sorts) || {},
    ),
  getOrdersInvoiceBodyExtras: (id: string) =>
    createSelector(selectOrdersSlice, (ordersState) => {
      const { dataList, sorts, ...extras } = ordersState.invoiceBody[id] || initialInvoiceBody;
      void dataList, sorts;
      return { ...extras };
    }),
  getDataList: createSelector(selectOrdersSlice, (ordersState) => ordersState.dataList),
  getFilters: createSelector(selectOrdersSlice, (ordersState) => ordersState.filters),
  getSort: createSelector(selectOrdersSlice, (ordersState) => ordersState.sorts),
  getPagination: createSelector(selectOrdersSlice, ({ rows, page }) => ({ rows, page })),
  getFiltersCount: createSelector(selectOrdersSlice, ({ filters: { startDate, endDate, status, orderCode } }) =>
    [`${startDate}${endDate}`, status.length, orderCode].reduce<number>(
      (accum, current) => (current ? accum + 1 : accum),
      0,
    ),
  ),
};
