import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { infoSearchAction } from '@middleware/info/info.saga';
import { DatePicker, disabledTodayAndFutureDate, FormItem } from '@shared/ui';
import { Checkbox, Flex, Form, Input, Select, Space } from 'antd';
import FormItemAntd from 'antd/es/form/FormItem';

import { dataTestId } from '../../VendorContractForm.data';
import { StepKey } from '../../VendorContractForm.types';
import { GenerateContractKey } from '../GenerateContract.types';

import { agreementFieldsProps, hiddenNumberField, textAreaProps, visibleDateField } from './Agreement.data';
import { AgreementKey } from './Agreement.types';

import styles from '../../VendorContractForm.module.scss';

const Agreement: React.FC = () => {
  const dispatch = useDispatch();
  const form = Form.useFormInstance();
  const rightToSign = Form.useWatch([
    StepKey.GENERATE_CONTRACT,
    GenerateContractKey.AGREEMENT,
    AgreementKey.RIGHT_TO_SIGN,
  ]);
  const checked = Form.useWatch([StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.CHECKBOX]);
  const rightToSignOptions = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.CO_TABLE, CodeInfoSearch.RIGHT_TO_SING),
  );

  useEffect(() => {
    if (!rightToSignOptions.length)
      dispatch(
        infoSearchAction({
          type: TypeInfoSearch.CO_TABLE,
          code: CodeInfoSearch.RIGHT_TO_SING,
        }),
      );
  }, []);

  useEffect(() => {
    if (checked) {
      form.setFieldValue(
        [StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.ACTUAL_ADDRESS],
        form.getFieldValue([StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.LEGAL_ADDRESS]),
      );
      form.validateFields([[StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.ACTUAL_ADDRESS]]);
    }
  }, [checked]);

  const onChangeLegalAddress = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (checked) {
        form.setFieldValue(
          [StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.ACTUAL_ADDRESS],
          event.target.value,
        );
        form.validateFields([[StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.ACTUAL_ADDRESS]]);
      }
    },
    [form, checked],
  );

  const onChangeRightToSign = useCallback(
    (value: string) => {
      if (value)
        form.setFieldsValue({
          [StepKey.GENERATE_CONTRACT]: {
            [GenerateContractKey.AGREEMENT]: { [AgreementKey.NUMBER]: '', [AgreementKey.DATE]: null },
          },
        });
    },
    [form],
  );

  return (
    <Space direction='vertical' className={styles.space_container} size='middle'>
      <Flex justify='space-between' gap='small'>
        <FormItem {...agreementFieldsProps[AgreementKey.FIO_SAGNATORY]}>
          <Input />
        </FormItem>
        <FormItem {...agreementFieldsProps[AgreementKey.PISITION_SIGNATORY]}>
          <Input />
        </FormItem>
      </Flex>
      <Flex justify='space-between' gap='small'>
        <FormItem {...agreementFieldsProps[AgreementKey.FIO_PROPS]}>
          <Input />
        </FormItem>
        <FormItem {...agreementFieldsProps[AgreementKey.POSITION_PROPS]}>
          <Input />
        </FormItem>
      </Flex>
      <Flex justify='space-between' gap='small'>
        <FormItem {...agreementFieldsProps[AgreementKey.EMAIL_MERCH]} className={styles.flex_half_width}>
          <Input />
        </FormItem>
      </Flex>
      <Flex justify='space-between' gap='small'>
        <FormItem {...agreementFieldsProps[AgreementKey.LEGAL_ADDRESS]}>
          <Input.TextArea onChange={onChangeLegalAddress} {...textAreaProps} />
        </FormItem>
        <FormItem {...agreementFieldsProps[AgreementKey.ACTUAL_ADDRESS]}>
          <Input.TextArea readOnly={checked} {...textAreaProps} />
        </FormItem>
      </Flex>
      <Flex justify='flex-end'>
        <FormItemAntd {...agreementFieldsProps[AgreementKey.CHECKBOX]} className={styles.agreement_checkbox}>
          <Checkbox>Совпадает с юридическим адресом</Checkbox>
        </FormItemAntd>
      </Flex>
      <Flex justify='space-between' gap='small'>
        <FormItem {...agreementFieldsProps[AgreementKey.RIGHT_TO_SIGN]} className={styles.flex_half_width}>
          <Select options={rightToSignOptions} onChange={onChangeRightToSign} />
        </FormItem>
        {!hiddenNumberField.includes(rightToSign?.toLowerCase()) && (
          <FormItem {...agreementFieldsProps[AgreementKey.NUMBER]}>
            <Input />
          </FormItem>
        )}
        {visibleDateField.includes(rightToSign?.toLowerCase()) && (
          <FormItem {...agreementFieldsProps[AgreementKey.DATE]} className={styles.date}>
            <DatePicker disabledDate={disabledTodayAndFutureDate} dataTestId={dataTestId} />
          </FormItem>
        )}
      </Flex>
    </Space>
  );
};

export default memo(Agreement);
