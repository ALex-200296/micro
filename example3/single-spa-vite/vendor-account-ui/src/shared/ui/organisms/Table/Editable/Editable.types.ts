import React from 'react';
import { FormInstance } from 'antd';

import { IButtonProps } from '../../../atoms/Button/Button.types';
import { ColumnType, ITableProps } from '../../../molecules/BaseTable/Table.types';

export const Editable = {
  ROW: 'row',
  TABLE: 'table',
} as const;

export const PositionActionRow = {
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export interface IEditingConfig {
  tableIsEditable: boolean;
  setTableIsEditable?: (value: boolean) => void;
}

export interface IGetVariantButtonProps
  extends Pick<IButtonProps, 'children' | 'icon' | 'onClick' | 'disabled' | 'type'> {
  icon?: React.ReactNode;
}
export interface IActionsConfig {
  position: (typeof PositionActionRow)[keyof typeof PositionActionRow];
  cancelButtonProps?: IGetVariantButtonProps;
  submitButtonProps?: IGetVariantButtonProps;
  className?: string;
}

export interface IEditableCellProps extends Pick<ColumnType<any>, 'formItem'> {
  editing: React.Key | boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface IEditableProps<T> extends ITableProps<T> {
  editableEntity: typeof Editable;
  initialValues?: any;
  onFinish?: (values: Record<string, Partial<T>>) => void;
  formInstance?: FormInstance<any>;
  onValuesChange?: (changedValues: Partial<T>, allValues: T) => void;
  positionActionRow?: (typeof PositionActionRow)[keyof typeof PositionActionRow];
  preserve?: boolean;
}

export type EditableTablePropsType<T> =
  | ({
      editableEntity: typeof Editable.TABLE;
      editingConfig: IEditingConfig;
      actionsConfig?: IActionsConfig;
    } & IEditableProps<T>)
  | ({ editableEntity: typeof Editable.ROW; actionsConfig?: never; editingConfig?: never } & IEditableProps<T>);
