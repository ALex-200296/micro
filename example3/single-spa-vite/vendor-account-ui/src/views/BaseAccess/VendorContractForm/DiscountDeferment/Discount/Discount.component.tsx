import React, { memo, useCallback, useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { EditableConst, IconButton, Table } from '@shared/ui';
import { Form } from 'antd';
import cn from 'classnames';

import { IStepContent, StepKey } from '../../VendorContractForm.types';
import { DiscountDefermentKey } from '../DiscountDeferment.types';

import { getColumns, getDataSource, getDiscountInitialValues } from './Discount.data';
import { IDataSourceValue } from './Discount.types';

import styles from '../../VendorContractForm.module.scss';

const Discount: React.FC<IStepContent> = ({ form }) => {
  const discount = Form.useWatch([StepKey.DISCOUNT_DEFERMENT, DiscountDefermentKey.DISCOUNT_ENTITY], {
    form,
    preserve: true,
  });
  const dataSource = form
    ? getDataSource(form.getFieldValue([StepKey.DISCOUNT_DEFERMENT, DiscountDefermentKey.DISCOUNT_ENTITY]))
    : [];

  const addRow = useCallback(() => {
    form.setFieldValue([StepKey.DISCOUNT_DEFERMENT, DiscountDefermentKey.DISCOUNT_ENTITY], {
      ...form.getFieldValue([StepKey.DISCOUNT_DEFERMENT, DiscountDefermentKey.DISCOUNT_ENTITY]),
      ...getDiscountInitialValues(),
    });
  }, [form]);

  const deleteRow = useCallback(
    (record: IDataSourceValue) => {
      form.setFieldValue([StepKey.DISCOUNT_DEFERMENT, DiscountDefermentKey.DISCOUNT_ENTITY], {
        ...Object.fromEntries(
          Object.entries(form.getFieldValue([StepKey.DISCOUNT_DEFERMENT, DiscountDefermentKey.DISCOUNT_ENTITY])).filter(
            ([key]) => !record.id.includes(key),
          ),
        ),
      });
    },
    [form],
  );
  void discount;
  const columns = useMemo(() => getColumns(deleteRow), [deleteRow]);
  return (
    <Table.Editable
      formInstance={form}
      dataSelector={() => dataSource}
      columns={columns}
      preserve
      bordered
      rowKey='id'
      editingConfig={{ tableIsEditable: true }}
      editableEntity={EditableConst.table}
      footer={() => (
        <IconButton dataTestId='discount' icon={<PlusOutlined />} onClick={addRow}>
          Добавить строку
        </IconButton>
      )}
      className={cn(styles.space_container, styles.content)}
    />
  );
};

export default memo(Discount);
