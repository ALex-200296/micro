export const DiscountKey = {
  group: 'group',
  name: 'name',
  disk: 'disk',
} as const;

export interface IDiscountValues {
  [DiscountKey.group]: string;
  [DiscountKey.name]: string;
  [DiscountKey.disk]: string;
}
export interface IDataSourceValue extends IDiscountValues {
  id: string[];
}
