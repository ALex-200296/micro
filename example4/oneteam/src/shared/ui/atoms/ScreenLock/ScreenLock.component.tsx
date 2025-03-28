import React, { memo, useEffect } from 'react';
import { Spin, SpinProps } from 'antd';

import styles from './ScreenLock.module.scss';

export const ScreenLock: React.FC<SpinProps> = memo(() => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      event.stopPropagation();
    };

    document.addEventListener('click', onClick, { capture: true });

    return () => {
      setTimeout(() => document.removeEventListener('click', onClick, { capture: true }), 1000);
    };
  }, []);

  return <Spin size='large' fullscreen className={styles.spin} />;
});
