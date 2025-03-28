export const BankDetailsKey = {
  BIK: 'bik',
  NAME_BANK: 'nameBank',
  CORRESPONDENT_ACCOUNT: 'correspondentAccount',
  CURRENT_ACCOUNT: 'currentAccount',
} as const;

export interface IBankDetailsValues {
  [BankDetailsKey.BIK]: string;
  [BankDetailsKey.NAME_BANK]: string;
  [BankDetailsKey.CORRESPONDENT_ACCOUNT]: string;
  [BankDetailsKey.CURRENT_ACCOUNT]: string;
}
