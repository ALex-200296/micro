import React, { memo, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { ProjectsComputedProperty } from '@app/store/project/project.types';
import { updateProjectDetailsAction } from '@middleware/project/project.saga';
import { Button, DatePicker, dottedFormat, filterOption, FormItem } from '@shared/ui';
import { Form, Input, Select, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import dayjs from 'dayjs';

import { dataTestId, formItemProps, formRequestBody } from './SupplierResponse.data';
import { InitialValues, SupplierResponseProps } from './SupplierResponse.types';

import styles from './SupplierResponse.module.scss';

const SupplierResponse: React.FC<SupplierResponseProps> = ({
  id,
  projectNumber,
  projectName,
  requestNumber,
  statusList,
  currentStatus,
  comment,
  crmDate,
  dateCreate,
  dateChange,
  lpr_list,
  responsible,
  afterSubmit,
}) => {
  const dispatch = useDispatch();
  const initialValues: InitialValues = useMemo(
    () => ({
      projectNumber: projectNumber,
      projectName: projectName,
      requestNumber: requestNumber,
      currentStatus: currentStatus,
      comment: comment,
      crmDate: crmDate ? dayjs(crmDate, dottedFormat) : null,
      dateCreate: dateCreate ? dayjs(dateCreate, dottedFormat) : null,
      dateChange: dateChange ? dayjs(dateChange, dottedFormat) : null,
      responsible: responsible,
    }),
    [],
  );
  const onSubmit = useCallback((values: InitialValues) => {
    const requestBody = formRequestBody(values);
    dispatch(
      updateProjectDetailsAction({
        id: id,
        data: requestBody,
        computedProperty: ProjectsComputedProperty.PROJECT_REQUESTS,
      }),
    );
    afterSubmit();
  }, []);

  const selectFilterOption = useCallback(
    (inputValue: string, option?: DefaultOptionType) => filterOption(inputValue, option, 'label'),
    [],
  );

  return (
    <>
      <Typography.Title level={3} className={styles.title}>
        Ответ поставщика
      </Typography.Title>
      <Form initialValues={initialValues} onFinish={onSubmit} className={styles.form}>
        <FormItem {...formItemProps.requestNumber}>
          <Input />
        </FormItem>
        <FormItem {...formItemProps.projectNumber}>
          <Input />
        </FormItem>
        <FormItem {...formItemProps.projectName}>
          <Input />
        </FormItem>
        <FormItem {...formItemProps.responsible}>
          <Select showSearch filterOption={selectFilterOption}>
            {lpr_list.map((item) => (
              <Select.Option key={item.exm_mancode} value={item.exm_mancode} label={item.fio}>
                <span className={styles.responsible_select_option}>
                  <span>{item.fio}</span>
                  <span>{item.email}</span>
                  <span>{item.phone}</span>
                </span>
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem {...formItemProps.crmDate}>
          <DatePicker dataTestId={`crm-${dataTestId}`} />
        </FormItem>
        <FormItem {...formItemProps.dateCreate}>
          <DatePicker dataTestId={`create-${dataTestId}`} />
        </FormItem>
        <FormItem {...formItemProps.dateChange}>
          <DatePicker dataTestId={`change-${dataTestId}`} />
        </FormItem>
        <FormItem {...formItemProps.currentStatus}>
          <Select options={statusList.map((elem) => ({ value: elem, label: elem }))} />
        </FormItem>
        <FormItem {...formItemProps.comment}>
          <Input.TextArea rows={5} />
        </FormItem>
        <Button dataTestId={`reset-${dataTestId}`} htmlType='reset'>
          Отменить
        </Button>
        <Button dataTestId={`finish-${dataTestId}`} htmlType='submit' type='primary'>
          Отправить ответ
        </Button>
      </Form>
    </>
  );
};

export default memo(SupplierResponse);
