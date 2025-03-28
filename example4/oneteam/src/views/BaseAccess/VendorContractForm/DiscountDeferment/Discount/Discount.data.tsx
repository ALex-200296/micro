import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { createId, replacingCommaWithDot } from '@shared/lib';
import { Button, ColumnType } from '@shared/ui';
import { Input, InputNumber, Tooltip } from 'antd';

import { dataTestId } from '../../VendorContractForm.data';
import { GetDataSourceType, StepKey } from '../../VendorContractForm.types';
import { DiscountDefermentKey } from '../DiscountDeferment.types';

import { DiscountKey, IDataSourceValue, IDiscountValues } from './Discount.types';

import styles from '../../VendorContractForm.module.scss';

export const getDiscountInitialValues = (): Record<string, IDiscountValues> => ({
  [createId()]: {
    [DiscountKey.group]: '',
    [DiscountKey.name]: '',
    [DiscountKey.disk]: '',
  },
});

export const getDataSource: GetDataSourceType<Record<string, IDataSourceValue>, IDataSourceValue> = (initialValues) => {
  return Object.entries<IDiscountValues>(initialValues).map(([key, value]) => {
    return { id: [StepKey.discountDeferment, DiscountDefermentKey.discountEntity, key], ...value };
  });
};

export const getColumns = (
  deleteRow: (record: IDataSourceValue) => void,
): ColumnType<IDiscountValues & { id: string[] }>[] => {
  return [
    {
      title: 'Товарная группа',
      dataIndex: DiscountKey.group,
      key: DiscountKey.group,
      width: '35%',
      editable: true,
      formItem: {
        name: DiscountKey.group,
        rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
        children: <Input />,
      },
    },
    {
      title: 'Наименование товара',
      dataIndex: DiscountKey.name,
      width: '35%',
      key: DiscountKey.name,
      editable: true,
      formItem: {
        name: DiscountKey.name,
        rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
        children: <Input />,
      },
    },
    {
      title: 'Скидка',
      width: '20%',
      dataIndex: DiscountKey.disk,
      key: DiscountKey.disk,
      editable: true,
      formItem: {
        name: DiscountKey.disk,
        rules: [
          { required: true, message: 'Пожалуйста, заполните обязательное поле' },
          { required: true, type: 'number', min: 0, max: 100, message: 'Может принимать значение от 0 до 100' },
        ],
        children: (
          <InputNumber
            controls={false}
            className={styles.fullwidth_element}
            parser={replacingCommaWithDot}
            addonAfter={
              <Tooltip title='Коэффициент пересчета от цены, указанной в прайс-листе'>
                <QuestionCircleOutlined data-testid={`tooltip-${dataTestId}-discount`} />
              </Tooltip>
            }
          />
        ),
      },
    },
    {
      title: 'Действие',
      width: '10%',
      renderText: (_, record, idx) =>
        idx ? (
          <Button dataTestId={`${dataTestId}-discount`} onClick={() => deleteRow(record)}>
            Удалить
          </Button>
        ) : (
          <></>
        ),
    },
  ];
};
