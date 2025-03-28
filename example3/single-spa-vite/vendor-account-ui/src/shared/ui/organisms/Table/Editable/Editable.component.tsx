import React, { memo, useCallback, useMemo, useState } from 'react';
import { BaseTable } from '@shared/ui/molecules';
import { Form } from 'antd';

import { EditableCell } from '../TableCells/EditableCell.component';

import { ActionRow } from './ActionRow/ActionRow.component';
import { getCellInitialValue, getDisabledField, getFinishParams, getOperationRow } from './Editable.data';
import {
  Editable as EditableConst,
  EditableTablePropsType,
  IEditableCellProps,
  PositionActionRow,
} from './Editable.types';

import styles from './Editable.module.scss';

const BaseEditable = <T extends Record<string, any>>({
  editableEntity,
  columns,
  rowKey,
  initialValues,
  onFinish: onFinishProps,
  actionsConfig,
  editingConfig,
  formInstance,
  onValuesChange,
  preserve,
  ...props
}: EditableTablePropsType<T>) => {
  const [form] = formInstance ? [formInstance] : Form.useForm();
  const [editingRowKey, setEditingRowKey] = useState<React.Key>('');
  const isEditing = useCallback((columnKey?: React.Key) => columnKey === editingRowKey, [editingRowKey]);

  const onCancel = useCallback(() => {
    if (editableEntity === EditableConst.row) {
      setEditingRowKey('');
    } else {
      editingConfig.setTableIsEditable?.(false);
    }
    form.resetFields();
  }, [editableEntity]);

  const onEdit = useCallback((rowKey: React.Key) => {
    setEditingRowKey(rowKey);
  }, []);

  const hasActionRow = useCallback(
    (position: (typeof PositionActionRow)[keyof typeof PositionActionRow]) => {
      return position === actionsConfig?.position && editingConfig?.tableIsEditable;
    },
    [actionsConfig, editingConfig],
  );

  const onFinish = useCallback(async () => {
    try {
      await form.validateFields();
      const values: Record<string, Partial<T>> = form.getFieldsValue();
      const params = getFinishParams(values);
      onFinishProps?.(params);
      onCancel();
    } catch (error) {
      void error;
    }
  }, [form, onFinishProps, onCancel]);

  const formItemWrappedColumns = useMemo(() => {
    return columns.map((column) => {
      if (column.key === EditableConst.row)
        return getOperationRow(rowKey, isEditing, column, editingRowKey, onFinish, onEdit, onCancel);
      if (!column.editable) return column;
      return {
        ...column,
        onCell: (record: T): IEditableCellProps => {
          return {
            editing: editableEntity === 'row' ? record[rowKey] === editingRowKey : editingConfig.tableIsEditable,
            style: record.style,
            className: record.className,
            children: record.children,
            formItem: column.formItem && {
              ...column.formItem,
              name: [...(Array.isArray(record[rowKey]) ? record[rowKey] : [record[rowKey]]), column.formItem.name],
              ...(column.formItem.children && {
                children: React.cloneElement(column.formItem.children, {
                  ['data-testid']: [
                    'date-picker',
                    ...(Array.isArray(record[rowKey]) ? record[rowKey] : [record[rowKey]]),
                    column.formItem.name,
                  ].join('-'),
                  ...(column.formItem.disabled && { disabled: getDisabledField(record, column.formItem.disabled) }),
                }),
              }),
              ...(column.formItem.initialValue && {
                initialValue: getCellInitialValue(record, column.formItem.initialValue),
              }),
            },
          };
        },
      };
    });
  }, [columns, editableEntity, isEditing, editingConfig, rowKey]);

  return (
    <Form
      form={form}
      preserve={preserve}
      component={false}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
    >
      {hasActionRow(PositionActionRow.TOP) && (
        <ActionRow
          submitButtonProps={{ ...actionsConfig?.submitButtonProps, onClick: onFinish }}
          cancelButtonProps={{ ...actionsConfig?.cancelButtonProps, onClick: onCancel }}
          className={styles.action_top}
        />
      )}
      <BaseTable
        rowKey={rowKey}
        columns={formItemWrappedColumns}
        {...props}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      />
      {hasActionRow(PositionActionRow.BOTTOM) && (
        <ActionRow
          submitButtonProps={{ ...actionsConfig?.submitButtonProps, onClick: onFinish }}
          cancelButtonProps={{ ...actionsConfig?.cancelButtonProps, onClick: onCancel }}
          className={styles.action_bottom}
        />
      )}
    </Form>
  );
};

export const Editable = memo(BaseEditable) as typeof BaseEditable;
