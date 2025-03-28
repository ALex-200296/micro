import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { vendorSelectors } from '@app/store/vendor/vendor.selectors';
import { setUsedFields } from '@app/store/vendor/vendor.slice';
import { postClientCreVendorContractAction, postClientCreVendorContractType } from '@middleware/client/client.saga';
import { IClientCreVendorContractResponse } from '@middleware/client/client.types';
import { infoSearchAction } from '@middleware/info/info.saga';
import { postCreatePdfAction, postCreatePdfActionType } from '@middleware/template/template.saga';
import { delay } from '@shared/lib';
import { Button } from '@shared/ui';
import { Divider, Flex, Form, Space, Typography } from 'antd';
import { NamePath } from 'antd/lib/form/interface';

import {
  clearInputContract,
  createPdfParams,
  dataTestId,
  getVendorContractParams,
  getXml,
} from '../VendorContractForm.data';
import { IInitialValues, IStepContent, StepKey } from '../VendorContractForm.types';

import ElectronicExchange from './ElectronicExchange/ElectronicExchange.component';
import OtherDirections from './OtherDirections/OtherDirections.component';
import { ProductInfoKey } from './SuppliersProducts/ProductInfo/ProductInfo.types';
import SuppliersProducts from './SuppliersProducts/SuppliersProducts.component';
import { SuppliersProductsKey } from './SuppliersProducts/SuppliersProducts.types';
import Uzedo from './Uzedo/Uzedo.component';
import { InformationalInteractionKey } from './InformationalInteraction.types';

import styles from '../VendorContractForm.module.scss';

const { Title } = Typography;

const InformationalInteraction: React.FC<IStepContent> = ({ form, initialValues, prevStep, nextStep }) => {
  const dispatch = useDispatch();

  const [isValidating, setIsValidating] = useState<boolean>(false);

  const allFields = JSON.stringify({
    ...Form.useWatch([], {
      form,
      preserve: true,
    }),
    [StepKey.uploadingDocuments]: {},
  });

  const pdfIsGenerating = useSelector(uiSelectors.getIsRequestPending(postCreatePdfActionType));
  const contractIdIsGenerating = useSelector(uiSelectors.getIsRequestPending(postClientCreVendorContractType));
  const goodsTransitionWay = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.co_table, CodeInfoSearch.goods_transition_way),
  );
  const ediTransitionWay = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.co_table, CodeInfoSearch.edi_transition_way),
  );

  const usedFields = useSelector(vendorSelectors.getVendorUsedFields);

  const isLoading = isValidating || pdfIsGenerating || contractIdIsGenerating;

  useEffect(() => {
    if (!goodsTransitionWay.length) {
      dispatch(
        infoSearchAction({
          type: TypeInfoSearch.co_table,
          code: CodeInfoSearch.goods_transition_way,
        }),
      );
    }
    if (!ediTransitionWay.length) {
      dispatch(
        infoSearchAction({
          type: TypeInfoSearch.co_table,
          code: CodeInfoSearch.edi_transition_way,
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (goodsTransitionWay.length) {
      const filedsProductInfo = Object.values(ProductInfoKey).map<{ name: NamePath<IInitialValues>; value?: string }>(
        (values: keyof typeof ProductInfoKey) => ({
          name: [
            StepKey.informationalInteraction,
            InformationalInteractionKey.suppliersProducts,
            SuppliersProductsKey.productInfo,
            values,
            'transfer',
          ],
          value: goodsTransitionWay[0].value,
        }),
      );
      form.setFields(filedsProductInfo);
    }
  }, [goodsTransitionWay]);

  const vendorContractAction = useCallback((response: IClientCreVendorContractResponse) => {
    const xml = getXml(form.getFieldsValue(true), response.data.merch_contract_name);
    dispatch(
      postCreatePdfAction({
        ...createPdfParams,
        body: xml,
        action: async (response) => {
          const { URL } = response;
          form.setFieldValue([StepKey.uploadingDocuments, 'pdf'], URL);
          await delay(0);
          nextStep?.();
        },
      }),
    );
  }, []);

  const onFinish = async () => {
    try {
      setIsValidating(true);
      await delay(100);
      await form.validateFields().finally(() => {
        setIsValidating(false);
      });

      if (usedFields !== allFields) {
        dispatch(setUsedFields(allFields));
        clearInputContract(form);

        const values: IInitialValues = form.getFieldsValue(true);
        const vendorContractParams = getVendorContractParams(values);
        dispatch(postClientCreVendorContractAction({ ...vendorContractParams, action: vendorContractAction }));
      } else {
        nextStep?.();
      }
    } catch (error) {
      void error;
    }
  };

  return (
    <Space direction='vertical' className={styles.fullwidth_element} size='middle'>
      <Divider orientation='left'>
        <Title level={2}>Порядок формирования каталога продукции поставщика</Title>
      </Divider>
      <SuppliersProducts form={form} initialValues={initialValues} />
      <Divider orientation='left'>
        <Title level={2}>Порядок подключения электронного обмена данными</Title>
      </Divider>
      <ElectronicExchange form={form} initialValues={initialValues} />
      <Divider orientation='left'>
        <Title level={2}>Порядок организации ЮЗЭДО</Title>
      </Divider>
      <Uzedo form={form} initialValues={initialValues} />
      <Divider orientation='left'>
        <Title level={2}>Порядок организации прочих направлений информационного взаимодействия</Title>
      </Divider>
      <OtherDirections form={form} initialValues={initialValues} />
      <Flex justify='space-between' className={styles.fullwidth_element}>
        <Button dataTestId={`prev-step-${dataTestId}-informational-interaction`} onClick={() => prevStep?.()}>
          Назад
        </Button>
        <Button
          dataTestId={`finish-${dataTestId}-informational-interaction`}
          type='primary'
          htmlType='submit'
          onClick={onFinish}
          loading={isLoading}
        >
          Сгенерировать договор
        </Button>
      </Flex>
    </Space>
  );
};

export default memo(InformationalInteraction);
