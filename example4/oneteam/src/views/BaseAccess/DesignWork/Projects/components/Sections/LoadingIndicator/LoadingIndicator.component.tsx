import React from 'react';
import { Spin } from 'antd';

import styles from './LoadingIndicator.module.scss';

const LoadingIndicator = () => {
  return (
    <div className={styles.spin_container}>
      <Spin />
    </div>
  );
};

export default LoadingIndicator;
