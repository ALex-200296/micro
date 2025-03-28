import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  BarChartOutlined as AnalyticsIcon,
  LineChartOutlined as FinancesIcon,
  ReadOutlined as CatalogIcon,
  ReconciliationOutlined as LogisticsIcon,
  ScheduleOutlined as CalendarIcon,
  TeamOutlined as ProjectsIcon,
} from '@ant-design/icons';
import { Routes } from '@app/routes/root.types';
import { userSelectors } from '@app/store/user/user.selectors';
import { WrapWithNavigate } from '@entities/common/ui';
import { useBreakpoints, useRules } from '@shared/lib';
import { Typography } from 'antd';
import cn from 'classnames';

import styles from './SecondaryInfo.module.scss';

const { Text, Title } = Typography;

const SecondaryInfo: React.FC = () => {
  const {
    isDesktop,
    breakpoints: { xs, sm, md, lg },
  } = useBreakpoints();

  const { getAccessRoute } = useRules();
  const [isHaveAccessDesign, isHaveAccessDiary, isHaveAccessFinance] = [
    getAccessRoute('design'),
    getAccessRoute('diary'),
    getAccessRoute('finance'),
  ];
  const dostupOneTeam = useSelector(userSelectors.getUserDostupOneTeam);

  const isShouldWrap = useMemo(() => dostupOneTeam && isDesktop, [dostupOneTeam, isDesktop]);

  return (
    <div
      className={cn(
        styles.secondary_info,
        { [styles.secondary_info_xs]: xs },
        { [styles.secondary_info_sm]: sm },
        { [styles.secondary_info_md]: md },
        { [styles.secondary_info_lg]: lg },
      )}
    >
      <div className={styles.partition_info}>
        <WrapWithNavigate shouldWrap={isShouldWrap} to={`${Routes.CATALOG}`} className={styles.partition_title_link}>
          <Title level={2} className={styles.partition_info_title}>
            <CatalogIcon />
            <span>Каталог</span>
          </Title>
        </WrapWithNavigate>
        <Text type='secondary'>Ваши товары — всегда с полными и достоверными данными.</Text>
        <Text type='secondary'>
          Чем лучше заполнена карточка товара, тем выше вероятность, что покупатель остановит выбор именно на вашей
          продукции.
        </Text>
        <Text type='secondary'>Вы контролируете свой Каталог и при этом экономите время.</Text>
      </div>
      <div className={styles.partition_info}>
        <WrapWithNavigate shouldWrap={isShouldWrap} to={`${Routes.LOGISTICS}`} className={styles.partition_title_link}>
          <Title level={2} className={styles.partition_info_title}>
            <LogisticsIcon />
            <span>Ассортимент и логистика</span>
          </Title>
        </WrapWithNavigate>
        <Text type='secondary'>Ваш товарный запас в ЭТМ — без дефицита и с высокой уходимостью.</Text>
        <Text type='secondary'>
          Ваш товар имеет точный срок поставки, клиент приобретает его, не опасаясь задержек.
        </Text>
        <Text type='secondary'>
          Вы контролируете складскую матрицу, управляете нормами хранения и частотой поставки.
        </Text>
      </div>
      <div className={styles.partition_info}>
        <WrapWithNavigate
          shouldWrap={isShouldWrap && isHaveAccessDesign}
          to={`${Routes.DESIGN}`}
          className={styles.partition_title_link}
        >
          <Title level={2} className={styles.partition_info_title}>
            <ProjectsIcon />
            <span>Проектная работа</span>
          </Title>
        </WrapWithNavigate>
        <Text type='secondary'>Наращивайте присутствие своего бренда в проектах.</Text>
        <Text type='secondary'>Легко координировать усилия для раннего вхождения вашей продукции в проект.</Text>
        <Text type='secondary'>
          Участвуйте в адаптации проектных решений, контролируйте удержание статуса своего продукта.
        </Text>
      </div>
      <div
        className={cn(
          styles.partition_info,
          { [styles.partition_info_long_block_md]: md },
          { [styles.partition_info_long_block_lg]: lg },
        )}
      >
        <div>
          <WrapWithNavigate
            shouldWrap={isShouldWrap && isHaveAccessDiary}
            to={`${Routes.COMMUNICATIONS}`}
            className={styles.partition_title_link}
          >
            <Title level={2} className={styles.partition_info_title}>
              <CalendarIcon />
              <span>Ежедневник</span>
            </Title>
          </WrapWithNavigate>
          <Text type='secondary'>Планируйте встречи, ставьте задачи коллегам и партнерам из ЭТМ.</Text>
        </div>
        <div>
          <WrapWithNavigate
            shouldWrap={isShouldWrap && isHaveAccessFinance}
            to={`${Routes.FINANCE}`}
            className={styles.partition_title_link}
          >
            <Title level={2} className={styles.partition_info_title}>
              <FinancesIcon />
              <span>Финансы</span>
            </Title>
          </WrapWithNavigate>
          <Text type='secondary'>Контролируйте взаиморасчеты, получайте акты сверки.</Text>
        </div>
        <div>
          <WrapWithNavigate
            shouldWrap={isShouldWrap}
            to={`${Routes.ANALITICS}`}
            className={styles.partition_title_link}
          >
            <Title level={2} className={styles.partition_info_title}>
              <AnalyticsIcon />
              <span>Аналитика</span>
            </Title>
          </WrapWithNavigate>
          <Text type='secondary'>
            Контролируйте десятки параметров работы с ЭТМ— от причин срыва поставки до качества наполнения каталога.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default memo(SecondaryInfo);
