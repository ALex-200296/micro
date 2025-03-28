import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ordersSelectors } from '@app/store/orders/orders.selectors';
import { ordersSliceName, resetOrdersBoxes } from '@app/store/orders/orders.slice';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import {
  getInvoiceAction,
  getInvoiceBodyAction,
  getInvoiceBodyActionType,
  getInvoiceBoxesAction,
  getInvoiceBoxesActionType,
} from '@middleware/invoice/invoice.saga';
import LoadingIndicator from '@views/BaseAccess/DesignWork/Projects/components/Sections/LoadingIndicator/LoadingIndicator.component';
import { Flex } from 'antd';
import { useDebounceValue } from 'usehooks-ts';

import CrossDockingTransfer from '../CrossDockingTransfer/CrossDockingTransfer.component';

import { OrderDescriptions } from './OrderDescriptions/OrderDescriptions.component';
import { initialBoxes } from './CrossDockingDrawer.data';
import { ICrossDockingDrawerProps } from './CrossDockingDrawer.types';

export const CrossDockingDrawer: React.FC<ICrossDockingDrawerProps> = ({ onClose, id, orderNum, afterSubmit }) => {
  const dispatch = useDispatch();

  const invoiceData = useSelector(ordersSelectors.getOrdersInvoice(id));
  const extras = useSelector(ordersSelectors.getOrdersInvoiceBodyExtras(id));
  const invoiceBodyData = useSelector(ordersSelectors.getOrdersInvoiceBody(id));
  const invoiceBoxes = useSelector(ordersSelectors.getOrdersInvoiceBoxes);
  const isLoading = useSelector(
    uiSelectors.getAreRequestsPending([`${getInvoiceBodyActionType}/${id}`, getInvoiceBoxesActionType]),
  );

  const [debouncedLoading, setDebouncedLoading] = useDebounceValue(true, 500);
  const transferData = useMemo(
    () =>
      Object.keys(invoiceBoxes).length
        ? { rightData: invoiceBoxes, leftData: [] }
        : { rightData: { [initialBoxes[0]]: [] }, leftData: invoiceBodyData },
    [invoiceBoxes, invoiceBodyData],
  );

  useEffect(() => {
    dispatch(getInvoiceBoxesAction({ id }));
    if (!invoiceBodyData.length) dispatch(getInvoiceBodyAction({ id, sliceName: ordersSliceName }));
    if (!extras.docNum) dispatch(getInvoiceAction({ id, sliceName: ordersSliceName }));
    return () => {
      dispatch(resetOrdersBoxes());
    };
  }, []);

  useEffect(() => {
    setDebouncedLoading(isLoading);
  }, [isLoading]);

  return debouncedLoading ? (
    <LoadingIndicator />
  ) : (
    <Flex vertical gap='large'>
      <OrderDescriptions invoice={{ ...invoiceData, orderNum, ...extras }} />
      <CrossDockingTransfer data={transferData} onClose={onClose} afterSubmit={afterSubmit} id={id} />
    </Flex>
  );
};
