import React, { memo, useCallback, useMemo, useState } from 'react';
import { isArray } from '@shared/lib/utils/helpers/typeGuards/isArray';
import { Collapse as AntdCollapse, Space, Typography } from 'antd';
import cn from 'classnames';

import { ICollapseProps } from './Collapse.types';

import styles from './Collapse.module.scss';

const { Text } = Typography;

export const Collapse: React.FC<ICollapseProps> = ({
  items,
  size = 'small',
  ghost = true,
  bordered = false,
  defaultActiveKey = '',
  onChange,
  ...props
}) => {
  const [activeKeys, setActiveKeys] = useState<string[]>(
    isArray(defaultActiveKey) ? defaultActiveKey.map((el) => String(el)) : [String(defaultActiveKey)],
  );

  const onCollapseChange = useCallback((keys: string[]) => {
    setActiveKeys(keys);
    onChange?.(keys);
  }, []);

  const formattedItems = useMemo(
    () =>
      items.map((elem) => {
        const { subLabel, ...result } = elem;
        return {
          ...result,
          label:
            subLabel && !activeKeys.includes(String(result.key)) ? (
              <Space.Compact direction='vertical'>
                <Text>{result.label}</Text>
                <Text type='secondary'>{subLabel}</Text>
              </Space.Compact>
            ) : (
              result.label
            ),
        };
      }),
    [activeKeys, items],
  );
  return (
    <AntdCollapse
      {...props}
      size={size}
      ghost={ghost}
      bordered={bordered}
      items={formattedItems}
      rootClassName={cn(styles.collapse, { [styles.bordered_ghost_collapse]: bordered && ghost })}
      onChange={onCollapseChange}
      activeKey={activeKeys}
    />
  );
};

export default memo(Collapse);
