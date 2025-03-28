import { IFormItemProps } from '@shared/ui';

export interface IInitialValues {
  login: string;
  password: string;
}

export interface ILoginFormProps {
  login?: Omit<IFormItemProps, 'children'>;
  password?: Omit<IFormItemProps, 'children'>;
}
