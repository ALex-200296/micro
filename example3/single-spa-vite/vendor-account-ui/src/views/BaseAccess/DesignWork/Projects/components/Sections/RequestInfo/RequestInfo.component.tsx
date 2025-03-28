import React, { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Descriptions, Divider } from 'antd';

import { contentStyle, labelStyle } from '../../DrawerDetails.data';

import { getRequestDescriptionsItems } from './RequestInfo.data';
import { RequestInfoProps } from './RequestInfo.types';

import styles from './RequestInfo.module.scss';

const RequestInfo: React.FC<RequestInfoProps> = ({ planTOSum, ...props }) => {
  const intl = useIntl();
  const planToSum = useMemo(() => intl.formatNumber(+planTOSum), [planTOSum]);
  const items = useMemo(() => getRequestDescriptionsItems({ ...props, planTOSum: planToSum }), [props, planToSum]);
  return (
    <>
      <Descriptions
        column={1}
        colon={false}
        labelStyle={labelStyle}
        contentStyle={contentStyle}
        size='small'
        items={items[0]}
      />
      <Divider className={styles.divider} />
      <Descriptions
        column={1}
        colon={false}
        labelStyle={labelStyle}
        contentStyle={contentStyle}
        size='small'
        items={items[1]}
      />
    </>
  );
};

export default memo(RequestInfo);
