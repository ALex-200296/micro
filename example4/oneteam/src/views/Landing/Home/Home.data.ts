import { downloadFile as redirectToSource } from '@shared/lib/utils/helpers/download.helpers';

export enum socialMedia {
  telegram = 'https://t.me/etm_company',
  youtube = 'https://www.youtube.com/channel/UCev9T3Qx_ZRiEM6VN5yc2ww',
  vk = 'https://vk.com/etm_company',
  zen = 'https://dzen.ru/etm_company?utm_referer=www.etm.ru',
}

const redirectToTelegram = () => {
  redirectToSource(socialMedia.telegram);
};

const redirectToVk = () => {
  redirectToSource(socialMedia.vk);
};

const redirectToZen = () => {
  redirectToSource(socialMedia.zen);
};

const redirectToYoutube = () => {
  redirectToSource(socialMedia.youtube);
};

export const SocialMediaRedirect = {
  zen: redirectToZen,
  youtube: redirectToYoutube,
  vk: redirectToVk,
  telegram: redirectToTelegram,
};
