export const DefermentKey = {
  deferment: 'deferment',
} as const;

export interface IDefermentValues {
  [DefermentKey.deferment]: string;
}
