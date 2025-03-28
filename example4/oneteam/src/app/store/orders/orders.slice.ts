import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InvoiceFilters } from '@views/BaseAccess/BaseAccessPage.types';
import dayjs from 'dayjs';

import {
  IOrderInvoiceAction,
  IOrderInvoiceBody,
  IOrderInvoiceBodyAction,
  IOrderSortsAction,
  IOrdersState,
  IResetOrdersFilterAction,
  ISetOrderInvoiceBodySortAction,
  ISetOrdersPaginationAction,
  OrderInvoiceType,
  OrderRowListsType,
  OrdersSidx,
  SetOrderListsActionStateType,
} from './orders.types';

export const ordersSliceName = 'orders';

export const initialInvoice: OrderInvoiceType = {
  consignee: {
    address: '',
    bank: '',
    bik: '',
    inn: '',
    korschet: '',
    kpp: '',
    name: '',
    polGln: '',
    rasschet: '',
    st_adress: '',
  },
  logisticCenter: '',
};

export const initialInvoiceBody: IOrderInvoiceBody = {
  dataList: [],
  volume: '',
  weight: '',
  docNum: '',
  sorts: {
    requiredDeliveryDate: '',
  },
};

const initialState: IOrdersState = {
  dataList: [],
  invoice: {},
  invoiceBody: {},
  invoiceBoxes: {},
  filters: {
    startDate: dayjs().subtract(1, 'month'),
    endDate: dayjs(),
    status: [],
    orderCode: '',
  },
  sorts: {
    sidx: OrdersSidx.dateSort,
    dateSort: 'desc',
  },
  page: 1,
  rows: 10,
  records: 0,
};

const ordersSlice = createSlice({
  name: ordersSliceName,
  initialState,
  reducers: {
    setOrderLists: (state, action: PayloadAction<SetOrderListsActionStateType>) => {
      const { dataList, records } = action.payload;
      state.dataList = dataList;
      state.records = records;
    },
    setOrderInvoice: (state, action: PayloadAction<IOrderInvoiceAction>) => {
      const { id, invoice } = action.payload;
      state.invoice[id] = invoice;
    },
    setOrderInvoiceBody: (state, action: PayloadAction<IOrderInvoiceBodyAction>) => {
      const { id, rows, ...rest } = action.payload;
      state.invoiceBody[id] = { ...initialInvoiceBody, dataList: rows, ...rest };
    },
    setOrderInvoiceBoxes: (state, action: PayloadAction<Record<string, OrderRowListsType[]>>) => {
      state.invoiceBoxes = action.payload;
    },
    setOrderInvoiceBodySort: (state, action: PayloadAction<ISetOrderInvoiceBodySortAction>) => {
      const { id, column, order } = action.payload;
      state.invoiceBody[id] = { ...state.invoiceBody[id], sorts: { [column]: order } };
    },
    setOrderSorts: (state, action: PayloadAction<IOrderSortsAction>) => {
      const { column, order } = action.payload;
      state.sorts[column] = order;
      state.sorts.sidx = OrdersSidx[column];
    },
    setOrdersPagination: (state, action: PayloadAction<ISetOrdersPaginationAction>) => {
      const { page, rows } = action.payload;
      state.page = page;
      state.rows = rows;
    },
    setOrdersFilters: (state, action: PayloadAction<Partial<IOrdersState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = initialState.page;
    },
    resetOrdersBoxes: (state) => {
      state.invoiceBoxes = initialState.invoiceBoxes;
    },
    resetOrdersFilters: (state) => {
      state.filters = initialState.filters;
      state.page = initialState.page;
      state.sorts = initialState.sorts;
    },
    resetOrdersFilter: (state, action: PayloadAction<IResetOrdersFilterAction>) => {
      const { key, value } = action.payload;
      switch (key) {
        case InvoiceFilters.dateRange: {
          state.filters.endDate = initialState.filters.endDate;
          state.filters.startDate = initialState.filters.startDate;
          break;
        }
        case InvoiceFilters.status: {
          state.filters.status = state.filters.status.filter((code) => code !== value);
          break;
        }
        default: {
          state.filters[key] = initialState.filters[key];
          break;
        }
      }
    },
  },
});

export const {
  actions: {
    setOrderLists,
    setOrderSorts,
    setOrdersPagination,
    setOrdersFilters,
    resetOrdersFilter,
    resetOrdersFilters,
    resetOrdersBoxes,
    setOrderInvoice,
    setOrderInvoiceBody,
    setOrderInvoiceBoxes,
    setOrderInvoiceBodySort,
  },
  reducer: ordersStateReducer,
} = ordersSlice;
