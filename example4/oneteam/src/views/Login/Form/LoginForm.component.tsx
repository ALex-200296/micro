import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@app/routes/root.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { userSelectors } from '@app/store/user/user.selectors';
import { setError, userSliceName } from '@app/store/user/user.slice';
import { patternErrorPage } from '@middleware/root.data';
import { postUserAction } from '@middleware/user/user.saga';
import { useHistory } from '@shared/lib';
import { Button, FormItem } from '@shared/ui';
import { Form, Input, Typography } from 'antd';

import {
  dataTestId,
  errorMessage,
  heading,
  initialValues,
  linkToRegistrationFormIpro,
  loginFormProps,
} from './LoginForm.data';
import { IInitialValues, ILoginFormProps } from './LoginForm.types';

import styles from './LoginForm.module.scss';

const { Text, Title, Link } = Typography;

const LoginForm: React.FC<ILoginFormProps> = () => {
  const error = useSelector(userSelectors.getUserError);
  const isLoading = useSelector(uiSelectors.getIsRequestPending(userSliceName));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {
    history: { prevLocation },
  } = useHistory();

  const pushActionPath = useCallback(() => {
    if (
      prevLocation !== null &&
      !patternErrorPage.test(prevLocation.pathname) &&
      prevLocation.pathname !== Routes.Login
    )
      return navigate(prevLocation);
    navigate(Routes.Home);
  }, []);

  const onFinish = useCallback((values: IInitialValues) => {
    const { login, password } = values;
    dispatch(postUserAction({ login: login, password: password, action: pushActionPath }));
  }, []);

  const onValuesChange = useCallback(() => {
    if (error) dispatch(setError(false));
  }, [error]);

  useEffect(
    () => () => {
      dispatch(setError(false));
    },
    [],
  );

  return (
    <Form
      onFinish={onFinish}
      form={form}
      onValuesChange={onValuesChange}
      className={styles.form}
      initialValues={initialValues}
    >
      <Title className={styles.title} level={2}>
        {heading}
      </Title>
      <FormItem {...loginFormProps.login}>
        <Input />
      </FormItem>
      <FormItem {...loginFormProps.password}>
        <Input.Password />
      </FormItem>
      {error && <Text className={styles.error_message}>{errorMessage}</Text>}
      <FormItem className={styles.btn}>
        <Button dataTestId={dataTestId} loading={isLoading} type='primary' htmlType='submit' className={styles.btn}>
          войти
        </Button>
      </FormItem>
      <Text>
        <Link href={linkToRegistrationFormIpro} target='_blank'>
          Зарегистрируйтесь
        </Link>
        , если нет аккаунта
      </Text>
    </Form>
  );
};

export default memo(LoginForm);
