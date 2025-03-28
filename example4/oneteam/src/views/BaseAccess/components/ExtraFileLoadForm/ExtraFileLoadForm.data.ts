import { IExtraFileLoadFormInitialValues } from './ExtraFileLoadForm.types';

export const optionsFieldNames = { value: 'clientCode', label: 'clientName' };

export const extraFileLoadInitialValues: IExtraFileLoadFormInitialValues = {
  holding: '',
  client: [],
  allClientsChosen: false,
};

export const rules = [
  {
    required: true,
    message: 'Пожалуйста, заполните обязательное поле',
  },
];
