import React, { memo } from 'react';
import { ParamsType, ProColumnType, ProTableProps } from '@ant-design/pro-components';
import { IOnChangeData } from '@shared/lib/types';
import { IFormItemProps } from '@shared/ui/atoms/Form/FormItem/FormItem.types';
import { RootState } from '@store/root.store';

export const typedMemo: <T>(props: T) => T = memo;

export type CellInitialValueType<T> = ((record: T) => any) | keyof T;

export type ColumnType<T> = Omit<ProColumnType<T>, 'editable'> & {
  editable?: boolean;
  operationCellConfig?: {
    saveLabel?: string;
    cancelLabel?: string;
    editName?: string;
    cancelConfimLabel?: string;
    saveIcon?: React.ReactNode;
    cancelIcon?: React.ReactNode;
    editIcon?: React.ReactNode;
  };
  formItem?: Omit<IFormItemProps, 'initialValue'> & {
    initialValue?: CellInitialValueType<T>;
    disabled?: boolean | ((record: T) => boolean);
  };
};

export interface ITableProps<T>
  extends Omit<ProTableProps<T, Partial<ParamsType>>, 'rootClassName' | 'onChange' | 'columns' | 'rowKey' | 'options'> {
  columns: ColumnType<T>[];
  dataSelector?: (state: RootState) => readonly T[];
  rowKey: keyof T;
  onChange?: (data: IOnChangeData) => void;
  options?: ProTableProps<T, Partial<ParamsType>>['options'] | boolean;
}
