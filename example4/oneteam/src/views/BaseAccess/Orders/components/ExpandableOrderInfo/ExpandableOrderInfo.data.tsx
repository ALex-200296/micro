import React from 'react';
import { FormattedNumber } from 'react-intl';
import { IInfoSearchState } from '@app/store/info/info.types';
import { OrderRowListsType } from '@app/store/orders/orders.types';
import { invoiceOperations } from '@middleware/invoice/invoice.types';
import { ColumnType, DatePicker, disabledPastDate, IActionsConfig, slashedFormat } from '@shared/ui';
import { Checkbox, Divider, Select, Tooltip } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import dayjs from 'dayjs';

import CommentCell from './TableCell/CommentCell.component';
import { ColumnStatusCode, GetOperationColumnsConfig } from './ExpandableOrderInfo.types';

import styles from './ExpandableOrderInfo.module.scss';

export const dataTestId = 'expandable-order-info';
export const expandableRowKey: keyof OrderRowListsType = 'lineNum';
const checkboxForAllRowsTitle = 'Для всего заказа';

const submitChild: Partial<Record<keyof typeof invoiceOperations, string>> = {
  [invoiceOperations.merchAccept]: 'Подтвердить заказ',
  [invoiceOperations.merchReject]: 'Отклонить заказ',
  [invoiceOperations.merchShipment]: 'Подтверить отгрузку',
  [invoiceOperations.merchSplit]: 'Разделить заказ',
  [invoiceOperations.merch1C]: 'Получить файл на email (xml)',
  [invoiceOperations.merchShipkdk]: 'Подтвердить отгрузку',
};

const forAllRowsCheckboxHandler = (
  checked: boolean,
  columnName: string,
  values?: string[],
  setValues?: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  if (values && setValues)
    checked ? setValues([...values, columnName]) : setValues([...values.filter((el) => el !== columnName)]);
};

export const getActionRowConfig = (checkedRows: string[], operation?: keyof typeof invoiceOperations): IActionsConfig =>
  operation
    ? {
        position: 'bottom',
        cancelButtonProps: { children: 'Отменить' },
        submitButtonProps: {
          children: submitChild[operation],
          ...(invoiceOperations.merchSplit === operation ? { disabled: !checkedRows.length } : {}),
        },
      }
    : { position: 'bottom' };

export const getOperationColumnsConfig: GetOperationColumnsConfig = ({
  columnValuesForAllRows,
  setCheckedRows,
  setColumnValuesForAllRows,
  statusRejectOptions,
}) => ({
  [invoiceOperations.merchAccept]: {
    supplierDate: {
      editable: true,
      fixed: 'right',
      formItem: {
        name: 'supplierDateAccept',
        rules: [{ required: true, message: '' }],
        disabled: (record) => !!record.requiredDeliveryDate,
        initialValue: (record) => {
          return record.requiredDeliveryDate ? dayjs(record.requiredDeliveryDate, slashedFormat) : null;
        },

        children: (
          <DatePicker disabledDate={disabledPastDate} placeholder='' dataTestId={`merch-accept-${dataTestId}`} />
        ),
      },
    },
  },
  [invoiceOperations.merchReject]: {
    supplierDate: {
      editable: true,
      width: '8rem',
      fixed: 'right',
      formItem: {
        className: styles.date_cell,
        name: 'supplierDateReject',
        initialValue: (record) => {
          return record.supplierDate ? dayjs(record.supplierDate, slashedFormat) : null;
        },
        children: (
          <DatePicker
            disabledDate={disabledPastDate}
            placeholder=''
            dataTestId={`merch-reject-${dataTestId}`}
            popupClassName={styles.datepicker_extra_footer}
            renderExtraFooter={() => (
              <Checkbox
                className={styles.checkbox}
                checked={columnValuesForAllRows?.includes('supplierDateReject')}
                onChange={(e) =>
                  forAllRowsCheckboxHandler(
                    e.target.checked,
                    'supplierDateReject',
                    columnValuesForAllRows,
                    setColumnValuesForAllRows,
                  )
                }
              >
                {checkboxForAllRowsTitle}
              </Checkbox>
            )}
          />
        ),
      },
    },
    rejectionReason: {
      editable: true,
      width: '10rem',
      fixed: 'right',
      formItem: {
        className: styles.select_cell,
        name: 'rejectionReason',
        rules: [{ required: true, message: '' }],
        initialValue: (record) => record.rejectionReason || '',
        children: (
          <Select
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider className={styles.checkbox_divider} />
                <Checkbox
                  className={styles.checkbox}
                  checked={columnValuesForAllRows?.includes('rejectionReason')}
                  onChange={(event) =>
                    forAllRowsCheckboxHandler(
                      event.target.checked,
                      'rejectionReason',
                      columnValuesForAllRows,
                      setColumnValuesForAllRows,
                    )
                  }
                >
                  {checkboxForAllRowsTitle}
                </Checkbox>
              </>
            )}
          >
            {statusRejectOptions?.map((item) => (
              <Select.Option key={item.id} value={item.code}>
                <Tooltip title={item.label}>
                  <span data-testid={`tooltip-${dataTestId}`}>{item.label}</span>
                </Tooltip>
              </Select.Option>
            ))}
          </Select>
        ),
      },
    },

    comment: {
      editable: true,
      fixed: 'right',
      formItem: {
        className: styles.form_item,
        name: 'comment',
        children: <CommentCell isEdidable />,
      },
    },
  },
  [invoiceOperations.merchShipment]: {},
  [invoiceOperations.merchSplit]: {
    productDivision: {
      editable: true,
      formItem: {
        className: styles.productDivision_cell,
        name: 'productDivision',
        valuePropName: 'checked',
        children: (
          <Checkbox
            onChange={(e) =>
              setCheckedRows?.((prev) =>
                e.target.checked ? [...prev, e.target.value] : prev.filter((rows) => rows !== e.target.value),
              )
            }
          />
        ),
      },
    },
  },
  [invoiceOperations.merch1C]: {},
});

export const getOrdersColumnsConfig = (
  statusCode: string,
  statusRejectOptions: IInfoSearchState[],
  requiredDeliveryDateSort?: SortOrder,
  operation?: keyof typeof invoiceOperations,
  setCheckedRows?: React.Dispatch<React.SetStateAction<string[]>>,
  columnValuesForAllRows?: string[],
  setColumnValuesForAllRows?: React.Dispatch<React.SetStateAction<string[]>>,
): ColumnType<OrderRowListsType>[] => [
  ...(operation === invoiceOperations.merchSplit
    ? [
        {
          title: ' ',
          dataIndex: 'productDivision',
          key: 'productDivision',
          ...(operation && getOperationColumnsConfig({ setCheckedRows })[operation]?.['productDivision']),
          width: '3%',
        },
      ]
    : []),
  {
    title: 'Код товара',
    dataIndex: 'productCode',
    key: 'productCode',
    width: '6%',
  },
  {
    title: 'Код товара клиента',
    dataIndex: 'clientProductCode',
    key: 'clientProductCode',
    renderText: (_, record) => record.clientProductCode || '-',
    width: '6%',
  },
  {
    title: 'Наименование',
    dataIndex: 'productName',
    key: 'productName',
    width: '21rem',
  },
  {
    title: 'Производитель',
    dataIndex: 'manufacturer',
    key: 'manufacturer',
    width: '8%',
  },
  {
    title: 'Артикул',
    dataIndex: 'article',
    key: 'article',
    width: '6%',
  },
  {
    title: 'Количество',
    dataIndex: 'productCount',
    key: 'productCount',
    width: '6%',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
    renderText: (record) => <FormattedNumber value={record} />,
    width: '4%',
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    key: 'sum',
    renderText: (record) => <FormattedNumber value={record} />,
    width: '4%',
  },
  {
    title: 'Треб.дата поставки',
    dataIndex: 'requiredDeliveryDate',
    key: 'requiredDeliveryDate',
    sorter: {
      compare: (a) => (!a.requiredDeliveryDate ? -1 : 1),
    },
    sortOrder: requiredDeliveryDateSort,
    renderText: (_, record) => record.requiredDeliveryDate || '-',
    width: '7%',
  },
  {
    title: 'Дата поставщика',
    dataIndex: 'supplierDate',
    key: 'supplierDate',
    renderText: (_, record) => record.supplierDate || '-',
    ...(operation &&
      getOperationColumnsConfig({ columnValuesForAllRows, setColumnValuesForAllRows })[operation]?.['supplierDate']),
    width: '9%',
  },
  {
    title: 'Причина отказа',
    dataIndex: 'rejectionReason',
    key: 'rejectionReason',
    renderText: (_, record) => record.rejectionReason || '-',
    ...(operation &&
      getOperationColumnsConfig({
        setCheckedRows,
        statusRejectOptions,
        columnValuesForAllRows,
        setColumnValuesForAllRows,
      })[operation]?.['rejectionReason']),
    width: '15rem',
  },
  ...(ColumnStatusCode.merchReject === statusCode || operation === 'merchReject'
    ? [
        {
          title: '',
          dataIndex: 'comment',
          key: 'comment',
          align: 'center',
          renderText: (_, record) => <CommentCell comment={record.comment} />,
          ...(operation && getOperationColumnsConfig({})[operation]?.['comment']),
          width: '4%',
        } as ColumnType<OrderRowListsType>,
      ]
    : []),
];

export const unifyFormItemName = (values: Record<string, Partial<OrderRowListsType>>) => {
  return Object.entries(values).reduce((acc: Record<string, Partial<OrderRowListsType>>, [key, value]) => {
    const { supplierDateReject, supplierDateAccept, ...rest } = value as any;
    acc[key] = {
      ...rest,
      supplierDate: supplierDateReject || supplierDateAccept || value.supplierDate,
    };
    return acc;
  }, {});
};

export const tableTitle: Partial<Record<keyof typeof invoiceOperations, string>> = {
  [invoiceOperations.merchAccept]: 'Подтверждение заказа',
  [invoiceOperations.merchSplit]: 'Разделение заказа',
  [invoiceOperations.merchReject]: 'Отклонение заказа',
  [invoiceOperations.merch1C]: 'Отправить заказ в 1С',
  [invoiceOperations.merchShipment]: 'Отгрузка заказа прямой доставкой. Подтверждение отгрузки',
  [invoiceOperations.merchKdk]: 'Отгрузка заказа кросс-докингом. Распределение по коробкам',
  [invoiceOperations.merchShipkdk]: 'Отгрузка заказа кросс-докингом. Подтверждение отгрузки',
};
