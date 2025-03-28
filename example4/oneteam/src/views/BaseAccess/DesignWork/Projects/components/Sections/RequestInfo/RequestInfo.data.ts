import { shortYearSlashedFormat, slashedYearMonthFormat } from '@shared/ui';
import { DescriptionsProps } from 'antd';
import dayjs from 'dayjs';

import { RequestInfoProps } from './RequestInfo.types';

const formatDate = (date: string) => dayjs(date, shortYearSlashedFormat).format(slashedYearMonthFormat);
const showSumSection = (requestType?: string): boolean =>
  requestType ? requestType.toLowerCase() !== 'запрос на регистрацию проекта' : true;
export const getRequestDescriptionsItems = ({
  requestType,
  opName,
  prjName,
  addressF_desc,
  opCode,
  SubBegSupply,
  SubEndSupply,
  planTOSum,
}: RequestInfoProps): Array<DescriptionsProps['items']> => [
  [
    ...(requestType ? [{ label: 'Тип запроса', children: requestType }] : []),
    { label: 'Название', children: prjName },
    { label: 'Адрес объекта', children: addressF_desc },
    { label: 'Офис', children: opName },
    { label: 'Код офиса', children: opCode },
  ],
  [
    ...(showSumSection(requestType)
      ? [
          {
            label: 'Сумма к реализации',
            children: planTOSum,
          },
        ]
      : []),
    { label: 'Начало отгрузок', children: formatDate(SubBegSupply) },
    { label: 'Окончание отгрузок', children: formatDate(SubEndSupply) },
  ],
];
