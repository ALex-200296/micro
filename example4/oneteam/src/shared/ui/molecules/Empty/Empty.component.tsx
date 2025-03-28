import React, { memo, NamedExoticComponent } from 'react';
import { Empty as AntdEmpty } from 'antd';
import Link from 'antd/es/typography/Link';

import { IEmptyProps } from './Empty.types';
import { EmptySvg } from './EmptySVG';

import styles from './Empty.module.scss';

const BaseEmpty: React.FC<IEmptyProps> = ({ children, image = Empty.IMAGE_CUSTOM, linkProps, ...props }) => {
  return (
    <AntdEmpty image={image} {...props} rootClassName={styles.empty}>
      {children}
      {linkProps && <Link {...linkProps} />}
    </AntdEmpty>
  );
};


export const Empty = memo(BaseEmpty) as NamedExoticComponent<IEmptyProps> & {
  IMAGE_SIMPLE: typeof AntdEmpty.PRESENTED_IMAGE_SIMPLE;
  IMAGE_DEFAULT: typeof AntdEmpty.PRESENTED_IMAGE_DEFAULT;
  IMAGE_CUSTOM: typeof EmptySvg;
};

Empty.IMAGE_CUSTOM = EmptySvg;
Empty.IMAGE_SIMPLE = AntdEmpty.PRESENTED_IMAGE_SIMPLE;
Empty.IMAGE_DEFAULT = AntdEmpty.PRESENTED_IMAGE_DEFAULT;

export default Empty;
