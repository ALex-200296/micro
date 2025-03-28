import React, { memo } from 'react';
import { isArray } from '@shared/lib';
import { Button, FormItem } from '@shared/ui/atoms';
import { Form, Space } from 'antd';
import cn from 'classnames';
import { Store } from 'rc-field-form/lib/interface';

import { IFiltersFormProps } from './FiltersForm.types';

import styles from './FiltersForm.module.scss';

const BaseFiltersForm = <T extends Store>({
  formItems,
  initialValues,
  onReset,
  onFinish,
  onValueChange,
  className,
  form,
}: IFiltersFormProps<T>) => {
  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      onValuesChange={onValueChange}
      className={cn(styles.form, className)}
    >
      {isArray(formItems)
        ? formItems.map((formItemProps, idx) => <FormItem key={idx} {...formItemProps} />)
        : formItems}
      <Space className={styles.buttons_space}>
        {!!onReset && (
          <FormItem>
            <Button dataTestId='reset-filters-form' htmlType='reset' onClick={onReset}>
              Сбросить фильтры
            </Button>
          </FormItem>
        )}
        {!!onFinish && (
          <FormItem>
            <Button dataTestId='finish-filters-form' htmlType='submit' type='primary'>
              Применить
            </Button>
          </FormItem>
        )}
      </Space>
    </Form>
  );
};

export const FiltersForm = memo(BaseFiltersForm) as typeof BaseFiltersForm;
