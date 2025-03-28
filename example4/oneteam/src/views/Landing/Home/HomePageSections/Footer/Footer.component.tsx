import React, { memo } from 'react';
import { EtmLogo, TelegramIcon, VkIcon, YouTubeIcon, ZenIcon } from '@shared/assets';
import { IconButton } from '@shared/ui';
import { Divider, Typography } from 'antd';
import cn from 'classnames';
import dayjs from 'dayjs';

import { SocialMediaRedirect } from '../../Home.data';

import { dataTestId } from './Footer.data';

import styles from './Footer.module.scss';

const { Link } = Typography;

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <Divider className={styles.divider} />
      <div className={styles.logos}>
        <Link rel='noreferrer' href='/' target='_blank'>
          <EtmLogo aria-label='логотип' className={styles.logo_icons} />
        </Link>
        <div className={styles.social_media_icons}>
          <IconButton
            aria-label='вконтакте'
            dataTestId={`vk-${dataTestId}`}
            className={styles.iconButton}
            onClick={SocialMediaRedirect.vk}
            icon={<VkIcon />}
            shape='circle'
          />
          <IconButton
            aria-label='телеграм'
            dataTestId={`telegram-${dataTestId}`}
            className={styles.iconButton}
            onClick={SocialMediaRedirect.telegram}
            icon={<TelegramIcon />}
            shape='circle'
          />
          <IconButton
            aria-label='ютуб'
            dataTestId={`youtube-${dataTestId}`}
            className={cn(styles.two_colored_icons, styles.iconButton)}
            onClick={SocialMediaRedirect.youtube}
            icon={<YouTubeIcon />}
            shape='circle'
          />
          <IconButton
            aria-label='дзен этм'
            dataTestId={`zen-${dataTestId}`}
            className={styles.iconButton}
            onClick={SocialMediaRedirect.zen}
            icon={<ZenIcon />}
            shape='circle'
          />
        </div>
      </div>
      <div className={styles.rights_and_media}>
        <Typography.Text className={styles.rights}>
          Компания ЭТМ — член ассоциации «Честная позиция». Член Российской торгово-промышленной палаты. Член ассоциации
          независимых европейских дистрибьюторов IDEE. Входит в Реестр надежных поставщиков.
          <br />
          <span className={styles.lastString}> © ЭТМ, 2023-{dayjs().year()}. </span>
        </Typography.Text>
      </div>
    </div>
  );
};

export default memo(Footer);
