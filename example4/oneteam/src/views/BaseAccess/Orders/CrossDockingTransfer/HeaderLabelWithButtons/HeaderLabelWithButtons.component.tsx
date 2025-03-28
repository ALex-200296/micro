import React, { memo } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import cn from 'classnames';

import { IHeaderLabelWithButtons } from './HeaderLabelWithButtons.types';

const { Text } = Typography;


import { IconButton } from '@shared/ui';

import styles from './HeaderLabelWithButtons.module.scss';

const HeaderLabelWithButtons: React.FC<IHeaderLabelWithButtons> = ({
  labelText,
  addBox,
  removeBox,
  activeBox,
  deleteBtnDisabled,
}) => (
  <Flex align='center' gap='small'>
    <Text className={styles.label_text}>{labelText}</Text>
    <IconButton
      type='transparent'
      icon={<DeleteOutlined />}
      dataTestId='delete-box-itm'
      tooltipProps={{ title: 'Удалить коробку' }}
      size='small'
      className={cn(styles.label_button, styles.icon_disabled)}
      onClick={() => removeBox(activeBox)}
      disabled={deleteBtnDisabled}
    />
    <IconButton
      type='transparent'
      icon={<PlusOutlined />}
      dataTestId='add-box-itm'
      tooltipProps={{ title: 'Добавить коробку' }}
      size='small'
      className={styles.label_button}
      onClick={addBox}
    />
  </Flex>
);

export default memo(HeaderLabelWithButtons);
