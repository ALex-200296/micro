export const DefermentKey = {
  DEFERMENT: 'deferment',
} as const;

export interface IDefermentValues {
  [DefermentKey.DEFERMENT]: string;
}
