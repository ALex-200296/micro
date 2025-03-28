import React, { memo } from 'react';

import PrimaryInfo from './HomePageSections/Primary/PrimaryInfo.component';
import SecondaryInfo from './HomePageSections/Secondary/SecondaryInfo.component';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <>
      <div className={styles.main_content}>
        <PrimaryInfo />
        <SecondaryInfo />
      </div>
    </>
  );
};

export default memo(Home);
