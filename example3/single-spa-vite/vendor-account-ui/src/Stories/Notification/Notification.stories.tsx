import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '@app/store/ui/ui.slice';
import { INotificationActionState } from '@app/store/ui/ui.types';
import { Notification as NotificationComponent } from '@features/common/ui/Notification/Notification.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Card, Descriptions, Space, Typography } from 'antd';
import { DescriptionsProps } from 'antd/lib';
import { AnyAction } from 'redux';

import styles from './Notification.module.scss';

const { Text, Paragraph } = Typography;

const meta: Meta<typeof NotificationComponent> = {
  component: NotificationComponent,
  title: 'Notification/Notification',
};

export default meta;
type Story = StoryObj<typeof NotificationComponent>;

const Variants = ({ dispatch }: { dispatch: Dispatch<AnyAction> }) => {
  const variants: INotificationActionState['variant'][] = ['default', 'error', 'info', 'success', 'warning'];
  return (
    <Space>
      {variants.map((variant) => (
        <Button
          key={variant}
          onClick={() =>
            dispatch(setNotification({ message: { title: `${variant}` }, variant: variant, noDublicate: false }))
          }
        >
          {variant}
        </Button>
      ))}
    </Space>
  );
};

const NotifTypes = ({ dispatch }: { dispatch: Dispatch<AnyAction> }) => {
  const types: INotificationActionState['message'][] = [
    { title: 'Без ссылки' },
    {
      title: 'С ссылкой',
      link: {
        href: '',
        text: 'Ссылка',
        onClick: () => {
          alert('ссылка');
        },
      },
    },
  ];
  return (
    <Space>
      {types.map((type, idx) => (
        <Button
          key={idx}
          onClick={() => dispatch(setNotification({ message: type, variant: 'success', noDublicate: false }))}
        >
          {type.title}
        </Button>
      ))}
    </Space>
  );
};

const NotifCloseIcon = ({ dispatch }: { dispatch: Dispatch<AnyAction> }) => {
  const variants: INotificationActionState[] = [
    { message: { title: 'С иконкой закрытия' }, variant: 'success' },
    { message: { title: 'Без иконки закрытия' }, variant: 'success', isCloseIcon: false },
  ];
  return (
    <Space>
      {variants.map((variant, idx) => (
        <Button key={idx} onClick={() => dispatch(setNotification({ noDublicate: false, ...variant }))}>
          {variant.message.title}
        </Button>
      ))}
    </Space>
  );
};

const notificationParams: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'message',
    children: <Text>NotificationMeesage</Text>,
  },
  {
    key: '2',
    label: 'noDublicate?',
    children: <Text>boolean</Text>,
  },
  {
    key: '3',
    label: 'code?',
    children: <Text>number()</Text>,
  },
  {
    key: '4',
    label: 'variant?',
    children: <Text>VariantType</Text>,
  },
  {
    key: '5',
    label: 'isCloseIcon?',
    children: <Text>boolean</Text>,
  },
  {
    key: '4',
    label: 'autoHide?',
    children: <Text>boolean</Text>,
  },
];

export const Notification: Story = {
  render: () => {
    const dispatch = useDispatch();

    return (
      <Space direction='vertical' size='middle' className={styles.space}>
        <Card title='Уведомления'>
          <Button onClick={() => dispatch(setNotification({ message: { title: 'Привет мир' }, variant: 'success' }))}>
            Открыть уведомление
          </Button>
        </Card>
        <Card title='Варианты уведомлений'>
          <Variants dispatch={dispatch} />
        </Card>
        <Card title='Типы уведомлений'>
          <NotifTypes dispatch={dispatch} />
        </Card>
        <Card title='Уведомление с иконкой закрытия и без'>
          <NotifCloseIcon dispatch={dispatch} />
        </Card>
        <Card>
          <Paragraph>
            Отличие написанного компонента уведомления от библиотечной notistack заключается в том, что написанная имеет
            по дефолту иконку закрытия уведомления, предотвращение дублирующих уведомлений по статус коду и тексту
            сообщения и автоматическое скрытие через 3 секунды.
          </Paragraph>
          <Paragraph>
            Проект обернут в SnackbarProvider + Компонент работает через глобальное хранилище(redux), тем самым упрощая
            использования компонента уведомления из любой точки в проекте, для этого достаточно использовать
            action-creator - setNotification(параметры передаваемые обьекту действия будут описаны ниже).
          </Paragraph>
          <Paragraph>Также позволяет отправлять статус код от бэка и по коду определять вариант уведомления.</Paragraph>
          <Descriptions
            title='Полный список параметров передаваемые setNotification:'
            items={notificationParams}
            className={styles.descriptions}
            column={1}
          />
        </Card>
        <Card>
          <a href='https://notistack.com/'>ссылка на notistack</a>
        </Card>
        <NotificationComponent />
      </Space>
    );
  },
};
