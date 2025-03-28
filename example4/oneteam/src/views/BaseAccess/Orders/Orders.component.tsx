import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoSelectors } from '@app/store/info/info.selectors';
import { IInfoParam, InfoParamsGroup, InfoParamsOper, InfoParamsType } from '@app/store/info/info.types';
import { ordersSelectors } from '@app/store/orders/orders.selectors';
import {
  ordersSliceName,
  resetOrdersFilter,
  resetOrdersFilters,
  setOrdersFilters,
  setOrderSorts,
  setOrdersPagination,
} from '@app/store/orders/orders.slice';
import { OrderListsType, OrderRowListsType } from '@app/store/orders/orders.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { userSelectors } from '@app/store/user/user.selectors';
import { FiltersForm } from '@entities/common/ui';
import { infoParamsAction } from '@middleware/info/info.saga';
import { getInvoicesAction, getInvoicesActionType, updateInvoiceBodyAction } from '@middleware/invoice/invoice.saga';
import { invoiceOperations, InvoiceProcedure } from '@middleware/invoice/invoice.types';
import { getSortingForTable, useFilterToTag, useOnTableChange, useToggleState } from '@shared/lib';
import { dashedFormat, dottedFormat, Drawer, PageTitle, Table, TagsGroup, Toolbar } from '@shared/ui';
import dayjs from 'dayjs';

import { getInvoiceFiltersFormItems } from '../BaseAccessPage.data';
import { IInvoiceFiltersInitialValues, InvoiceFilters } from '../BaseAccessPage.types';

import ExpandableOrderInfo from './components/ExpandableOrderInfo/ExpandableOrderInfo.component';
import LabelPrintModal from './components/LabelPrintModal/LabelPrintModal.component';
import { CrossDockingDrawer } from './CrossDockingDrawer/CrossDockingDrawer.component';
import {
  drawerTitle,
  getOrdersColumnsConfig,
  initialOperationState,
  ordersFilterTitle,
  ordersTitle,
  rowKey,
} from './Orders.data';
import { InitialOperationStateType, IOperationArgs, OnOperationType, OperationsMapperType } from './Orders.types';

import styles from './Orders.module.scss';

const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const {
    page,
    rows,
    records,
    dataList,
    sorts: { sidx, dateSort },
    filters: { startDate, endDate, status, orderCode },
  } = useSelector(ordersSelectors.getOrders);
  const filtersCount = useSelector(ordersSelectors.getFiltersCount);
  const { email } = useSelector(userSelectors.getUserProfile);
  const filterStatusOptions = useSelector(
    infoSelectors.getInfoParams(InfoParamsOper.invoiceStatus, undefined, InfoParamsGroup.orders),
  );
  const isLoading = useSelector(uiSelectors.getIsRequestPending(getInvoicesActionType));

  const [expandedKey, setExpandedKey] = useState<string[]>([]);
  const [tableIsEditable, setTableIsEditable] = useState<Record<string, Partial<InitialOperationStateType>>>({});
  const [orderId, setOrderId] = useState<string>('');

  const {
    isOpen: crossDockingOpen,
    handleOpen: handleCrossDockingOpen,
    handleClose: handleCrossDockingClose,
  } = useToggleState();
  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();
  const {
    isOpen: labelPrintOpen,
    handleOpen: handleLabelPrintOpen,
    handleClose: handleLabelPrintClose,
  } = useToggleState();
  const filtersFormItems = useMemo(() => getInvoiceFiltersFormItems(filterStatusOptions), [filterStatusOptions]);

  const optionsForStatusTag: Omit<IInfoParam, 'children'>[] = useMemo(
    () => filterStatusOptions.map(({ children, ...rest }) => [...(children ? [children] : []), rest]).flat(2),
    [filterStatusOptions],
  );
  const { filterTagsData } = useFilterToTag({
    filterConfig: {
      [InvoiceFilters.dateRange]: {
        currentValue: `${dayjs(startDate).format(dottedFormat)} - ${dayjs(endDate).format(dottedFormat)}`,
        filterName: 'Дата',
      },
      [InvoiceFilters.orderCode]: {
        currentValue: orderCode,
        filterName: 'Номер документа',
      },
      [InvoiceFilters.status]: {
        currentValue: status,
        filterName: 'Статус документа',
        selectConfig: {
          valuePropName: 'id',
          labelPropName: 'name',
          options: optionsForStatusTag,
        },
      },
    },
    onClose: (key, value) => dispatch(resetOrdersFilter({ key, value })),
    onCloseAll: () => dispatch(resetOrdersFilters()),
  });

  const onTableChange = useOnTableChange({
    onPaginate: setOrdersPagination,
    onSort: setOrderSorts,
  });

  const initialFiltersValues: IInvoiceFiltersInitialValues = {
    [InvoiceFilters.dateRange]: [startDate, endDate],
    [InvoiceFilters.status]: status,
    [InvoiceFilters.orderCode]: orderCode,
  };

  const getOrders = useCallback(() => {
    dispatch(
      getInvoicesAction({
        startDate: dayjs(startDate).format(dashedFormat) || '',
        endDate: dayjs(endDate).format(dashedFormat) || '',
        orderCode,
        sord: dateSort,
        status: status.join(','),
        sidx,
        page,
        rows,
        type: InfoParamsType.merchant,
        group: InfoParamsGroup.orders,
        sliceName: ordersSliceName,
      }),
    );
  }, [page, rows, sidx, dateSort, startDate, endDate, status, orderCode]);

  useEffect(() => {
    if (!filterStatusOptions.length) {
      dispatch(
        infoParamsAction({
          oper: InfoParamsOper.invoiceStatus,
          group: InfoParamsGroup.orders,
        }),
      );
    }
  }, [filterStatusOptions]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  useEffect(() => {
    setExpandedKey([]);
  }, [dataList]);

  const onExpand = useCallback(
    (expanded: boolean, record: OrderListsType, operationKey?: keyof typeof invoiceOperations) => {
      const rowId = record[rowKey] as string;
      if (expanded) {
        setExpandedKey((prev) => [...prev, rowId]);
        if (operationKey)
          setTableIsEditable((prev) => ({ ...prev, [rowId]: { ...initialOperationState, [operationKey]: true } }));
      } else {
        setExpandedKey((prev) => prev.filter((value) => value !== rowId));
        setTableIsEditable((prev) => ({ ...prev, [rowId]: initialOperationState }));
      }
    },
    [rowKey, tableIsEditable],
  );

  const onFiltersReset = useCallback(() => {
    dispatch(resetOrdersFilters());
  }, []);

  useEffect(
    () => () => {
      dispatch(resetOrdersFilters());
    },
    [],
  );

  const onFilterFinish = useCallback((values: IInvoiceFiltersInitialValues) => {
    const { dateRange, status, orderCode } = values;
    dispatch(setOrdersFilters({ startDate: dateRange[0], endDate: dateRange[1], status, orderCode }));
    handleFiltersClose();
  }, []);

  const onEditableFinish = useCallback(
    (
      values: Record<string, Partial<OrderRowListsType>>,
      id: string,
      operation: keyof typeof InvoiceProcedure,
      datalist: OrderRowListsType[],
    ) => {
      dispatch(
        updateInvoiceBodyAction({
          post: { id, proc: InvoiceProcedure[operation], body: values, datalist, email },
          getInvoices: {
            startDate: dayjs(startDate).format(dashedFormat) || '',
            endDate: dayjs(endDate).format(dashedFormat) || '',
            orderCode,
            sord: dateSort,
            status: status.join(','),
            sidx,
            page,
            rows,
            type: InfoParamsType.merchant,
            group: InfoParamsGroup.orders,
            sliceName: ordersSliceName,
          },
        }),
      );
    },
    [getOrders, email],
  );

  const onCrossDockingClick = ({ id }: IOperationArgs) => {
    setOrderId(id);
    handleCrossDockingOpen();
  };

  const crossDockingClose = () => {
    handleCrossDockingClose();
  };

  const onPrintLabel = ({ id }: IOperationArgs) => {
    setOrderId(id);
    handleLabelPrintOpen();
  };

  const operationsMapper: OperationsMapperType = {
    [invoiceOperations.merchKdk]: onCrossDockingClick,
    [invoiceOperations.merchPrintlabel]: onPrintLabel,
  };

  const onOperation: OnOperationType = (operationKey, operationArgs) => {
    operationsMapper?.[operationKey]?.(operationArgs);
  };

  const columns = useMemo(
    () => getOrdersColumnsConfig(getSortingForTable(dateSort), onExpand, onOperation),
    [dateSort, sidx],
  );

  return (
    <>
      <PageTitle heading={ordersTitle} />
      <Toolbar>
        <Toolbar.ApplyFilter
          onClick={handleFiltersOpen}
          notification={filtersCount}
          drawerProps={{
            title: ordersFilterTitle,
            destroyOnClose: true,
            open: filtersOpen,
            onClose: handleFiltersClose,
            children: (
              <FiltersForm
                initialValues={initialFiltersValues}
                formItems={filtersFormItems}
                onReset={onFiltersReset}
                onFinish={onFilterFinish}
              />
            ),
          }}
        />
      </Toolbar>
      <TagsGroup tagsData={filterTagsData} closable dataTestId='orders' />
      <Table
        columns={columns}
        dataSelector={ordersSelectors.getDataList}
        onChange={onTableChange}
        rowKey={rowKey}
        expandable={{
          expandedRowRender: (order) => (
            <ExpandableOrderInfo
              order={order satisfies OrderListsType}
              tableIsEditable={tableIsEditable}
              expandedKey={expandedKey}
              setTableIsEditable={setTableIsEditable}
              onEditableFinish={onEditableFinish}
            />
          ),
          onExpand: onExpand,
          expandedRowKeys: expandedKey,
        }}
        loading={isLoading}
        pagination={{
          current: page,
          total: records,
          pageSize: rows,
        }}
        size='small'
        className={styles.table}
      />
      <Drawer
        open={crossDockingOpen}
        onClose={crossDockingClose}
        destroyOnClose
        width='md'
        title={drawerTitle}
        maskClosable={false}
        keyboard={false}
      >
        <CrossDockingDrawer id={orderId} onClose={crossDockingClose} afterSubmit={handleLabelPrintOpen} />
      </Drawer>
      <LabelPrintModal modalProps={{ open: labelPrintOpen, onCancel: handleLabelPrintClose }} id={orderId} />
    </>
  );
};

export default memo(Orders);
