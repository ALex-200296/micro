import { Dayjs } from 'dayjs';

export const ListMessagesKey = {
  electronicArrival: 'electronicArrival',
  electronicOrder: 'electronicOrder',
  confirmOrder: 'confirmOrder',
  nomenclatureFileRemains: 'nomenclatureFileRemains',
  nomenclatureFilePrice: 'nomenclatureFilePrice',
  estimatedDelivery: 'estimatedDelivery',
  specialConditions: 'specialConditions',
  nomenclatureFileCharacteristics: 'nomenclatureFileCharacteristics',
} as const;

export interface IListMessagesValues {
  transfer: string;
  startDate: Dayjs | null;
  launchDate: Dayjs | null;
}

export interface IDataSource extends IListMessagesValues {
  id: string[];
}

export interface IDescriptions {
  text: string;
  help?: string;
}
