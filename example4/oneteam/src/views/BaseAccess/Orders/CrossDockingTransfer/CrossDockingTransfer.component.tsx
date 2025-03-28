import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InfoParamsGroup, InfoParamsType } from '@app/store/info/info.types';
import { ordersSelectors } from '@app/store/orders/orders.selectors';
import { ordersSliceName } from '@app/store/orders/orders.slice';
import { Transfer, TransferHeader, } from '@features/common/ui';
import { updateInvoiceBodyAction } from '@middleware/invoice/invoice.saga';
import { invoiceOperations, InvoiceProcedure, IReturnAdapterInvoiceBody } from '@middleware/invoice/invoice.types';
import { createId } from '@shared/lib';
import { dashedFormat } from '@shared/ui';
import { Flex, Form, Typography } from 'antd';
import { TransferDirection } from 'antd/es/transfer';
import { TransferKey } from 'antd/es/transfer/interface';
import dayjs from 'dayjs';

import { initialBoxes } from '../CrossDockingDrawer/CrossDockingDrawer.data';

import CrossDockingHeader from './CrossDockingHeader/CrossDockingHeader.component';
import CrossDockingSubmitter from './CrossDockingSubmitter/CrossDockingSubmitter.component';
import HeaderLabelWithButtons from './HeaderLabelWithButtons/HeaderLabelWithButtons.component';
import ProductResults from './ProductResults/ProductResults.component';
import TransferCard from './TransferCard/TransferCard.component';
import {
  activeBoxName,
  addNewBox,
  filterOption,
  getCountText,
  getDataSource,
  getNoContent,
  getProductsForBody,
  getTargetkeys,
  noContentTextLeft,
  noContentTextRight,
  splitProductsByTransferKeys,
  transferHeaderText,
  unionProducts,
  validationErrorText,
} from './CrossDockingTransfer.data';
import {
  ICrossDockingTransfer,
  INoContents,
  OnMoveDirectionType,
  OnMoveType,
  RightStateType,
} from './CrossDockingTransfer.types';

import styles from './CrossDockingTransfer.module.scss';

const { Text } = Typography;

const CrossDockingTransfer: React.FC<ICrossDockingTransfer> = ({
  data: { leftData, rightData },
  onClose,
  id,
  afterSubmit,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {
    page,
    rows,
    sorts: { sidx, dateSort },
    filters: { startDate, endDate, status, orderCode },
  } = useSelector(ordersSelectors.getOrders);
  const [leftState, setLeftState] = useState(leftData);
  const [rightState, setRightState] = useState<RightStateType>(rightData);
  const [boxesState, setBoxesState] = useState(Object.keys(rightData));
  const [activeBox, setActiveBox] = useState<string>(Object.keys(rightData)[0]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);
  const [noContents, setNoContents] = useState<INoContents>({
    noContentTextLeft,
    noContentTextRight,
  });

  const activeBoxNumber = useMemo(() => boxesState.findIndex((box) => box === activeBox) + 1, [boxesState, activeBox]);

  useEffect(() => {
    if (form.getFieldError('transfer').length > 0 && leftState.length === 0) form.validateFields(['transfer']);
  }, [form.getFieldValue('transfer')]);

  const onMoveLeft: OnMoveType = (transferKeys, activeBox, statesToSplit) => {
    const { leftSide, rightSide } = splitProductsByTransferKeys(statesToSplit || rightState[activeBox], transferKeys);
    setLeftState((prev) => unionProducts(leftSide, prev));
    setRightState((prev) => ({
      ...prev,
      [activeBox]: Object.values(rightSide),
    }));
  };

  const onMoveRight: OnMoveType = (transferKeys, activeBox, statesToSplit) => {
    const { leftSide, rightSide } = splitProductsByTransferKeys(statesToSplit || leftState, transferKeys);
    setLeftState(Object.values(leftSide));
    setRightState((prev) => ({
      ...prev,
      [activeBox]: unionProducts(rightSide, prev[activeBox]),
    }));
  };

  const onMove: OnMoveDirectionType = (transferKeys, activeBox, direction) => {
    direction === 'right' ? onMoveRight(transferKeys, activeBox) : onMoveLeft(transferKeys, activeBox);
  };

  const handleChange = (nextTargetKeys: TransferKey[], direction: TransferDirection) => {
    onMove(nextTargetKeys, activeBox, direction);
  };

  const handleBoxSelectChange = (selectedBox: string) => {
    setActiveBox(selectedBox);
  };

  const addBox = () => {
    const newBox = addNewBox();
    setBoxesState((prev) => [...prev, newBox]);
    setRightState((prev) => ({ ...prev, [newBox]: [] }));
    setActiveBox(newBox);
  };

  const removeBox = (selectedBox: string) => {
    if (selectedBox === activeBox) {
      const findedBoxActive = boxesState.findIndex((box) => box === selectedBox);
      setActiveBox(boxesState[findedBoxActive === 0 ? 1 : findedBoxActive - 1]);
    }
    onMove([], selectedBox, 'left');
    setBoxesState((prev) => prev.filter((rowId) => rowId !== selectedBox));
  };

  const onSelectChange = (leftCheckedKeys: React.Key[], rightCheckedKeys: React.Key[]) => {
    const keyArr = [...leftCheckedKeys, ...rightCheckedKeys].map((key) => key.toString());
    setSelectedKeys(keyArr);
  };

  const onFinishProductDivision = (item: IReturnAdapterInvoiceBody, count: number, direction: TransferDirection) => {
    const newRowId = createId();
    const newState = (direction === 'right' ? rightState[activeBox] : leftState).map((product) =>
      product.rowId === item.rowId ? { ...product, productCount: product.productCount - count } : product,
    );
    direction === 'right'
      ? onMoveLeft(getTargetkeys(rightState[activeBox]), activeBox, [
          ...newState,
          { ...item, rowId: newRowId, productCount: count },
        ])
      : onMoveRight([newRowId], activeBox, [...newState, { ...item, rowId: newRowId, productCount: count }]);
  };

  const resetDistribution = useCallback(() => {
    setRightState((prev) => {
      for (const key in prev) {
        onMove([], key, 'left');
      }
      return { [initialBoxes[0]]: [] };
    });
    setBoxesState(initialBoxes);
    setActiveBox(initialBoxes[0]);
    setSelectedKeys(['']);
  }, [onMove]);

  const handleAfterSubmit = () => {
    onClose();
    afterSubmit();
  };

  const onSearch = (direction: TransferDirection, value: string) => {
    setNoContents((prev) => ({ ...prev, ...getNoContent(value, direction) }));
  };

  const onFinish = useCallback(() => {
    dispatch(
      updateInvoiceBodyAction({
        post: {
          id,
          proc: InvoiceProcedure[invoiceOperations.updateCDK],
          body: getProductsForBody(id, rightState),
        },
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
        action: handleAfterSubmit,
      }),
    );
  }, [id, rightState]);

  return (
    <Form onFinish={onFinish} className={styles.transfer_form} form={form}>
      <CrossDockingHeader title={transferHeaderText} onReset={resetDistribution} />
      <Form.Item
        name='transfer'
        validateTrigger={['onSubmit']}
        rules={[
          {
            required: true,
            message: validationErrorText,
            validator: () => (leftState.length > 0 ? Promise.reject() : Promise.resolve()),
          },
        ]}
      >
        <Transfer
          leftTitle={<Text className={styles.transfet_title}>Товары</Text>}
          rowKey={(record) => record.rowId}
          dataSource={getDataSource(leftState, rightState[activeBox])}
          render={(item) => item.rowId}
          onChange={handleChange}
          targetKeys={getTargetkeys(rightState[activeBox])}
          onSearch={onSearch}
          rightTitle={
            <TransferHeader
              items={boxesState}
              addElement={addBox}
              addButtonTitle='Добавить коробку'
              removeElement={removeBox}
              selectElement={handleBoxSelectChange}
              itemTitle={activeBoxName}
              activeBox={activeBox}
            >
              <Text className={styles.transfet_title}>
                {activeBoxName}
                {activeBoxNumber}
              </Text>
            </TransferHeader>
          }
          showSearch
          filterOption={filterOption}
          onSelectChange={onSelectChange}
          selectedKeys={selectedKeys}
          hideDefaultItemCheckbox
          {...noContents}
          selectAllLabels={[
            ({ totalCount }) => <Text className={styles.count_label}>{getCountText(totalCount)}</Text>,
            ({ totalCount }) => (
              <HeaderLabelWithButtons
                labelText={getCountText(totalCount)}
                addBox={addBox}
                removeBox={removeBox}
                activeBox={activeBox}
                deleteBtnDisabled={boxesState.length === 1}
              />
            ),
          ]}
        >
          {({ filteredItems, onItemSelect, selectedKeys: listSelectedKeys, direction }) => {
            return (
              filteredItems.length > 0 && (
                <Flex vertical gap='small'>
                  {filteredItems.map((item) => (
                    <TransferCard
                      key={item.rowId}
                      item={item}
                      activeBoxNumber={activeBoxNumber}
                      direction={direction}
                      selectedKeys={selectedKeys}
                      listSelectedKeys={listSelectedKeys}
                      onItemSelect={onItemSelect}
                      onFinishProductDivision={onFinishProductDivision}
                    />
                  ))}
                </Flex>
              )
            );
          }}
        </Transfer>
      </Form.Item>
      <ProductResults productsData={rightState} boxes={boxesState} />
      <CrossDockingSubmitter onClose={onClose} id={id} />
    </Form>
  );
};

export default memo(CrossDockingTransfer);
