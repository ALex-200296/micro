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
    StepKey.generateContract,
    GenerateContractKey.agreement,
    AgreementKey.rightToSign,
  ]);
  const checked = Form.useWatch([StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.checkbox]);
  const rightToSignOptions = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.co_table, CodeInfoSearch.right_to_sign),
  );

  useEffect(() => {
    if (!rightToSignOptions.length)
      dispatch(
        infoSearchAction({
          type: TypeInfoSearch.co_table,
          code: CodeInfoSearch.right_to_sign,
        }),
      );
  }, []);

  useEffect(() => {
    if (checked) {
      form.setFieldValue(
        [StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.actualAddress],
        form.getFieldValue([StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.legalAddress]),
      );
      form.validateFields([[StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.actualAddress]]);
    }
  }, [checked]);

  const onChangeLegalAddress = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (checked) {
        form.setFieldValue(
          [StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.actualAddress],
          event.target.value,
        );
        form.validateFields([[StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.actualAddress]]);
      }
    },
    [form, checked],
  );

  const onChangeRightToSign = useCallback(
    (value: string) => {
      if (value)
        form.setFieldsValue({
          [StepKey.generateContract]: {
            [GenerateContractKey.agreement]: { [AgreementKey.number]: '', [AgreementKey.date]: null },
          },
        });
    },
    [form],
  );

  return (
    <Space direction='vertical' className={styles.space_container} size='middle'>
      <Flex justify='space-between' gap='small'>
        <FormItem {...agreementFieldsProps[AgreementKey.fioSignatory]}>
          <Input />
        </FormItem>
        <FormItem {...agreementFieldsProps[AgreementKey.positionSignatory]}>
          <Input />
        </FormItem>
      </Flex>
      <Flex justify='space-between' gap='small'>
        <FormItem {...agreementFieldsProps[AgreementKey.fioProps]}>
          <Input />
        </FormItem>
        <FormItem {...agreementFieldsProps[AgreementKey.positionProps]}>
          <Input />
        </FormItem>
      </Flex>
      <Flex justify='space-between' gap='small'>
        <FormItem {...agreementFieldsProps[AgreementKey.emailMerch]} className={styles.flex_half_width}>
          <Input />
        </FormItem>
      </Flex>
      <Flex justify='space-between' gap='small'>
        <FormItem {...agreementFieldsProps[AgreementKey.legalAddress]}>
          <Input.TextArea onChange={onChangeLegalAddress} {...textAreaProps} />
        </FormItem>
        <FormItem {...agreementFieldsProps[AgreementKey.actualAddress]}>
          <Input.TextArea readOnly={checked} {...textAreaProps} />
        </FormItem>
      </Flex>
      <Flex justify='flex-end'>
        <FormItemAntd {...agreementFieldsProps[AgreementKey.checkbox]} className={styles.agreement_checkbox}>
          <Checkbox>Совпадает с юридическим адресом</Checkbox>
        </FormItemAntd>
      </Flex>
      <Flex justify='space-between' gap='small'>
        <FormItem {...agreementFieldsProps[AgreementKey.rightToSign]} className={styles.flex_half_width}>
          <Select options={rightToSignOptions} onChange={onChangeRightToSign} />
        </FormItem>
        {!hiddenNumberField.includes(rightToSign?.toLowerCase()) && (
          <FormItem {...agreementFieldsProps[AgreementKey.number]}>
            <Input />
          </FormItem>
        )}
        {visibleDateField.includes(rightToSign?.toLowerCase()) && (
          <FormItem {...agreementFieldsProps[AgreementKey.date]} className={styles.date}>
            <DatePicker disabledDate={disabledTodayAndFutureDate} dataTestId={dataTestId} />
          </FormItem>
        )}
      </Flex>
    </Space>
  );
};

export default memo(Agreement);
