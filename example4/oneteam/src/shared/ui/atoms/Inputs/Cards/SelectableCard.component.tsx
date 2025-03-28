import React from 'react';
import { ICustomCardProps } from '@shared/ui';
import { Card, Checkbox, CheckboxProps, Flex, Typography } from 'antd';
import cn from 'classnames';

import styles from './SelectableCard.module.scss';

const { Text } = Typography;

export const SelectableCard: React.FC<ICustomCardProps> = ({
  title,
  subtitle,
  checked,
  onChange,
  extra,
  bottomnNode,
  onClick,
  disabled = false,
  className,
  ...restCheckBoxProps
}) => {
  const handleCardClick: CheckboxProps['onClick'] = (event) => {
    event.stopPropagation();
    onChange?.({ ...event, target: { checked: !checked } });
  };
  const handleStopPropagation: CheckboxProps['onClick'] = (event) => {
    event.stopPropagation();
  };

  const handleOnClick: CheckboxProps['onClick'] = (event) => {
    onClick?.(event);
    handleStopPropagation(event);
  };

  return (
    <Card
      className={cn(
        styles.custom_card,
        {
          [styles.custom_card_checked]: checked,
          [styles.custom_card_disabled]: disabled,
        },
        className,
      )}
      onClick={handleCardClick}
    >
      <Flex align='flex-start' gap='small'>
        <Checkbox
          checked={checked}
          onChange={onChange}
          className={styles.checkbox}
          onClick={handleOnClick}
          {...restCheckBoxProps}
        />
        <Flex vertical className={styles.text_container}>
          <Text className={styles.text_main}>{title}</Text>
          <Text type='secondary' className={styles.text_secondary}>
            {subtitle}
          </Text>
        </Flex>
      </Flex>
      {extra && (
        <div className={styles.right_icon} onClick={handleStopPropagation}>
          {extra}
        </div>
      )}
      <Flex justify='flex-end'>
        <Text className={styles.text_main}>{bottomnNode}</Text>
      </Flex>
    </Card>
  );
};
