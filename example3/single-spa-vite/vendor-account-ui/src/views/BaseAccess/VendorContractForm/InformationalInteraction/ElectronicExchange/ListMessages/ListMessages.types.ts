import { Dayjs } from 'dayjs';

export const ListMessagesKey = {
  ELECTRONIC_ARRIVAL: 'electronicArrival',
  ELECTRONIC_ORDER: 'electronicOrder',
  CONFIRM_ORDER: 'confirmOrder',
  NOMENCLATURE_FILE_REMAINS: 'nomenclatureFileRemains',
  NOMENCLATURE_FILE_PRICE: 'nomenclatureFilePrice',
  ESTIMATED_DELIVERY: 'estimatedDelivery',
  SPECIAL_CONDITIONS: 'specialConditions',
  NOMENCLATURE_FILE_CHARACTERISTICS: 'nomenclatureFileCharacteristics',
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
