import React from 'react';
import { createId } from '@shared/lib';
import { Button, ColumnType } from '@shared/ui';
import { dataTestId } from '@views/BaseAccess/VendorContractForm/VendorContractForm.data';
import { Input } from 'antd';

import { GetDataSourceType } from '../../../VendorContractForm.types';

import { EmployeesKey, IDataSourceValue, IEmployeesValues } from './Employees.types';

export const getEmployeesInitialValues = (): Record<string, IEmployeesValues> => ({
  [createId()]: {
    [EmployeesKey.FIO]: '',
    [EmployeesKey.POSITION]: '',
    [EmployeesKey.PHONE_OR_EMAIL]: '',
  },
});

export const getDataSource: GetDataSourceType<Record<string, IDataSourceValue>, IDataSourceValue> = (
  initialValues,
  pathValues,
) => {
  return Object.entries<IEmployeesValues>(initialValues).map(([key, value]) => {
    return {
      id: [...(pathValues ? pathValues : []), key],
      ...value,
    } as IDataSourceValue;
  });
};

export const getColumns = (
  deleteRow: (record: IDataSourceValue) => void,
): ColumnType<IEmployeesValues & { id: string[] }>[] => {
  return [
    {
      title: 'ФИО',
      dataIndex: EmployeesKey.FIO,
      key: EmployeesKey.FIO,
      width: '30%',
      editable: true,
      formItem: {
        name: EmployeesKey.FIO,
        rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
        children: <Input />,
      },
    },
    {
      title: 'Должность',
      dataIndex: EmployeesKey.POSITION,
      key: EmployeesKey.POSITION,
      width: '30%',
      editable: true,
      formItem: {
        name: EmployeesKey.POSITION,
        rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
        children: <Input />,
      },
    },
    {
      title: 'Телефон, email',
      dataIndex: EmployeesKey.PHONE_OR_EMAIL,
      key: EmployeesKey.PHONE_OR_EMAIL,
      width: '30%',
      editable: true,
      formItem: {
        name: EmployeesKey.PHONE_OR_EMAIL,
        rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
        children: <Input />,
      },
    },
    {
      title: 'Действие',
      width: '10%',
      renderText: (_, record, idx) =>
        idx ? (
          <Button dataTestId={`delete-${dataTestId}-employees`} onClick={() => deleteRow(record)}>
            Удалить
          </Button>
        ) : (
          <></>
        ),
    },
  ];
};
