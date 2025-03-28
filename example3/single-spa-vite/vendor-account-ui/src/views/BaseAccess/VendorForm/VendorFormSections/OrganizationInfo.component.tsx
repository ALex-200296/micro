import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FileInput } from '@features/common/ui';
import { FormItem } from '@shared/ui';
import { Alert, Flex, Input, InputNumber, Space, Tooltip, Typography } from 'antd';

import { dataTestId } from '../VendorForm.data';

import { alertUploadWarning, availableFileFormats, organizationInfoFieldsProps } from './VendorFormSections.data';

import styles from '../VendorForm.module.scss';

const OrganizationInfo: React.FC = () => {
  const format = useIntl();
  return (
    <Flex>
      <Space direction='vertical' className={styles.space_container} size='middle'>
        <Flex align='center' gap='small'>
          <FormItem {...organizationInfoFieldsProps.sum}>
            <InputNumber
              stringMode
              className={styles.fullwidth_element}
              formatter={(value) => (value ? `${format.formatNumber(Number(value))}₽` : '')}
            />
          </FormItem>
          <Tooltip title='Максимальный объём поставок в год в рублях, который может обеспечить ваша компания'>
            <QuestionCircleOutlined className={styles.help_icon} />
          </Tooltip>
        </Flex>
        <Flex align='center' gap='small'>
          <FormItem {...organizationInfoFieldsProps.orgPartners}>
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </FormItem>
          <Tooltip title='По возможности, укажите партнёров по реализации продукции и ключевых потребителей'>
            <QuestionCircleOutlined className={styles.help_icon} />
          </Tooltip>
        </Flex>
        <Typography.Title level={3}>Загрузите документы</Typography.Title>
        <Alert message={alertUploadWarning} showIcon type='warning' className={styles.alert_upload} />
        <FormItem {...organizationInfoFieldsProps.files}>
          <FileInput multiple uploadHint={availableFileFormats} accept={availableFileFormats} dataTestId={dataTestId} />
        </FormItem>
      </Space>
    </Flex>
  );
};

export default memo(OrganizationInfo);
