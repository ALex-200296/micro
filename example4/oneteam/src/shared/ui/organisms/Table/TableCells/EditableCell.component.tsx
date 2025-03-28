import React, { memo } from 'react';
import { FormItem } from '@shared/ui';

import { IEditableCellProps } from '../Editable/Editable.types';

export const EditableCell = memo(({ formItem, editing, children, ...props }: IEditableCellProps) => {
  const { disabled, ...formItemProps } = formItem || ({} as any);
  void disabled;
  return (
    <td {...props}>
      {editing && Object.keys(formItemProps).length ? (
        <FormItem {...formItemProps}>{formItemProps.children}</FormItem>
      ) : (
        children
      )}
    </td>
  );
});
