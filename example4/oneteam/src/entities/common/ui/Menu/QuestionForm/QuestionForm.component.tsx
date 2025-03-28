import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { setPrefillHelp } from '@app/store/ui/ui.slice';
import { userSelectors } from '@app/store/user/user.selectors';
import { convertNameFiles, FileInput, getCliUploadInfoFromNums, getNumForFiles } from '@features/common/ui';
import { postClientDocsUploadAction } from '@middleware/client/client.saga';
import { infoSearchAction } from '@middleware/info/info.saga';
import { mailSendAction } from '@middleware/mail/mail.saga';
import { postTemplateAction } from '@middleware/template/template.saga';
import { Button, FormItem } from '@shared/ui';
import { RootState } from '@store/root.store';
import { Alert, Form, Input, Select } from 'antd';

import {
  browsers,
  dataTestId,
  fieldsProps,
  fileInputProps,
  getHelpFormInitialState,
  getIsClientUploadOpt,
  getThemeOptionsData,
  textAreaProps,
} from './QuestionForm.data';
import { IQuestionFormProps, IQuestionFormState } from './QuestionForm.types';

import styles from './QuestionForm.module.scss';

const QuestionForm: React.FC<IQuestionFormProps> = ({
  afterSubmit,
  message = 'Максимальный размер одного файла 100 Мб.',
}) => {
  const dispatch = useDispatch();
  const { tabName } = useParams();
  const [form] = Form.useForm();

  const [validationError, setValidationError] = useState(false);

  const handleFormChange = useCallback(() => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setValidationError(hasErrors);
  }, []);

  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const { email } = useSelector(userSelectors.getUserProfile);
  const prefillHelpForm = useSelector(uiSelectors.getPrefillHelpForm);
  const infoSearch = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.co_table, CodeInfoSearch.help_oneteam_type),
  );

  const themeOptionsData = useMemo(() => getThemeOptionsData(isAuth, infoSearch), [isAuth, infoSearch]);

  const initialValues = useMemo(
    () => getHelpFormInitialState(prefillHelpForm, email, tabName),
    [prefillHelpForm, email, tabName],
  );

  const onFinish = useCallback(
    (values: IQuestionFormState) => {
      const {
        files: { fileList },
        theme,
        browser,
        email,
        description,
      } = values;

      const questionParam = {
        subject: `Обращение из iPRO OneTeam. ${theme}`,
        content: [
          { label: 'Браузер', value: browser },
          { label: 'Email', value: email },
          { label: 'Описание вопроса:', value: description },
        ],
      };

      const isClientUploadOpt = getIsClientUploadOpt(infoSearch, theme);

      if (!fileList.length) {
        dispatch(
          isClientUploadOpt
            ? postClientDocsUploadAction({
                cliUploadedCat: 'MNFDOCS',
              })
            : mailSendAction(questionParam),
        );
      } else {
        const convertedFileList = convertNameFiles(fileList);
        const numForFiles = getNumForFiles(convertedFileList);
        const { cliUploadedCat, clientUploadFile, clientUploadNum } = getCliUploadInfoFromNums(numForFiles, 'MNFDOCS');

        const actions = isClientUploadOpt
          ? [
              {
                type: postClientDocsUploadAction.type,
                payload: {
                  cliUploadedCat,
                  file: clientUploadFile,
                  name: clientUploadNum,
                },
              },
            ]
          : [{ type: mailSendAction.type, payload: { ...questionParam, url: 'lkp_files/help' } }];

        dispatch(
          postTemplateAction({
            files: convertedFileList,
            rc: isClientUploadOpt ? 'cli_document' : 'lkp_files',
            man: isClientUploadOpt ? '' : 'help',
            num: numForFiles,
            callActionsWithRejected: !isClientUploadOpt,
            actions,
          }),
        );
      }
      afterSubmit?.();
    },
    [infoSearch],
  );

  useEffect(() => {
    if (!infoSearch.length) {
      dispatch(infoSearchAction({ type: TypeInfoSearch.co_table, code: CodeInfoSearch.help_oneteam_type }));
    }
  }, []);

  useEffect(
    () => () => {
      if (prefillHelpForm) dispatch(setPrefillHelp(false));
    },
    [],
  );

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      className={styles.form}
      onFieldsChange={handleFormChange}
    >
      <FormItem {...fieldsProps.theme}>
        <Select options={themeOptionsData} />
      </FormItem>
      <FormItem {...fieldsProps.email}>
        <Input />
      </FormItem>
      <FormItem {...fieldsProps.browser}>
        <Select options={browsers} />
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

export default memo(QuestionForm);
