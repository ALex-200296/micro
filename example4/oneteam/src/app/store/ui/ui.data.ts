import { VariantType } from 'notistack';

const statusError = /[4-5]\d{2}/;
const statusSuccess = /2\d{2}/;

export const getVariantNotification = (code?: number, variant?: VariantType): VariantType => {
  if (variant) return variant;
  if (statusError.test(`${code}`)) return 'error';
  if (statusSuccess.test(`${code}`)) return 'success';
  return 'default';
};
