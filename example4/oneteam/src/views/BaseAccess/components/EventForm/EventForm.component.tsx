import React, { memo, useCallback, useMemo, useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { FileInput, statusItemRender } from '@features/common/ui';
import { Button, DatePicker, disabledPastDate, FormItem, TimeRangePicker } from '@shared/ui';
import { AutoComplete, Flex, Form, Input, Select, Typography, UploadFile } from 'antd';

import {
  dataTestId,
  getDisabledFields,
  getFormItemsProps,
  getVisibleFields,
  projectFieldNames,
} from './EventForm.data';
import { EventKeys, IEventFormProps } from './EventForm.types';

import styles from './EventForm.module.scss';

const { Search } = Input;
const { Title } = Typography;

const EventForm: React.FC<IEventFormProps> = ({
  initialValues,
  onFinish,
  onCancel,
  btnSubmitName,
  subThemeOptions,
  form,
  onValuesChange,
  foundClient,
  eventHandles = {},
  visibleFields: visibleFieldsProps = {},
  disabledFields: disabledFieldsProps = {},
  loadingFields = {},
  clientSelectOptions = [],
  responsibleSelectOptions = [],
  exmManCodeSelectOptions = [],
  statusSelectOptions = [],
  projectOptions = [],
  otherProps,
}) => {
  const [validationError, setValidationError] = useState(false);

  const handleFormChange = useCallback(() => {
    if (form) {
      const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
      setValidationError(hasErrors);
    }
  }, []);
  const visibleFields = useMemo(() => getVisibleFields(visibleFieldsProps), [visibleFieldsProps]);
  const disabledFields = useMemo(() => getDisabledFields(disabledFieldsProps), [disabledFieldsProps]);
  const formItemsProps = useMemo(
    () =>
      getFormItemsProps({
        foundClient,
        responsibleOptions: responsibleSelectOptions,
        exmManCodeOptions: exmManCodeSelectOptions,
        otherProps,
      }),
    [foundClient, responsibleSelectOptions, exmManCodeSelectOptions, otherProps],
  );

  const itemRender = useCallback(
    (originNode: React.ReactElement<any, string | React.JSXElementConstructor<any>>, file: UploadFile<any>) => {
      const className = `${originNode.props.className}${!file.originFileObj ? ` ${styles.file}` : ''}`;
      const status = statusItemRender(file, undefined, 100);
      return React.cloneElement(originNode, { className: `${className}${status}` });
    },
    [],
  );

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      className={styles.form}
      onValuesChange={onValuesChange}
      onFieldsChange={handleFormChange}
      feedbackIcons={() => ({ success: <CheckCircleOutlined /> })}
    >
      <Title level={5}>Сведения</Title>
      <FormItem {...formItemsProps[EventKeys.subTheme]}>
        <Select options={subThemeOptions} labelInValue disabled={disabledFields?.[EventKeys.subTheme]} />
      </FormItem>
      {visibleFields?.[EventKeys.status] && (
        <FormItem {...formItemsProps.status}>
          <Select options={statusSelectOptions} labelInValue />
        </FormItem>
      )}
      <FormItem {...formItemsProps[EventKeys.date]}>
        <DatePicker allowClear={false} disabledDate={disabledPastDate} dataTestId={dataTestId} />
      </FormItem>
      <FormItem {...formItemsProps[EventKeys.rangeTime]}>
        <TimeRangePicker
          placeholder={['*Время начала', '*Время окончания']}
          allowClear={false}
          dataTestId={dataTestId}
        />
      </FormItem>
      {visibleFields?.[EventKeys.project] && (
        <FormItem {...formItemsProps[EventKeys.project]}>
          <AutoComplete
            fieldNames={projectFieldNames}
            options={projectOptions}
            onSelect={eventHandles?.[EventKeys.project]?.select}
            disabled={disabledFields?.[EventKeys.project]}
            onSearch={eventHandles?.[EventKeys.project]?.search}
          >
            <Search
              enterButton='Найти проект'
              loading={loadingFields?.[EventKeys.project]}
              onSearch={eventHandles?.[EventKeys.project]?.searchChildren}
            />
          </AutoComplete>
        </FormItem>
      )}
      {visibleFields?.[EventKeys.exmManCode] && (
        <>
          <Title level={5}>Поставщик</Title>
          <FormItem {...formItemsProps.exmManCode}>
            <Select mode='multiple' options={exmManCodeSelectOptions} labelInValue />
          </FormItem>
        </>
      )}
      {visibleFields?.[EventKeys.client] && (
        <>
          <Title level={5}>Партнер</Title>
          <FormItem {...formItemsProps[EventKeys.client]}>
            <Select
              showSearch
              options={clientSelectOptions}
              labelInValue
              filterOption={() => true}
              disabled={disabledFields?.[EventKeys.client]}
              onSearch={eventHandles?.[EventKeys.client]?.search}
              onSelect={eventHandles?.[EventKeys.client]?.select}
            />
          </FormItem>
        </>
      )}
      {visibleFields?.[EventKeys.responsible] && (
        <>
          <Title level={5}>Ответственный ЭТМ</Title>
          <FormItem {...formItemsProps[EventKeys.responsible]}>
            <Select
              options={responsibleSelectOptions}
              onSelect={eventHandles?.[EventKeys.responsible]}
              disabled={disabledFields?.[EventKeys.responsible]}
            />
          </FormItem>
        </>
      )}
      <FormItem {...formItemsProps.task}>
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 3 }} allowClear />
      </FormItem>
      {visibleFields?.[EventKeys.files] && (
        <FormItem {...formItemsProps.files}>
          <FileInput
            dataTestId={dataTestId}
            multiple
            defaultFileList={initialValues?.files?.fileList as UploadFile[]}
            itemRender={itemRender}
          />
        </FormItem>
      )}
      <Flex gap='small'>
        <Button dataTestId={dataTestId + '-cancel'} onClick={onCancel}>
          Отменить
        </Button>
        <Button dataTestId={dataTestId} htmlType='submit' type='primary' disabled={validationError}>
          {btnSubmitName}
        </Button>
      </Flex>
    </Form>
  );
};

export default memo(EventForm);
