import React, { memo } from 'react';
import { Flex, Space, Typography } from 'antd';

import { ManualsTree } from './ManualsTree/ManualsTree.component';
import { ManufacturerInfo } from './ManufacturerInfo/ManufacturerInfo.component';
import { edoId, edoTitle } from './Manuals.data';
import { IManualsProps } from './Manuals.types';

import styles from './Manuals.module.scss';

const { Paragraph, Title } = Typography;

export const Manuals: React.FC<IManualsProps> = ({ manualsData, showManufacturerInfo = false, showEdoId = false }) => {
  return (
    <Space.Compact direction='vertical' block>
      <Space direction='vertical' size='middle'>
        <ManualsTree manualsData={manualsData} />
        {showEdoId && (
          <Flex vertical gap='small'>
            <Title level={3}>{edoTitle}</Title>
            <Paragraph copyable className={styles.copyable_info}>
              {edoId}
            </Paragraph>
          </Flex>
        )}
        {showManufacturerInfo && <ManufacturerInfo />}
      </Space>
    </Space.Compact>
  );
};

export default memo(Manuals);
