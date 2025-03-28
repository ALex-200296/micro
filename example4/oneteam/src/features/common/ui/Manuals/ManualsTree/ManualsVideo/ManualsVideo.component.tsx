import React, { memo } from 'react';
import { PlayCircleTwoTone } from '@ant-design/icons';
import { useToggleState } from '@shared/lib';
import { MediaPlayer, Modal } from '@shared/ui';
import { List, Typography } from 'antd';

import { IManualsVideoProps } from './ManualsVideo.types';

const { Link } = Typography;

export const ManualsVideo: React.FC<IManualsVideoProps> = memo(({ itemName, ...props }) => {
  const { isOpen, handleClose, handleOpen } = useToggleState();
  return (
    <>
      <List.Item onClick={handleOpen}>
        <Link>
          <PlayCircleTwoTone /> {itemName}
        </Link>
      </List.Item>
      <Modal open={isOpen} onCancel={handleClose}>
        <MediaPlayer {...props} />
      </Modal>
    </>
  );
});
