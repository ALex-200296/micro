import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import {  EditableConst, Table } from '@shared/ui';
import { Typography } from 'antd';

import { IStepContent } from '../../../VendorContractForm.types';
import { getColumns } from '../../Common/common.data';

import {
  descriptions,
  getDataSource,
  launchDateTooltipText,
  listMessagesInitialValues,
  startDateTooltipText,
} from './ListMessages.data';

const { Title } = Typography;

const ListMessages: React.FC<IStepContent> = ({ form, initialValues }) => {
  const ediTransitionWay = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.CO_TABLE, CodeInfoSearch.EDI_TRANSITION_WAY),
  );

  const dataSource = useMemo(() => getDataSource(listMessagesInitialValues), []);

  return (
    <Table.Editable
      formInstance={form}
      dataSelector={() => dataSource}
      initialValues={initialValues}
      columns={getColumns(
        descriptions,
        'Наименование EDI сообщения',
        ediTransitionWay,
        true,
        startDateTooltipText,
        launchDateTooltipText,
      )}
      bordered
      preserve
      rowKey='id'
      editingConfig={{ tableIsEditable: true }}
      editableEntity={EditableConst.table}
      title={() => <Title level={3}>Список сообщений для электронного обмена данными</Title>}
    />
  );
};

export default memo(ListMessages);
