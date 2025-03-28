import React, { memo } from 'react';
import { useBreakpoints, useToggleState } from '@shared/lib';
import { Button, ModalMobile } from '@shared/ui';
import { Typography } from 'antd';
import cn from 'classnames';

import GetAccessForm from './GetAccessForm/GetAccessForm.component';
import {
  dataTestId,
  imageAlt,
  imageAltMobile,
  imageSource,
  imageSourceMobile,
  primaryInfoTitle,
} from './PrimaryInfo.data';

import styles from './PrimaryInfo.module.scss';

const PrimaryInfo: React.FC = () => {
  const {
    breakpoints: { xs, sm, md, lg },
  } = useBreakpoints();

  const { isOpen: modalOpen, handleOpen: handleModalOpen, handleClose: handleModalClose } = useToggleState();

  return (
    <div className={styles.primary_info}>
      <div
        className={cn(
          styles.primary_info_section,
          { [styles.primary_info_section_xs]: xs },
          { [styles.primary_info_section_sm]: sm },
          { [styles.primary_info_section_md]: md },
          { [styles.primary_info_section_lg]: lg },
        )}
      >
        <Typography.Title>Управляйте продажами – в одной команде с ЭТМ</Typography.Title>
        <Typography.Text>
          С помощью личного кабинета поставщика iPRO OneTeam вы сможете влиять на продажи своих товаров,
          синхронизировать работу с менеджерами ЭТМ, оптимизировать товарный запас и контролировать взаимозачеты.
        </Typography.Text>
        <Button
          dataTestId={dataTestId}
          className={cn({ [styles.primary_info_section_xs]: xs })}
          onClick={handleModalOpen}
          type='primary'
        >
          Получить доступ
        </Button>
      </div>
      <div
        className={cn(
          styles.primary_info_section,
          { [styles.primary_info_section_xs]: xs },
          { [styles.primary_info_section_sm]: sm },
          { [styles.primary_info_section_md]: md },
          { [styles.primary_info_section_lg]: lg },
        )}
      >
        {md && !lg ? <img src={imageSourceMobile} alt={imageAltMobile} /> : <img src={imageSource} alt={imageAlt} />}
      </div>
      <ModalMobile title={primaryInfoTitle} isOpen={modalOpen} handleClose={handleModalClose} footer={null}>
        <GetAccessForm afterSubmit={handleModalClose} />
      </ModalMobile>
    </div>
  );
};

export default memo(PrimaryInfo);
