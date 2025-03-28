import { downloadFile as redirectToSource } from '@shared/lib/utils/helpers/download.helpers';

export const SocialMedia = {
  TELEGRAM: 'https://t.me/etm_company',
  YOUTUBE: 'https://www.YOUTUBE.com/channel/UCev9T3Qx_ZRiEM6VN5yc2ww',
  VK: 'https://VK.com/etm_company',
  DZEN: 'https://dzen.ru/etm_company?utm_referer=www.etm.ru',
} as const;

const redirectToTelegram = () => {
  redirectToSource(SocialMedia.TELEGRAM);
};

const redirectToVk = () => {
  redirectToSource(SocialMedia.VK);
};

const redirectToZen = () => {
  redirectToSource(SocialMedia.DZEN);
};

const redirectToYoutube = () => {
  redirectToSource(SocialMedia.YOUTUBE);
};

export const SocialMediaRedirect = {
  DZEN: redirectToZen,
  YOUTUBE: redirectToYoutube,
  VK: redirectToVk,
  TELEGRAM: redirectToTelegram,
} as const;
