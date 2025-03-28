import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { postInvoiceActionType } from '@middleware/invoice/invoice.saga';
import { Button } from '@shared/ui';
import { Flex, Form } from 'antd';

import { ICrossDockingSubmitter } from './CrossDockingSubmitter.types';

import styles from './CrossDockingSubmitter.module.scss';

const CrossDockingSubmitter: React.FC<ICrossDockingSubmitter> = ({ onClose, id }) => {
  const isUpdateRequestPending = useSelector(uiSelectors.getIsRequestPending(`${postInvoiceActionType}/${id}`));
  return (
    <Flex className={styles.flex} gap='small'>
      <Button onClick={onClose} dataTestId='cross-docking-close' disabled={isUpdateRequestPending}>
        Отменить
      </Button>
      <Form.Item className={styles.submit}>
        <Button htmlType='submit' type='primary' dataTestId='cross-docking-send' loading={isUpdateRequestPending}>
          Отправить данные
        </Button>
      </Form.Item>
    </Flex>
  );
};

export default memo(CrossDockingSubmitter);
