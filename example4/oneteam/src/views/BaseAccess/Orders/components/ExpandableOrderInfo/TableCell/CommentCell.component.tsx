import React, { memo, useMemo } from 'react';
import { MessageOutlined } from '@ant-design/icons';
import { FormItem, getNameFormItem,IconButton } from '@shared/ui';
import { Input, Popover, Typography } from 'antd';

import { dataTestId, helpText, textAreaProps } from './CommentCell.data';
import { ICommentProps } from './CommentCell.types';

import styles from './Commentcell.module.scss';

const { Text } = Typography;

const CommentCell: React.FC<ICommentProps> = ({ isEdidable = false, comment, id }) => {
  const name = useMemo(() => getNameFormItem(`${id}`), [id]);
  const disabled = useMemo(() => !isEdidable && !comment, [isEdidable, comment]);

  return (
    <>
      {!disabled ? (
        <Popover
          overlayClassName={styles.popover}
          content={
            isEdidable ? (
              <FormItem name={name} help={helpText}>
                <Input.TextArea {...textAreaProps} />
              </FormItem>
            ) : (
              <Text>{comment}</Text>
            )
          }
        >
          <IconButton dataTestId={dataTestId} icon={<MessageOutlined />} disabled={disabled} />
        </Popover>
      ) : (
        <IconButton dataTestId={dataTestId} icon={<MessageOutlined />} disabled={disabled} />
      )}
    </>
  );
};

export default memo(CommentCell);
