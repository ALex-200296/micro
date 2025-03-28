import { IInitialValues, ILoginFormProps } from './LoginForm.types';

export const dataTestId = 'login-form';
export const heading = 'Вход в iPRO OneTeam';
export const errorMessage = 'Неверный логин или пароль';
export const linkToRegistrationFormIpro = `${process.env.VITE_APP_LINK_TO_FOR_MERCHANT}?runRegister=true`;
export const initialValues: IInitialValues = {
  login: '',
  password: '',
};

export const loginFormProps: ILoginFormProps = {
  login: {
    name: 'login',
    label: 'Логин',
    labelType: 'float',
    rules: [{ required: true, message: 'Введите логин' }],
  },
  password: {
    name: 'password',
    label: 'Пароль',
    labelType: 'float',
    rules: [{ required: true, message: 'Введите пароль' }],
  },
};
