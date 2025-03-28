import React from 'react';
import { IUserManufsState } from '@app/store/user/user.types';
import { IManualsData } from '@features/common/ui';
import { ColumnType } from '@shared/ui/molecules/BaseTable/Table.types';
import { docsPath } from '@views/BaseAccess/BaseAccessPage.data';
import { Descriptions, DescriptionsProps } from 'antd';

const manufCodeLabel = 'Код производителя';
const manufNameLabel = 'Название производителя';
export const accountLabel = 'Аккаунт';
export const companyInfoLabel = 'Информация о компании';

export const getAccountInfoConfig = (fio: string, phone: string, email: string): DescriptionsProps['items'] => [
  { label: 'ФИО', children: fio },
  {
    children: (
      <Descriptions
        column={1}
        items={[
          { label: 'Телефон', children: phone },
          { label: 'Email', children: email },
        ]}
      />
    ),
  },
];

export const getCompanySubInfoConfig = (OrgKpp: string, OrgInn: string): DescriptionsProps['items'] => [
  { label: 'ИНН', children: OrgInn },
  { label: 'КПП', children: OrgKpp },
];

export const getCompanyInfoConfig = (OrgName: string, OrgCode: string): DescriptionsProps['items'] => [
  {
    children: (
      <Descriptions
        column={1}
        items={[
          { label: 'Код компании', children: OrgCode },
          { label: 'Название компании', children: OrgName },
        ]}
      />
    ),
  },
];

export const accountColumsConfig: ColumnType<IUserManufsState>[] = [
  {
    title: manufCodeLabel,
    dataIndex: 'code',
    align: 'left',
  },
  {
    title: manufNameLabel,
    dataIndex: 'name',
    align: 'left',
  },
];

export const manualsData: IManualsData[] = [
  {
    name: 'Вебинары',
    data: [
      {
        name: 'Маркетинговое предложение ЭТМ',
        video: true,
        to: `${docsPath}/marketing_offer.mp4`,
        thumbnail: `${docsPath}/marketing_offer.png`,
      },
    ],
  },
];
