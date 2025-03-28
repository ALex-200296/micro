import React, { memo, useEffect, useMemo, useState } from 'react';
import { FileInput } from '@features/common/ui';
import { Button, FormItem, TemplateFileAware } from '@shared/ui';
import { Alert, Descriptions, Form, Space, Typography } from 'antd';

import { dataTestId, fieldsProps, initialValues } from './FileLoadForm.data';
import { IFileLoadFormProps, IFileLoadInitialValuesState } from './FileLoadForm.types';

import styles from './FileLoadForm.module.scss';

const { Text } = Typography;

const BaseFileLoadForm: React.FC<IFileLoadFormProps> = ({
  descriptions,
  colon,
  template,
  onFinish,
  subtitle,
  rules,
  accept,
  fileSizeAccept,
  uploadHint,
  multiple,
  message = 'Вы можете загрузить до 100 файлов за один раз.\nМаксимальный размер одного файла 100 Мб.',
  maxCount = 100,
  extraForm,
}) => {
  const [form] = Form.useForm();
  const files = Form.useWatch<IFileLoadInitialValuesState['files']>('files', form);
  const values = Form.useWatch([], form);
  const [validationError, setValidationError] = useState(false);

  const addonForm = useMemo(() => extraForm?.(form), [form]);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        setValidationError(false);
      })
      .catch((reason) => {
        if (reason?.errorFields?.length) {
          setValidationError(true);
        }
      });
  }, [form, values]);

  return (
    <Space direction='vertical' className={styles.space}>
      {!!subtitle && <Text>{subtitle}</Text>}
      {!!descriptions &&
        descriptions.map(({ title, text }, idx) => (
          <Descriptions
            colon={colon}
            key={title + idx}
            column={1}
            title={title}
            className={styles.descriptions}
            items={text.map(({ name, label }, idx) => ({ key: name + idx, children: name, label }))}
          />
        ))}
      {!!template && <TemplateFileAware {...template} className={styles.template} />}
      <Alert message={message} type='warning' showIcon className={styles.alert} />
      {addonForm}
      <Form form={form} initialValues={initialValues} onFinish={onFinish} className={styles.form}>
        <FormItem {...fieldsProps.files} rules={rules} className={styles.file_input}>
          <FileInput
            maxCount={maxCount}
            multiple={multiple}
            accept={accept}
            uploadHint={uploadHint}
            fileSizeAccept={fileSizeAccept}
            dataTestId={dataTestId}
          />
        </FormItem>
        {!!files && files.fileList.length > 0 && (
          <FormItem className={styles.btn}>
            <Button dataTestId={dataTestId} htmlType='submit' type='primary' disabled={validationError}>
              Загрузить файл
            </Button>
          </FormItem>
        )}
      </Form>
    </Space>
  );
};

export const FileLoadForm = memo(BaseFileLoadForm) as typeof BaseFileLoadForm;
