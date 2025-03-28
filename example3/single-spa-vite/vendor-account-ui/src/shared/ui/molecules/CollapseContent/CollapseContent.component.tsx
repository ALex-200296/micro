import React, { memo, useMemo } from 'react';
import { Button } from '@shared/ui/atoms';
import { contentStyle, labelStyle } from '@shared/ui/molecules/CollapseContent/CollapseContent.data';
import { Descriptions, DescriptionsProps, Space } from 'antd';

import { ICollapseContentProps } from './CollapseContent.types';

import styles from './CollapseContent.module.scss';

export const CollapseContent: React.FC<ICollapseContentProps> = ({
  content = [],
  contentAction,
  extra,
  tableView = false,
}) => {
  const descriptionItems: DescriptionsProps['items'] = useMemo(
    () => content.map(({ key, label, children }, idx) => ({ key: key || idx + String(label), label, children })),
    [content],
  );
  return (
    <Space direction='vertical'>
      <Descriptions
        column={1}
        bordered={tableView}
        size='small'
        items={descriptionItems}
        rootClassName={styles.desc_content}
        labelStyle={tableView ? labelStyle : {}}
        contentStyle={tableView ? contentStyle : {}}
      />
      {!!contentAction && (
        <Button dataTestId='collapse-content' onClick={contentAction.onClick}>
          {contentAction.actionText}
        </Button>
      )}
      {extra}
    </Space>
  );
};

export default memo(CollapseContent);
