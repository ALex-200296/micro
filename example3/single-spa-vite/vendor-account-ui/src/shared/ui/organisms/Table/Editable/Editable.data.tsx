import React from 'react';
import { isFunction, paramsGenerator } from '@shared/lib';
import { Popconfirm, Space } from 'antd';

import { Button } from '../../../atoms/Button/Button.component';
import { CellInitialValueType, ColumnType } from '../../../molecules/BaseTable/Table.types';
import { IconButton } from '../../../molecules/Button/IconButton/IconButton.component';

import { IGetVariantButtonProps } from './Editable.types';

export const getNameFormItem = (str: string): string[] => str.split(/[_ ,]+/);

export const getCellInitialValue = <T,>(record: T, initialValue: CellInitialValueType<T>) =>
  isFunction(initialValue) ? initialValue(record) : record[initialValue];

export const getDisabledField = <T,>(record: T, disabled: boolean | ((record: T) => boolean)): boolean =>
  isFunction(disabled) ? disabled(record) : disabled;

export const getFinishParams = <T,>(values: Record<string, Partial<T>>): Record<string, Partial<T>> =>
  Object.entries(values).reduce((accum, current) => {
    const [key, value] = current;
    const params = paramsGenerator(Object.entries(value)) as Partial<T>;
    const isEmpty = !Object.keys(params).length;
    return isEmpty ? accum : { ...accum, [key]: params };
  }, {});

export const getVariantButton = ({ icon, ...props }: IGetVariantButtonProps) =>
  icon ? (
    <IconButton dataTestId='table-editable' icon={icon} {...props} />
  ) : (
    <Button dataTestId='table-editable' {...props} />
  );

export const getOperationRow = <T,>(
  rowKey: keyof T,
  isEditing: (key: React.Key) => boolean,
  column: ColumnType<T>,
  editingKey: React.Key,
  onFinish: () => void,
  onEdit: (rowKey: React.Key) => void,
  onCancel: () => void,
): ColumnType<T> => ({
  ...column,
  renderText: (_: any, record: any) => {
    const editing = isEditing(record[rowKey]);
    const {
      saveLabel = 'Сохранить',
      saveIcon = null,
      editName = 'Изменить',
      editIcon = null,
      cancelLabel = 'Отменить',
      cancelIcon = null,
      cancelConfimLabel = 'Вы уверены?',
    } = column.operationCellConfig ? column.operationCellConfig : {};

    return editing ? (
      <Space>
        {getVariantButton({ icon: saveIcon, children: saveLabel, onClick: onFinish })}
        <Popconfirm title={cancelConfimLabel} onConfirm={onCancel}>
          {getVariantButton({ icon: cancelIcon, children: cancelLabel })}
        </Popconfirm>
      </Space>
    ) : (
      getVariantButton({
        icon: editIcon,
        children: editName,
        onClick: () => onEdit(record[rowKey]),
        disabled: editingKey !== '',
      })
    );
  },
});
