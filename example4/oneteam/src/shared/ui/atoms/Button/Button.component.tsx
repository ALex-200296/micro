import React, { memo } from 'react';
import { Button as ButtonAtnd, Tooltip } from 'antd';
import cn from 'classnames';

import { IButtonProps } from './Button.types';

import styles from './Button.module.scss';

export const Button: React.FC<IButtonProps> = ({
  type = 'default',
  children,
  className,
  tooltipProps,
  dataTestId,
  ...props
}) => {
  const buttonClassName = type === 'transparent' && !props.disabled ? `${className} ${styles.link}` : className;
  const buttonType = type === 'transparent' ? 'link' : type;
  const isTypeDefault = type === 'default' && !props.disabled;

  return tooltipProps ? (
    <Tooltip {...tooltipProps}>
      <ButtonAtnd
        data-testid={`button-${type}${dataTestId}`}
        type={buttonType}
        className={cn(styles.btn, { [styles.default]: isTypeDefault }, buttonClassName)}
        {...props}
      >
        {children}
      </ButtonAtnd>
    </Tooltip>
  ) : (
    <ButtonAtnd
      data-testid={`button-${type}${dataTestId}`}
      type={buttonType}
      className={cn(styles.btn, { [styles.default]: isTypeDefault }, buttonClassName)}
      {...props}
    >
      {children}
    </ButtonAtnd>
  );
};

export default memo(Button);
