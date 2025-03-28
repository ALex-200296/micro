import React, { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { convertNameFiles, FileInput, getNumForFiles } from '@features/common/ui';
import { mailSendAction } from '@middleware/mail/mail.saga';
import { postTemplateAction } from '@middleware/template/template.saga';
import { Button, FormItem } from '@shared/ui';
import { Alert, Form, Input } from 'antd';

import {
  dataTestId,
  fieldsProps,
  fileInputProps,
  initialValues,
  subjectEmail,
  textAreaProps,
} from './GetAccessForm.data';
import { IGetAccessModalProps, IInitialValuesState } from './GetAccessForm.types';

import styles from './GetAccessForm.module.scss';

const GetAccessForm: React.FC<IGetAccessModalProps> = ({
  afterSubmit,
  message = 'Максимальный размер одного файла 100 Мб.',
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [validationError, setValidationError] = useState(false);

  const handleFormChange = useCallback(() => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setValidationError(hasErrors);
  }, []);

  const onFinish = useCallback((values: IInitialValuesState) => {
    const {
      files: { fileList },
      description,
      email,
    } = values;
    const emailParam = {
      subject: subjectEmail,
      content: [
        { label: 'Email', value: email },
        { label: 'Описание вопроса:', value: description },
      ],
    };
    if (fileList.length) {
      const convertedFileList = convertNameFiles(fileList);
      const numForFiles = getNumForFiles(convertedFileList);
      dispatch(
        postTemplateAction({
          files: convertedFileList,
          rc: 'lkp_files',
          man: 'access',
          num: numForFiles,
          actions: [
            {
              type: mailSendAction.type,
              payload: {
                ...emailParam,
                url: 'lkp_files/access',
              },
            },
          ],
        }),
      );
    } else {
      dispatch(mailSendAction(emailParam));
    }
    afterSubmit?.();
  }, []);

  return (
    <Form
      form={form}
      className={styles.form}
      onFinish={onFinish}
      initialValues={initialValues}
      onFieldsChange={handleFormChange}
    >
      <FormItem {...fieldsProps.email}>
        <Input />
      </FormItem>
      <FormItem {...fieldsProps.description}>
        <Input.TextArea {...textAreaProps} />
      </FormItem>
      <Alert className={styles.alert} message={message} type='warning' showIcon />
      <FormItem {...fieldsProps.files}>
        <FileInput {...fileInputProps} />
      </FormItem>
      <FormItem className={styles.btn}>
        <Button dataTestId={dataTestId} htmlType='submit' type='primary' disabled={validationError}>
          Отправить
        </Button>
      </FormItem>
    </Form>
  );
};

export default memo(GetAccessForm);
