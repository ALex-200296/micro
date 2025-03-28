import React, { memo, useEffect, useRef } from 'react';
import { Flex, Form, InputNumber, Tooltip, Typography } from 'antd';

import { dataMoveTestId } from './TooltipOrderDivision.data';
import { ITooltipOrderDivisionProps } from './TooltipOrderDivision.types';

const { Title, Text } = Typography;

import { patternNumberInteger } from '@shared/lib';
import { Button, FormItem } from '@shared/ui';

import styles from './TooltipOrderDivision.module.scss';

const TooltipOrderDivision: React.FC<ITooltipOrderDivisionProps> = ({
  maxCount,
  open,
  boxNumber,
  onFinish,
  trigger = 'click',
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <Tooltip
      open={open}
      overlayClassName={styles.container}
      trigger={trigger}
      destroyTooltipOnHide
      {...props}
      title={
        <Flex vertical>
          <Title level={5} className={styles.title}>
            Разделить товар
          </Title>
          <Text className={styles.text}>Указанное количество товара будет размещено в коробке №{boxNumber}</Text>
          <Form<{ count: number }> onFinish={onFinish}>
            <Flex gap='small'>
              <FormItem
                id='count'
                name='count'
                rules={[{ required: true, message: '', pattern: patternNumberInteger }]}
              >
                <InputNumber
                  ref={inputRef}
                  min={1}
                  max={maxCount - 1}
                  suffix={`из ${maxCount}`}
                  className={styles.input_number}
                />
              </FormItem>
              <FormItem>
                <Button type='primary' htmlType='submit' dataTestId={dataMoveTestId}>
                  Переместить
                </Button>
              </FormItem>
            </Flex>
          </Form>
        </Flex>
      }
    />
  );
};
export default memo(TooltipOrderDivision);
