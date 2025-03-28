import { DescriptionsProps } from 'antd';

export const getEventsCountConfig = (planned: number, completed: number): DescriptionsProps['items'] => [
  { label: 'Запланировано', children: planned },
  { label: 'Завершено', children: completed },
];
