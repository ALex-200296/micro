import React, { memo, useMemo } from 'react';
import { Tabs } from '@features/common/ui';

import { IProjectDetailsProps } from './ProjectDetails.types';

import styles from './ProjectDetails.module.scss';

const ProjectDetails: React.FC<IProjectDetailsProps> = ({ infoComponent, meetingsComponent }) => {
  const items = useMemo(
    () => [
      {
        key: '1',
        label: 'о проекте',
        children: infoComponent,
      },
      {
        key: '2',
        label: 'события',
        children: meetingsComponent,
      },
    ],
    [],
  );
  return <Tabs items={items} className={styles.tabs} />;
};

export default memo(ProjectDetails);
