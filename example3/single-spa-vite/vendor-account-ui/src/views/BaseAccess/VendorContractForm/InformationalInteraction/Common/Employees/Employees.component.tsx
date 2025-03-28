import React, { memo, useCallback, useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { EditableConst, IconButton, Table } from '@shared/ui';
import { dataTestId } from '@views/BaseAccess/VendorContractForm/VendorContractForm.data';
import { Form, Typography } from 'antd';

import { getColumns, getDataSource, getEmployeesInitialValues } from './Employees.data';
import { IDataSourceValue, IEmployeesProps } from './Employees.types';

const { Title } = Typography;

const Employees: React.FC<IEmployeesProps> = ({ form, initialValues, tableTitle, pathValues }) => {
  const employees = Form.useWatch(pathValues, {
    form,
    preserve: true,
  });
  const dataSource = form ? getDataSource(form.getFieldValue(pathValues), pathValues) : [];

  const addRow = useCallback(() => {
    form.setFieldValue(pathValues, {
      ...form.getFieldValue(pathValues),
      ...getEmployeesInitialValues(),
    });
  }, [form]);

  const deleteRow = useCallback(
    (record: IDataSourceValue) => {
      form.setFieldValue(pathValues, {
        ...Object.fromEntries(
          Object.entries(form.getFieldValue(pathValues)).filter(([key]) => !record.id.includes(key)),
        ),
      });
    },
    [form],
  );
  void employees;
  const columns = useMemo(() => getColumns(deleteRow), [deleteRow]);
  return (
    <Table.Editable
      formInstance={form}
      initialValues={initialValues}
      dataSelector={() => dataSource}
      columns={columns}
      preserve
      bordered
      rowKey='id'
      editingConfig={{ tableIsEditable: true }}
      editableEntity={EditableConst.table}
      title={() => <Title level={3}>{tableTitle}</Title>}
      footer={() => (
        <IconButton dataTestId={`add-row-${dataTestId}-employees`} icon={<PlusOutlined />} onClick={addRow}>
          Добавить строку
        </IconButton>
      )}
    />
  );
};

export default memo(Employees);
