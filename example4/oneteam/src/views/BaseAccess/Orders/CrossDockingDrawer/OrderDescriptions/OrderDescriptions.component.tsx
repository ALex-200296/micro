import React, { useMemo } from 'react';
import { ProDescriptions } from '@ant-design/pro-components';

import { getDescriptionsColumns, labelStyle } from './OrderDescriptions.data';
import { IOrderDescriptionsProps } from './OrderDescriptions.types';

export const OrderDescriptions: React.FC<IOrderDescriptionsProps> = ({ invoice }) => {
  const columns = useMemo(() => getDescriptionsColumns(invoice), [invoice]);

  return <ProDescriptions column={1} colon={false} size='small' labelStyle={labelStyle} columns={columns} />;
};
