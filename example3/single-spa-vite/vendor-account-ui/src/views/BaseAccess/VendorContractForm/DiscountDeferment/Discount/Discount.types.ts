export const DiscountKey = {
  GROUP: 'group',
  NAME: 'name',
  DISK: 'disk',
} as const;

export interface IDiscountValues {
  [DiscountKey.GROUP]: string;
  [DiscountKey.NAME]: string;
  [DiscountKey.DISK]: string;
}
export interface IDataSourceValue extends IDiscountValues {
  id: string[];
}
