import React, { memo, useCallback } from 'react';
import { Popover, Space, Typography } from 'antd';
import cn from 'classnames';

import { getTagColor, spaceDefault } from './TagsGroup.data';

const { Link } = Typography;

import { ITagsGroupProps } from '@shared/lib/types';

import { PopoverContent } from './TagComponents/PopoverContent.component';
import { Tag } from './TagComponents/Tag.component';

import styles from './TagsGroup.module.scss';

export const TagsGroup: React.FC<ITagsGroupProps> = memo(
  ({
    tagsData,
    color = 'default',
    onClose,
    closable = false,
    spaceConfig = spaceDefault,
    className = 'margin_3_tags',
    dataTestId,
    ...props
  }) => {
    const handleClose = useCallback((e?: React.MouseEvent<HTMLElement, MouseEvent>, tagOnClose?: () => void) => {
      e?.preventDefault();
      onClose?.();
      tagOnClose?.();
    }, []);

    return (
      <Space
        {...spaceConfig}
        className={cn(spaceConfig.className, className)}
        data-testid={`tags-group-${dataTestId}`}
        align='baseline'
      >
        {tagsData.map(
          (
            {
              closable: tagClosable = closable,
              color: tagColor,
              onClose: tagOnClose,
              label,
              value,
              isCloseAllTag,
              hiddenValues,
              ...tagProps
            },
            idx,
          ) => {
            if (isCloseAllTag)
              return (
                <Link key={idx} onClick={(e) => handleClose(e, tagOnClose)}>
                  {value}
                </Link>
              );
            if (value) {
              const commonTagProps = {
                key: idx,
                closable: tagClosable || (closable && tagClosable),
                onClose: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => handleClose(e, tagOnClose),
                color: getTagColor(color, tagColor),
                value,
                label,
                ...tagProps,
                ...props,
              };

              return hiddenValues?.length ? (
                <Popover
                  rootClassName={styles.popover}
                  content={<PopoverContent hiddenValues={hiddenValues} />}
                  placement='bottomRight'
                  arrow={false}
                >
                  <Tag {...commonTagProps} extra={`+${hiddenValues.length}`} />
                </Popover>
              ) : (
                <Tag {...commonTagProps} />
              );
            }
            return null;
          },
        )}
      </Space>
    );
  },
);
