import React from 'react';
import cn from 'classnames';

import { TagContentProps } from './TagComponent.types';

import styles from './TagComponents.module.scss';

const TagContent: React.FC<TagContentProps> = ({ value, className, label, extra = '' }) => {
  return (
    <span title={value} className={cn(styles.tag_content, className)}>
      {!!label && <span className={styles.label}>{label}:</span>}
      <span className={styles.value}>{value}</span>
      {extra}
    </span>
  );
};

export default TagContent;
