import React from 'react';
import { ICliRole } from '@app/store/project/project.types';
import { Collapse, CollapseContent } from '@shared/ui';
import { DescriptionsProps } from 'antd';

export const formatDataPhysical = ({ fio, manName, manPost, phone, manPhone, email, manEmail }: ICliRole) => ({
  fio: fio || manName || '',
  role: manPost || '',
  phone: phone || manPhone || '',
  email: email || manEmail || '',
});

export const getPhysicalCollapseLabel = (cliRole: ICliRole): string => {
  const { fio, phone } = formatDataPhysical(cliRole);
  return fio + (phone && `, ${phone}`);
};
export const getPhysicalCollapseContent = ({ manPost, email, manEmail }: ICliRole) => [
  { label: 'Должность', children: manPost || '-' },
  { label: 'Email', children: email || manEmail || '-' },
];

export const getJuristicCollapseLabel = ({ inn, cliName }: ICliRole) => `${cliName}` + (inn && `, ИНН: ${inn}`);
export const getJuristicCollapseContent = ({ phone, manPhone, fio, manPost, address }: ICliRole) => [
  { label: 'Контактное лицо', children: fio },
  { label: 'Должность', children: manPost || '-' },
  { label: 'Телефон', children: phone || manPhone || '-' },
  { label: 'Юр. адрес', children: address || '-' },
];

const juristicRolesToShow = ['инвестор', 'заказчик', 'генподрядчик', 'проектировщик', 'генпроектировщик', 'подрядчик'];
const juristicRolesToHideOnRegistration = ['генподрядчик', 'подрядчик'];

const physicalRolesToShow = ['рп', 'срп'];

const filterPhysicalRoles = (clients: ICliRole[]) =>
  clients.length === 2 ? clients.filter((client) => client.role.toLowerCase() === 'рп') : clients;

const filterJuristicRoles = (clients: ICliRole[], requestType: string) =>
  requestType === 'Запрос на регистрацию проекта'
    ? clients.filter((client) => !juristicRolesToHideOnRegistration.includes(client.role.toLowerCase()))
    : clients;

export const splitClientsByType = (clients: ICliRole[], requestType: string) => ({
  physical: filterPhysicalRoles(clients.filter((client) => physicalRolesToShow.includes(client.role.toLowerCase()))),
  juristic: filterJuristicRoles(
    clients.filter((client) => juristicRolesToShow.includes(client.role.toLowerCase())),
    requestType,
  ),
});

export const getTitle = ({ role, roleName }: ICliRole) => {
  switch (role) {
    case 'РП':
    case 'СРП':
      return roleName;
    default:
      return role;
  }
};
export const getDescriptionsManInfo = (
  clients: ICliRole[],
  requestType: string,
  author?: ICliRole,
): DescriptionsProps['items'] => {
  const { juristic, physical } = splitClientsByType(clients, requestType);

  return [
    ...(author ? [author, ...physical] : physical).map((data, index) => ({
      key: `${index}physical`,
      children: (
        <Collapse
          items={[
            {
              children: <CollapseContent content={getPhysicalCollapseContent(data)} />,
              label: getPhysicalCollapseLabel(data),
            },
          ]}
        />
      ),
      label: getTitle(data),
    })),
    ...juristic.map((data, index) => ({
      key: `${index}juristic`,
      children: (
        <Collapse
          items={[
            {
              children: <CollapseContent content={getJuristicCollapseContent(data)} />,
              label: getJuristicCollapseLabel(data),
            },
          ]}
        />
      ),
      label: getTitle(data),
    })),
  ];
};
