import React, { memo } from 'react';
import {Collapse} from '@shared/ui';
import { Typography } from 'antd';

import { SubRequestInfoProps } from '../SubRequestInfo.types';

import styles from './SubRequestFiles.module.scss';

const { Link } = Typography;
const SubRequestFiles: React.FC<Required<Omit<SubRequestInfoProps, 'compMnf'>>> = ({ files, fileDir }) => {
  return (
    <div className={styles.container}>
      {files.map((fileData, idx) => (
        <Collapse
          key={idx}
          collapsible={fileData.comment ? 'icon' : 'disabled'}
          items={[
            {
              key: fileData.name,
              label: (
                <Link href={fileDir + fileData.file} target='_blank' download>
                  {fileData.name}
                </Link>
              ),
              children: fileData.comment,
            },
          ]}
        />
      ))}
    </div>
  );
};

export default memo(SubRequestFiles);
