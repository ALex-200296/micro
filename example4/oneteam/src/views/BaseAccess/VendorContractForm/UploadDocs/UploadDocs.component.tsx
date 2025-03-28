import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { setIsScreenLock } from '@app/store/ui/ui.slice';
import { convertNameFiles, FileInput, getNumForFiles } from '@features/common/ui';
import { postClientDocsUploadAction } from '@middleware/client/client.saga';
import { postTemplateAction } from '@middleware/template/template.saga';
import { Button, FormItem } from '@shared/ui';
import { Divider, Flex, Form, Space, Typography } from 'antd';

import { PathwiseKey } from '../Pathwise/Pathwise.types';
import { dataTestId } from '../VendorContractForm.data';
import { IStepContent, StepKey } from '../VendorContractForm.types';

import { uploadDocsContent, uploadSignDocText, VendorContractUploadKeys } from './UploadDocs.data';

import styles from './UploadDocs.module.scss';

const { Text, Title, Link } = Typography;

const UploadDocs: React.FC<IStepContent> = ({ initialValues, nextStep, prevStep, form }) => {
  const dispatch = useDispatch();
  const pdfLink = form.getFieldValue([StepKey.uploadingDocuments, 'pdf']);
  const uploadLoading = useSelector(uiSelectors.getIsRequestPending(postTemplateAction.type));
  const clientDocsLoading = useSelector(uiSelectors.getIsRequestPending(postClientDocsUploadAction.type));

  const isPathWise = form.getFieldValue([StepKey.pathwise, PathwiseKey.radio]) === 'Да';

  const isInputContract = (input: (typeof uploadDocsContent)[0]) => {
    return input.formItem.name.at(-1) === VendorContractUploadKeys.contract;
  };

  const onPrevStep = () => {
    isPathWise ? prevStep?.(0) : prevStep?.();
  };

  useEffect(() => {
    if (uploadLoading) {
      dispatch(setIsScreenLock(true));
    } else {
      dispatch(setIsScreenLock(false));
    }
  }, [uploadLoading]);

  const onFinish = async () => {
    try {
      await form.validateFields();
      const {
        uploadingDocuments: { pdf, ...uploadingDocumentsData },
      } = form.getFieldsValue();
      void pdf;

      const filesList = Object.values(uploadingDocumentsData).reduce<File[]>((accum, current) => {
        const { fileList } = current;
        const convertedFileList = convertNameFiles(fileList);
        return [...accum, ...convertedFileList];
      }, []);
      const numForFiles = getNumForFiles(filesList);
      const cliUploadedCat = new Array(numForFiles.length).fill('MNFDOCS').join(',');
      const clientUploadFile = numForFiles.map(({ extension, numId }) => `${numId}.${extension}`).join(',');
      const clientUploadNum = numForFiles.map(({ extension, parentName }) => `${parentName}.${extension}`).join(',');

      dispatch(
        postTemplateAction({
          files: filesList,
          num: numForFiles,
          rc: 'cli_document',
          callActionsWithRejected: false,
          actions: [
            {
              type: postClientDocsUploadAction.type,
              payload: {
                cliUploadedCat,
                file: clientUploadFile,
                name: clientUploadNum,
                action: nextStep,
              },
            },
          ],
        }),
      );
    } catch (error) {
      void error;
    }
  };

  return (
    <Form form={form} initialValues={initialValues} preserve>
      <Space direction='vertical' style={{ width: '100%' }}>
        {uploadDocsContent.map((input, idx) => (
          <Flex key={idx + input.formItem.name.at(-1)} vertical={true} gap='small'>
            <Flex vertical={true} gap='small'>
              <Divider orientation='left'>
                <Title level={3}>
                  <span>
                    {idx + 1}. {input.tips.name}
                  </span>
                  {!!input.formItem?.required && <span className={styles.required_mark}>*</span>}
                </Title>
              </Divider>
              {isInputContract(input) && !isPathWise && (
                <Link target='_blank' download href={pdfLink}>
                  Скачать договор для подписания
                </Link>
              )}
              {isInputContract(input) ? (
                <Text type='secondary'>{!isPathWise ? input.tips.tip : uploadSignDocText}</Text>
              ) : (
                <Text type='secondary'>{input.tips.tip}</Text>
              )}
            </Flex>
            <FormItem {...input.formItem}>
              <FileInput {...input.fileInput} defaultFileList={form.getFieldValue(input.formItem.name)?.fileList} />
            </FormItem>
          </Flex>
        ))}
        <Flex className={styles.full_width_container} justify='space-between'>
          <Button dataTestId={`prev-step-${dataTestId}-upload-docs`} onClick={onPrevStep}>
            Назад
          </Button>
          <Button
            dataTestId={`finish-${dataTestId}-upload-docs`}
            type='primary'
            htmlType='submit'
            onClick={onFinish}
            loading={uploadLoading || clientDocsLoading}
          >
            Отправить договор
          </Button>
        </Flex>
      </Space>
    </Form>
  );
};

export default memo(UploadDocs);
