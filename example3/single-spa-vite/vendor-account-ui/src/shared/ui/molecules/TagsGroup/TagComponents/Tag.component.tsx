import React from 'react';
import { Tag as AntdTag } from 'antd';
import cn from 'classnames';

import { tagColorIsNeutralHex } from '../TagsGroup.data';

import { ITagProps } from './TagComponent.types';
import TagContent from './TagContent.component';

import styles from './TagComponents.module.scss';

export const Tag: React.FC<ITagProps> = ({ value, extra, label, rootClassName, color, ...props }) => {
  return (
    <AntdTag rootClassName={cn(styles.tag, rootClassName)} color={color} {...props}>
      <TagContent
        value={value}
        label={label}
        extra={extra}
        className={tagColorIsNeutralHex(color) ? styles.tag_content_neutral : ''}
      />
    </AntdTag>
  );
};
