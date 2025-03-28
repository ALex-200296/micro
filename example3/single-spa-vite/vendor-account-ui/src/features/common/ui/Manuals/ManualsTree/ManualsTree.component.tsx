import React, { memo } from 'react';
import { List, Space, Typography } from 'antd';

import { IManualsProps } from '../Manuals.types';

import { ManualsVideo } from './ManualsVideo/ManualsVideo.component';

import styles from './ManualsTree.module.scss';

const { Title, Link } = Typography;

export const ManualsTree: React.FC<IManualsProps> = memo(({ manualsData }) => {
  return (
    <Space direction='vertical' size='middle'>
      {manualsData.map((manual, id) => (
        <div key={manual.name + id}>
          <Title level={3}>{manual.name}</Title>
          <List
            size='small'
            split={false}
            dataSource={manual.data}
            renderItem={(item) =>
              item.video ? (
                <ManualsVideo
                  url={item.to}
                  itemName={item.name}
                  key={item.name + id}
                  light={<img src={item.thumbnail} alt={item.name + 'Thumbnail'} className={styles.video_player} />}
                  playing
                />
              ) : (
                <List.Item key={item.name + id}>
                  <Link
                    href={item.to}
                    target='_blank'
                    download={item.isFollowExternalLink ? undefined : item.downLoadName || item.name}
                  >
                    {item.name}
                  </Link>
                </List.Item>
              )
            }
          />
        </div>
      ))}
    </Space>
  );
});