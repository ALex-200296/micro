import React, { memo } from 'react';
import { Drawer as DrawerAntd, Typography } from 'antd';
import cn from 'classnames';

import { IDrawerProps, Width } from './Drawer.types';

import styles from './Drawer.module.scss';

const { Paragraph } = Typography;

export const Drawer: React.FC<IDrawerProps> = ({ width = 'sm', title, children, copyableTitlePart, ...props }) => {
  return (
    <DrawerAntd
      width={Width[width]}
      title={
        <div className={styles.title}>
          {title}
          {!!copyableTitlePart && (
            <Paragraph rootClassName={styles.copyable} copyable>
              {copyableTitlePart}
            </Paragraph>
          )}
        </div>
      }
      rootClassName={cn(styles.drawer, { [styles.drawer_header_pd]: !!title })}
      {...props}
    >
      {children}
    </DrawerAntd>
  );
};

export default memo(Drawer);
