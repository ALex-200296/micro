import { isUndefined } from '@shared/lib';
import { DescriptionsProps } from 'antd';

import { GetOrderDescColsType } from './OrderDescriptions.types';

export const getDescriptionsColumns: GetOrderDescColsType = ({ docNum, consignee, weight, volume, logisticCenter }) => [
  { label: 'Документ', renderText: () => docNum, hideInDescriptions: !docNum },
  { label: 'Грузополучатель', renderText: () => consignee?.name, hideInDescriptions: !consignee?.name },
  {
    label: 'Адрес',
    renderText: () => consignee?.address,
    hideInDescriptions: !consignee?.address,
  },
  {
    label: 'Вес и габариты',
    renderText: () =>
      `${!isUndefined(weight) ? `Масса: ${weight}кг,` : ''} ${!isUndefined(volume) ? `Объем: ${volume}м³` : ''}`,
    hideInDescriptions: isUndefined(volume) && isUndefined(weight),
  },
  {
    label: 'Логистический центр ЭТМ',
    renderText: () => logisticCenter,
    hideInDescriptions: !logisticCenter,
  },
];

export const labelStyle: DescriptionsProps['labelStyle'] = {
  padding: 0,
  width: '14rem',
};
