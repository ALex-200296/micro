import React, { memo } from 'react';
import { Flex, Typography } from 'antd';

import { IPageTitleProps } from './PageTitle.types';

const { Title } = Typography;

export const PageTitle: React.FC<IPageTitleProps> = memo(({
  heading,
  subHeading,
  className = 'margin_4_title',
  ...titleProps
}) => {
  return (
    <Flex vertical className={className}>
      <Title {...titleProps}>{heading}</Title>
      {subHeading}
    </Flex>
  );
});