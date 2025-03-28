import React, { memo, useCallback, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { factoringSelectors } from '@app/store/factoring/factoring.selector';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { convertNameFiles, FileInput, getNumForFiles } from '@features/common/ui';
import { getJobUuidAction, getJobUuidActionType, postUuidAction } from '@middleware/reports/reports.saga';
import { postTemplateAction, postTemplateActionType } from '@middleware/template/template.saga';
import { createNumberId } from '@shared/lib';
import { Button, FormItem,ScreenLock } from '@shared/ui';
import { Alert, Flex, Form, Input, Result, Space, Typography } from 'antd';

import {
  completedProps,
  dataTestId,
  factoringProps,
  fileInputProps,
  message,
  resultProps,
  text,
  title,
  warning,
} from './FactoringForm.data';
import { IFactoringFormState } from './FactoringForm.types';

import styles from './FactoringForm.module.scss';

const { Title, Text } = Typography;

const FactoringForm: React.FC = () => {
  const dispatch = useDispatch();
  const { loginFio, orgInn, orgKpp, orgName, completed } = useSelector(factoringSelectors.getFactoringUuidData);
  const isLoading = useSelector(uiSelectors.getIsRequestPending(`${getJobUuidActionType}`));
  const isUploadingFile = useSelector(uiSelectors.getIsRequestPending(`${postTemplateActionType}`));

  const [formIsSubmitted, setFormIsSubmitted] = useReducer(() => true, false);

  const { uuid } = useParams();

  const [form] = Form.useForm();

  useEffect(() => {
    if (uuid) {
      dispatch(getJobUuidAction({ uuid }));
    }
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      orgName: orgName || '',
      orgKpp: orgKpp || '',
      orgInn: orgInn || '',
      loginFio: loginFio || '',
      files: {
        file: null,
        fileList: [],
      },
      completed: false,
    });
  }, [loginFio, orgInn, orgKpp, orgName]);

  const onFinishFactoringForm = useCallback((values: IFactoringFormState) => {
    const fileList = values.files.fileList;
    dispatch(
      postTemplateAction({
        files: convertNameFiles(fileList),
        rc: 'nsi',
        man: 'in',
        num: getNumForFiles(fileList),
        codeNotification: createNumberId(),
        actions: [
          {
            type: postUuidAction.type,
            payload: {
              uuid,
              action: setFormIsSubmitted,
            },
          },
        ],
      }),
    );
  }, []);

  return (
    <>
      {!isLoading ? (
        !completed ? (
          !formIsSubmitted ? (
            <Form className={styles.form} form={form} onFinish={onFinishFactoringForm} disabled={isUploadingFile}>
              <Space className={styles.space} direction='vertical' size='middle'>
                <Title level={2} className={styles.title}>
                  {title}
                </Title>
                <Alert message={warning} type='warning' showIcon />
                <div className={styles.container}>
                  <FormItem {...factoringProps.orgName}>
                    <Input readOnly />
                  </FormItem>
                  <FormItem {...factoringProps.loginFio}>
                    <Input readOnly />
                  </FormItem>
                  <FormItem {...factoringProps.orgInn}>
                    <Input readOnly />
                  </FormItem>
                  <FormItem {...factoringProps.orgKpp}>
                    <Input readOnly />
                  </FormItem>
                </div>
                <Text strong>{text}</Text>
                <Alert className={styles.alert} message={message} type='warning' showIcon />
                <FormItem {...factoringProps.files}>
                  <FileInput {...fileInputProps} />
                </FormItem>
                <FormItem className={styles.button_container}>
                  <Button dataTestId={dataTestId} loading={isUploadingFile} type='primary' htmlType='submit'>
                    Отправить КП
                  </Button>
                </FormItem>
              </Space>
            </Form>
          ) : (
            <Flex className={styles.result_container} justify='center' align='center'>
              <Result {...resultProps} />
            </Flex>
          )
        ) : (
          <Flex className={styles.result_container} justify='center' align='center'>
            <Result {...completedProps} />
          </Flex>
        )
      ) : (
        <ScreenLock />
      )}
    </>
  );
};

export default memo(FactoringForm);
