import React, { memo, useMemo } from 'react';
import { Descriptions, Divider } from 'antd';

import { contentStyle, labelStyle } from '../../DrawerDetails.data';

import { getDescriptionsManInfo } from './ManInfo.data';
import { ManInfoProps } from './ManInfo.types';

import styles from './ManInfo.module.scss';

const ManInfo: React.FC<ManInfoProps> = ({ clients, requestType, author }) => {
  const items = useMemo(() => getDescriptionsManInfo(clients, requestType, author), [clients, requestType, author]);
  return (
    <section>
      <Divider className={styles.divider} />
      <Descriptions
        column={1}
        bordered
        className={styles.desc}
        labelStyle={labelStyle}
        contentStyle={contentStyle}
        items={items}
      />
      <Divider className={styles.divider} />
    </section>
  );
};

export default memo(ManInfo);
