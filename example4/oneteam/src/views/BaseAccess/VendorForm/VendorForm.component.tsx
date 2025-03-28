import React, { memo, useCallback, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoClass, CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { userSelectors } from '@app/store/user/user.selectors';
import { convertNameFiles, getCliUploadInfoFromNums, getNumForFiles } from '@features/common/ui';
import { postClientDocsUploadAction } from '@middleware/client/client.saga';
import { defaultCity } from '@middleware/info/info.data';
import { infoClassAction, infoSearchAction } from '@middleware/info/info.saga';
import { createFileWithFormData } from '@middleware/mail/mail.data';
import { postTemplateAction } from '@middleware/template/template.saga';
import { IResponseFile } from '@middleware/template/template.types';
import { useBreakpoints } from '@shared/lib';
import { Button, PageTitle } from '@shared/ui';
import { Alert, Flex, Form, Result, Spin as Loader, Typography } from 'antd';
import cn from 'classnames';

import CommonInfo from './VendorFormSections/CommonInfo.component';
import ContactInfo from './VendorFormSections/ContactInfo.component';
import ContractPreview from './VendorFormSections/ContractPreview.component';
import OrganizationInfo from './VendorFormSections/OrganizationInfo.component';
import {
  alertInfoMessage,
  dataTestId,
  formatFormDataToFile,
  formFileName,
  heading,
  resultProps,
} from './VendorForm.data';
import { IVendorInitialValues } from './VendorForm.types';

import styles from './VendorForm.module.scss';
const { Title } = Typography;

const VendorForm: React.FC = () => {
  const dispatch = useDispatch();
  const { OrgName, OrgKpp, OrgInn } = useSelector(userSelectors.getUserCompanyInfo);
  const { email, fio, phone, exw_positionName } = useSelector(userSelectors.getUserProfile);
  const [formIsSubmitted, setFormIsSubmitted] = useReducer(() => true, false);
  const {
    breakpoints: { sm, xs, md },
  } = useBreakpoints();

  const categoryOptions = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.co_table, CodeInfoSearch.type_merchant),
  );
  const goodsCategory = useSelector(infoSelectors.getInfoClass(CodeInfoClass.code81));
  const isFormDisabled = useSelector(
    uiSelectors.getAreRequestsPending([postTemplateAction.type, postClientDocsUploadAction.type]),
  );

  const initialValues: IVendorInitialValues = {
    typeOfContract: 'Договор поставки',
    signTheContract: '',
    orgName: OrgName,
    kpp: OrgKpp,
    inn: OrgInn,
    orgCategory: '',
    goodsCategory: [],
    goodsExtraCategory: '',
    brands: '',
    orgSite: '',
    orgCatalogLink: '',
    fio,
    position: exw_positionName,
    email,
    phone,
    deJuroAddress: '',
    deFactoAddress: '',
    warehouses: [''],
    holdings: [{ hasContract: true, address: '' }],
    orgPartners: '',
    sum: '',
    files: {
      file: null,
      fileList: [],
    },
  };

  const onFinish = useCallback((values: IVendorInitialValues) => {
    const {
      files: { fileList },
      ...rest
    } = values;
    const formString = formatFormDataToFile(rest);
    const convertedFileList = [...(fileList.length ? convertNameFiles(fileList) : [])];
    const numForFiles = getNumForFiles(convertedFileList);
    const getFile = (fileLinks?: IResponseFile[]) => {
      const { files, numForFiles: numForFormFile } = createFileWithFormData(
        formFileName,
        formString,
        'cli_document',
        fileLinks,
      );
      const allNums = [...numForFiles, ...numForFormFile];
      const { cliUploadedCat, clientUploadFile, clientUploadNum } = getCliUploadInfoFromNums(allNums, 'MNFDOCS');
      dispatch(
        postTemplateAction({
          files: files,
          num: numForFormFile,
          rc: 'cli_document',
          callActionsWithRejected: false,
          actions: [
            {
              type: postClientDocsUploadAction.type,
              payload: {
                cliUploadedCat,
                file: clientUploadFile,
                name: clientUploadNum,
                action: setFormIsSubmitted,
              },
            },
          ],
        }),
      );
    };
    fileList.length
      ? dispatch(
          postTemplateAction({
            files: convertedFileList,
            rc: 'cli_document',
            num: numForFiles,
            callActionsWithRejected: false,
            actions: [getFile],
          }),
        )
      : getFile();
  }, []);

  useEffect(() => {
    if (!categoryOptions.length) {
      dispatch(infoSearchAction({ type: TypeInfoSearch.co_table, code: CodeInfoSearch.type_merchant }));
    }
    if (!goodsCategory.length) {
      dispatch(infoClassAction({ code: CodeInfoClass.code81, city: defaultCity }));
    }
  }, []);

  return (
    <>
      <PageTitle heading={heading} />
      {!formIsSubmitted ? (
        <Loader spinning={isFormDisabled} className={styles.loader}>
          <Form
            initialValues={initialValues}
            className={cn(styles.form, { [styles.md]: md, [styles.sm]: sm, [styles.xs]: xs })}
            onFinish={onFinish}
            scrollToFirstError={{ behavior: 'smooth', block: 'center' }}
          >
            <Flex vertical gap='middle'>
              <Alert message={alertInfoMessage} type='warning' showIcon className={styles.alert} />
              <Title level={2}>Выберите схему работы с ЭТМ</Title>
              <ContractPreview />
              <Title level={2}>Общие сведения</Title>
              <CommonInfo />
              <Title level={2}>Контактная информация</Title>
              <ContactInfo />
              <Title level={2}>Информация об организации</Title>
              <OrganizationInfo />
              <Button dataTestId={dataTestId} htmlType='submit' type='primary' className={styles.button}>
                Отправить заявку
              </Button>
            </Flex>
          </Form>
        </Loader>
      ) : (
        <Flex className={styles.result_container} justify='center' align='center' wrap='wrap'>
          <Result {...resultProps} />
        </Flex>
      )}
    </>
  );
};

export default memo(VendorForm);
