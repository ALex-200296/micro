export const BankDetailsKey = {
  bik: 'bik',
  nameBank: 'nameBank',
  correspondentAccount: 'correspondentAccount',
  currentAccount: 'currentAccount',
} as const;

export interface IBankDetailsValues {
  [BankDetailsKey.bik]: string;
  [BankDetailsKey.nameBank]: string;
  [BankDetailsKey.correspondentAccount]: string;
  [BankDetailsKey.currentAccount]: string;
}
