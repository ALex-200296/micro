import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { ordersSelectors } from '@app/store/orders/orders.selectors';
import { ordersSliceName, setOrderInvoiceBodySort } from '@app/store/orders/orders.slice';
import { ExtendedSort, OrderRowListsType } from '@app/store/orders/orders.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { infoSearchAction } from '@middleware/info/info.saga';
import {
  getInvoiceAction,
  getInvoiceBodyAction,
  getInvoiceBodyActionType,
  postInvoiceActionType,
} from '@middleware/invoice/invoice.saga';
import { InvoiceOperations, IReturnAdapterInvoiceBody } from '@middleware/invoice/invoice.types';
import { getSortingForTable, useOnTableChange } from '@shared/lib';
import { EditableConst, slashedFormat, Table } from '@shared/ui';
import { Form } from 'antd';
import dayjs from 'dayjs';

import { initialOperationState } from '../../Orders.data';

import Title from './Title/Title.component';
import {
  expandableRowKey,
  getActionRowConfig,
  getOrdersColumnsConfig,
  tableTitle,
  unifyFormItemName,
} from './ExpandableOrderInfo.data';
import { EditabelColulumnValuesType, IExpandableOrderInfoProps } from './ExpandableOrderInfo.types';

import styles from './ExpandableOrderInfo.module.scss';

const ExpandableOrderInfo: React.FC<IExpandableOrderInfoProps> = ({
  order: { id, statusCode },
  tableIsEditable,
  expandedKey,
  onEditableFinish: onEditableFinishProps,
  setTableIsEditable: setTableIsEditableProps,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const datalist = useSelector(ordersSelectors.getOrdersInvoiceBody(id));
  const { volume, weight } = useSelector(ordersSelectors.getOrdersInvoiceBodyExtras(id));
  const extendedSorts = useSelector(ordersSelectors.getOrdersInvoiceBodySorts(id));
  const getLoading = useSelector(uiSelectors.getIsRequestPending(`${getInvoiceBodyActionType}/${id}`));
  const invoiceData = useSelector(ordersSelectors.getOrdersInvoice(id));
  const postLoading = useSelector(uiSelectors.getIsRequestPending(`${postInvoiceActionType}/${id}`));
  const statusRejectOptions = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.CO_TABLE, CodeInfoSearch.MERCH_REJECT),
  );

  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [columValuesForAllRows, setColumnValuesForAllRows] = useState<string[]>([]);

  const isLoading = useMemo(() => getLoading || postLoading, [getLoading, postLoading]);
  const isInvoiceData = useMemo(() => Object.values(invoiceData.consignee).some((value) => !!value), [invoiceData]);
  const operation = useMemo(
    () =>
      tableIsEditable[id] &&
      (Object.entries(tableIsEditable[id]).find(([, value]) => !!value)?.[0] as keyof typeof InvoiceOperations),
    [tableIsEditable, expandedKey],
  );
  const actionRowConfig = useMemo(() => getActionRowConfig(checkedRows, operation), [checkedRows, operation]);
  const columns = useMemo(
    () =>
      getOrdersColumnsConfig(
        statusCode,
        statusRejectOptions,
        getSortingForTable(operation ? 'asc' : extendedSorts[ExtendedSort.REQUIRED_DELIVERY_DATE]),
        operation,
        setCheckedRows,
        columValuesForAllRows,
        setColumnValuesForAllRows,
      ),
    [operation, extendedSorts, statusRejectOptions, statusCode, columValuesForAllRows],
  );

  const onTableChange = useOnTableChange({
    onSort: setOrderInvoiceBodySort,
    args: {
      sort: { id },
    },
  });

  useEffect(() => {
    if (!datalist.length) dispatch(getInvoiceBodyAction({ id, sliceName: ordersSliceName }));
    if (!isInvoiceData) dispatch(getInvoiceAction({ id, sliceName: ordersSliceName }));
  }, [document]);

  useEffect(() => {
    if (!statusRejectOptions.length && operation === 'merchReject')
      dispatch(infoSearchAction({ type: TypeInfoSearch.CO_TABLE, code: CodeInfoSearch.MERCH_REJECT }));
    setCheckedRows([]);
  }, [statusRejectOptions, operation]);

  const setTableIsEditable = useCallback(() => {
    setTableIsEditableProps((prev) => ({ ...prev, [id]: initialOperationState }));
  }, []);

  const onEditableFinish = useCallback(
    (values: Record<string, Partial<OrderRowListsType>>) => {
      onEditableFinishProps(unifyFormItemName(values), id, operation, datalist);
      setColumnValuesForAllRows([]);
    },
    [id, operation, onEditableFinishProps, datalist],
  );

  const onFormValuesChange = (
    updatedValue: Record<number, EditabelColulumnValuesType>,
    allValues: IReturnAdapterInvoiceBody,
  ) => {
    if (columValuesForAllRows.length && operation === 'merchReject') {
      const { rejectionReason, supplierDateReject } = Object.values(updatedValue)[0];
      Object.values(allValues).forEach((tableRowValue, idx) =>
        form.setFieldValue(idx + 1, {
          ...tableRowValue,
          supplierDateReject:
            supplierDateReject && columValuesForAllRows.includes('supplierDateReject')
              ? dayjs(supplierDateReject, slashedFormat)
              : tableRowValue.supplierDateReject,
          rejectionReason:
            rejectionReason && columValuesForAllRows.includes('rejectionReason')
              ? rejectionReason
              : tableRowValue.rejectionReason,
        }),
      );
    }
  };

  return (
    <Table.Editable
      formInstance={form}
      headerTitle={tableTitle[operation]}
      className={styles.expandable_order_info_table}
      editableEntity={EditableConst.table}
      size='small'
      rowKey={expandableRowKey}
      actionsConfig={actionRowConfig}
      editingConfig={{
        tableIsEditable: !!operation,
        setTableIsEditable: setTableIsEditable,
      }}
      columnsState={{
        value: {},
      }}
      onValuesChange={onFormValuesChange}
      onFinish={onEditableFinish}
      dataSelector={ordersSelectors.getOrdersInvoiceBody(id)}
      title={
        isInvoiceData ? () => <Title consignee={invoiceData.consignee} volume={volume} weight={weight} /> : undefined
      }
      columns={columns}
      loading={isLoading}
      onChange={onTableChange}
    />
  );
};

export default memo(ExpandableOrderInfo);
