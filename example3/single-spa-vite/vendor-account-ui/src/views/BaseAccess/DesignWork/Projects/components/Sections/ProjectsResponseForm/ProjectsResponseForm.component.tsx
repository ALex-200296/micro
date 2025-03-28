import React, { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import { projectSelectors } from '@app/store/project/project.selectors';
import { ProjectsComputedProperty } from '@app/store/project/project.types';
import { updateProjectDetailsAction } from '@middleware/project/project.saga';
import { useToggleState } from '@shared/lib';
import { Button, DatePicker, dottedFormat, filterOption, FormItem } from '@shared/ui';
import { Form, Input, Select, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import dayjs from 'dayjs';

import { dataTestId, formItemProps, formRequestBody } from './ProjectsResponseForm.data';
import { InitialValues, ProjectsResponseFormProps } from './ProjectsResponseForm.types';

import styles from './ProjectsResponseForm.module.scss';

const { Link, Title } = Typography;
const ProjectsResponseForm: React.FC<ProjectsResponseFormProps> = ({
  responsible,
  lprList,
  id,
  extCode,
  extStatus,
  extDateChange,
  extDateCreate,
  statusList,
}) => {
  const dispatch = useDispatch();
  const { page, rows } = useSelector(projectSelectors.getProjectsPaginationData(ProjectsComputedProperty.PROJECTS));
  const filters = useSelector(projectSelectors.getProjectsListFilters);
  const { isOpen: editable, handleOpen: handleEnableEditing, handleClose: handleDisableEditing } = useToggleState();

  const initialValues: InitialValues = useMemo(
    () => ({
      responsible: responsible,
      extCode: extCode,
      currentStatus: isNaN(Number(extStatus)) ? extStatus : '',
      dateCreate: extDateCreate ? dayjs(extDateCreate, dottedFormat) : null,
      dateChange: extDateChange ? dayjs(extDateChange, dottedFormat) : null,
    }),
    [responsible, extCode, extStatus, extDateChange, extDateCreate],
  );

  const onFinish = useCallback((values: InitialValues) => {
    const requestBody = formRequestBody(values);
    dispatch(
      updateProjectDetailsAction({
        id: id,
        data: requestBody,
        computedProperty: ProjectsComputedProperty.PROJECTS,
        listFilterData: { page, rows, ...filters },
      }),
    );
    handleDisableEditing();
  }, []);

  const selectFilterOption = useCallback(
    (inputValue: string, option?: DefaultOptionType) => filterOption(inputValue, option, 'label'),
    [],
  );

  return (
    <>
      <div className={styles.title}>
        <Title>Сведения поставщика</Title>
        <span>
          {!editable && (
            <Link onClick={handleEnableEditing}>
              <EditOutlined /> Редактировать
            </Link>
          )}
        </span>
      </div>
      <Form
        initialValues={initialValues}
        className={styles.form}
        disabled={!editable}
        onReset={handleDisableEditing}
        onFinish={onFinish}
      >
        <FormItem {...formItemProps.extCode}>
          <Input />
        </FormItem>
        <FormItem {...formItemProps.responsible}>
          <Select showSearch filterOption={selectFilterOption}>
            {lprList.map((item) => (
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
        <FormItem {...formItemProps.dateCreate}>
          <DatePicker dataTestId={`create-${dataTestId}`} />
        </FormItem>
        <FormItem {...formItemProps.dateChange}>
          <DatePicker dataTestId={`change-${dataTestId}`} />
        </FormItem>
        <FormItem {...formItemProps.currentStatus}>
          <Select options={statusList.map((item) => ({ value: item, label: item }))} />
        </FormItem>
        <Button dataTestId={`reset-${dataTestId}`} htmlType='reset'>
          Отменить
        </Button>
        <Button dataTestId={`finish-${dataTestId}`} htmlType='submit' type='primary'>
          Сохранить изменения
        </Button>
      </Form>
    </>
  );
};

export default memo(ProjectsResponseForm);
