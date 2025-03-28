import React, { memo, useCallback, useMemo, useState } from 'react';
import { isArray, isNumber, useBreakpoints } from '@shared/lib';
import { Form } from 'antd';
import cn from 'classnames';

import { filesConfig, sizeState } from './FormItem.data';
import { IFormItemProps } from './FormItem.types';

import styles from './FormItem.module.scss';

const { Item } = Form;

export const FormItem: React.FC<IFormItemProps> = memo(
  ({
    getValueProps,
    children,
    labelType = 'float',
    className: classNameProps,
    inputType = 'default',
    ...props
  }: IFormItemProps) => {
    const { isMobile } = useBreakpoints();
    const [focus, setFocus] = useState<boolean>(false);
    const [hasValue, setHasValue] = useState<boolean>(false);
    const size = useMemo(
      () =>
        isMobile
          ? sizeState['mobile']
          : children?.props?.size
          ? sizeState[children.props.size as 'large' | 'small']
          : sizeState['middle'],
      [isMobile],
    );
    const filesConfigProps = useMemo(() => (inputType === 'file' ? filesConfig : {}), []);

    const className = useMemo(
      () =>
        labelType === 'float'
          ? cn(styles.item, classNameProps, {
              [styles.item_focus]: focus,
              [styles.item_not_empty]: hasValue,
              [styles.item_mobile]: isMobile && (focus || hasValue),
            })
          : cn(styles.item_default, classNameProps),
      [labelType, focus, hasValue],
    );

    const labelStyle = useMemo(
      () =>
        labelType === 'float'
          ? {
              top: focus || hasValue ? `${size.active}rem` : `${size.default}rem`,
            }
          : undefined,
      [labelType, focus, hasValue],
    );

    const handleFocus = useCallback(() => {
      setFocus(true);
    }, []);

    const handleBlur = useCallback(() => {
      setFocus(false);
    }, []);

    const getValue = useCallback((value: any) => {
      setTimeout(() => {
        if (isArray(value)) setHasValue(!!value.length);
        else if (isNumber(value)) setHasValue(true);
        else setHasValue(!!value);
      }, 0);

      if (filesConfigProps?.valuePropName) return getValueProps ? getValueProps(value)?.fileList : value?.fileList;
      return getValueProps ? getValueProps(value) : { value: value };
    }, []);

    return (
      <Item
        labelCol={{
          style: labelStyle,
        }}
        className={className}
        {...props}
        getValueProps={getValue}
        wrapperCol={{
          onFocus: handleFocus,
          onBlur: handleBlur,
        }}
        colon={labelType === 'default'}
      >
        {children}
      </Item>
    );
  },
);
