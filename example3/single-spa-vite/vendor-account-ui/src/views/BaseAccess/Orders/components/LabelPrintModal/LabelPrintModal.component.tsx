import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '@app/store/ui/ui.slice';
import { postInvoicePrintAction } from '@middleware/invoice/invoice.saga';
import { InvoiceProcedure, IResponsePrintSaga } from '@middleware/invoice/invoice.types';
import { downloadFile } from '@shared/lib';
import { Button, Modal } from '@shared/ui';
import { Result } from 'antd';
import { AxiosResponse } from 'axios';

import { subTitle, title } from './LabelPrintModal.data';
import { ILabelPrintProps } from './LabelPrintModal.types';

import styles from './LabelPrintModal.module.scss';

const LabelPrintModal: React.FC<ILabelPrintProps> = ({ id, modalProps, resultProps }) => {
  const dispatch = useDispatch();

  const handleNotification = (response: AxiosResponse<IResponsePrintSaga>) => {
    if (response?.data?.data?.url) {
      downloadFile(response.data.data.url);
      dispatch(
        setNotification({
          message: {
            title: 'Этикетки для оформления кросс-докинга сформированы, распечатайте их и разместите на коробках.',
            link: {
              text: 'Скачать этикетки',
              href: response.data.data.url,
              download: response.data.data.FileName || '',
            },
          },
          autoHide: false,
          variant: 'warning',
        }),
      );
    }
  };

  const onFinish = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(
        postInvoicePrintAction({
          id,
          proc: InvoiceProcedure['labelPrint'],
          action: (response) => handleNotification(response as AxiosResponse<IResponsePrintSaga>),
        }),
      );
      modalProps?.onCancel?.(event);
    },
    [id],
  );

  return (
    <Modal centered {...modalProps}>
      <Result
        status='success'
        title={title}
        subTitle={subTitle}
        extra={
          <>
            <Button dataTestId='button-close' onClick={modalProps?.onCancel}>
              Закрыть
            </Button>
            <Button type='primary' dataTestId='button-submit' onClick={onFinish}>
              Сформировать этикетки
            </Button>
          </>
        }
        className={styles.result}
        {...resultProps}
      />
    </Modal>
  );
};

export default memo(LabelPrintModal);
