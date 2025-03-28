import React, { memo, useMemo } from 'react';
import { EditableConst, Table } from '@shared/ui';
import { Typography } from 'antd';

import { IStepContent } from '../../../VendorContractForm.types';
import { getColumns } from '../../Common/common.data';

import {
  descriptions,
  getDataSource,
  launchDateTooltipText,
  startDateTooltipText,
  uzedoTermValues,
} from './UzedoTerm.data';

const { Title } = Typography;

const UzedoTerm: React.FC<IStepContent> = ({ form, initialValues }) => {
  const dataSource = useMemo(() => getDataSource(uzedoTermValues), []);
  return (
    <Table.Editable
      formInstance={form}
      dataSelector={() => dataSource}
      initialValues={initialValues}
      columns={getColumns(
        descriptions,
        'Наименование документа',
        [],
        false,
        startDateTooltipText,
        launchDateTooltipText,
      )}
      bordered
      preserve
      rowKey='id'
      editingConfig={{ tableIsEditable: true }}
      editableEntity={EditableConst.table}
      title={() => <Title level={3}>Сроки организации ЮЗЭДО</Title>}
    />
  );
};

export default memo(UzedoTerm);
