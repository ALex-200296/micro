import React, { memo } from 'react';
import { Descriptions } from 'antd';

import { contentStyle, labelStyle } from '../../DrawerDetails.data';

import SubRequestFiles from './FilesSection/SubRequestFiles.component';
import { SubRequestInfoProps } from './SubRequestInfo.types';

const SubRequestInfo: React.FC<SubRequestInfoProps> = ({ files, fileDir, compMnf }) => {
  return (
    <section>
      <Descriptions
        size='small'
        column={1}
        colon={false}
        labelStyle={labelStyle}
        contentStyle={contentStyle}
        items={[
          { label: 'Конкуренция', children: compMnf },
          ...(!!files?.length && !!fileDir
            ? [{ children: <SubRequestFiles fileDir={fileDir} files={files} />, label: 'Файлы' }]
            : []),
        ]}
      />
    </section>
  );
};

export default memo(SubRequestInfo);
