import React, { memo, useEffect, useReducer } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { FormItem, IconButton } from '@shared/ui';
import { Checkbox, Form, Input, Space, Typography } from 'antd';

import { dataTestId } from '../VendorForm.data';

import { contactInfoFieldsProps, contractPreviewOptions } from './VendorFormSections.data';

import styles from '../VendorForm.module.scss';

const { Title } = Typography;

const ContactInfo: React.FC = () => {
  const form = Form.useFormInstance();
  const typeOfContract = Form.useWatch('typeOfContract', form);
  const deJuroAddress = Form.useWatch(contactInfoFieldsProps.deJuroAddress.name, form);
  const isAgentScheme = typeOfContract === contractPreviewOptions[1].value;
  const [checked, setChecked] = useReducer((previous) => !previous, false);

  useEffect(() => {
    if (checked) {
      form.setFieldValue(contactInfoFieldsProps.deFactoAddress.name, deJuroAddress);
      form.validateFields([contactInfoFieldsProps.deFactoAddress.name])
    }
  }, [checked, deJuroAddress]);

  return (
    <Space direction='vertical' className={styles.space_container} size='middle'>
      <FormItem {...contactInfoFieldsProps.fio}>
        <Input />
      </FormItem>
      <FormItem {...contactInfoFieldsProps.position}>
        <Input />
      </FormItem>
      <FormItem {...contactInfoFieldsProps.email}>
        <Input />
      </FormItem>
      <FormItem {...contactInfoFieldsProps.phone}>
        <Input />
      </FormItem>
      <FormItem {...contactInfoFieldsProps.deJuroAddress}>
        <Input />
      </FormItem>
      <FormItem
        {...contactInfoFieldsProps.deFactoAddress}
      >
        <Input readOnly={checked} />
      </FormItem>
      <Checkbox checked={checked} onChange={setChecked} id='contract-info-checkbox'>
        Совпадает с юридическим адресом
      </Checkbox>

      <Title level={3}>Адреса складов вашей организации:</Title>
      <Form.List name={contactInfoFieldsProps.warehouses.name}>
        {(fields, { add, remove }) => (
          <Space direction='vertical' className={styles.fullwidth_element} size='middle'>
            {fields.map((field, index) => (
              <Space.Compact key={index + field.key} className={styles.fullwidth_element}>
                <FormItem
                  name={field.name}
                  label={`${contactInfoFieldsProps.warehouses.label}${index + 1}`}
                  rules={contactInfoFieldsProps.warehouses.rules}
                >
                  <Input />
                </FormItem>
                {!!index && (
                  <IconButton
                    dataTestId={`warehouses-delete-${dataTestId}-contact-info`}
                    icon={<DeleteOutlined />}
                    onClick={() => remove(field.name)}
                  />
                )}
              </Space.Compact>
            ))}
            <IconButton
              dataTestId={`warehouses-add-${dataTestId}-contact-info`}
              icon={<PlusOutlined />}
              onClick={() => add('')}
            >
              Добавить склад
            </IconButton>
          </Space>
        )}
      </Form.List>
      {isAgentScheme && (
        <>
          <Title level={3}>Информация о клиентах:</Title>
          <Form.List name={contactInfoFieldsProps.holdings.name}>
            {(fields, { add, remove }) => (
              <Space direction='vertical' className={styles.fullwidth_element} size='middle'>
                {fields.map((field, index) => (
                  <React.Fragment key={field.key + field.name}>
                    <Space.Compact className={styles.fullwidth_element}>
                      <FormItem
                        name={[field.name, contactInfoFieldsProps.holdings.listFormItemProps?.address.name]}
                        label={contactInfoFieldsProps.holdings.label}
                      >
                        <Input />
                      </FormItem>
                      {!!index && (
                        <IconButton
                          dataTestId={`holdings-delete-${dataTestId}-contact-info`}
                          icon={<DeleteOutlined />}
                          onClick={() => remove(field.name)}
                        />
                      )}
                    </Space.Compact>
                    <FormItem
                      valuePropName='checked'
                      name={[field.name, contactInfoFieldsProps.holdings.listFormItemProps?.hasContract.name]}
                    >
                      <Checkbox>{contactInfoFieldsProps.holdings.listFormItemProps?.hasContract.label}</Checkbox>
                    </FormItem>
                  </React.Fragment>
                ))}
                <IconButton
                  dataTestId={`holdings-add-${dataTestId}-contact-info`}
                  icon={<PlusOutlined />}
                  onClick={() => add({ hasContract: false, address: '' })}
                >
                  Добавить холдинг
                </IconButton>
              </Space>
            )}
          </Form.List>
        </>
      )}
    </Space>
  );
};

export default memo(ContactInfo);
