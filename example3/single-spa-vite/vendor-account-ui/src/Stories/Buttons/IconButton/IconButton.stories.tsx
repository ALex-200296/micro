import React from 'react';
import { IconButton as IconButtonComponent } from '@shared/ui/molecules/Button/IconButton/IconButton.component';
import { IconButtonProps } from '@shared/ui/molecules/Button/IconButton/IconButton.types';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Space, Typography } from 'antd';

import { dataTestId, getLinkToAntDesign } from '../../stories.data';

import { Docs } from './Docs.stories';

import styles from './IconButton.module.scss';

const meta: Meta<typeof IconButtonComponent> = {
  component: IconButtonComponent,
  title: 'buttons/IconButton',
};

export default meta;
type Story = StoryObj<typeof IconButtonComponent>;

const ButtonSizeGroup: React.FC<IconButtonProps> = (props) => {
  const sizes: IconButtonProps['size'][] = ['small', 'middle', 'large'];
  return (
    <>
      {sizes.map((size, idx) => (
        <IconButtonComponent key={idx} size={size} className={styles.button} {...props} />
      ))}
    </>
  );
};

const ButtonNotifGroup: React.FC<IconButtonProps> = (props) => {
  const notifs: IconButtonProps['notification'][] = [9, 99, 999];
  return (
    <>
      {notifs.map((notif, idx) => (
        <IconButtonComponent key={idx} notification={notif} className={styles.button} {...props} />
      ))}
    </>
  );
};

const ButtonshapeGroup: React.FC<IconButtonProps> = (props) => {
  const shapes: IconButtonProps['shape'][] = ['circle', 'default', 'round'];
  return (
    <>
      {shapes.map((shape, idx) => (
        <IconButtonComponent key={idx} shape={shape} className={styles.button} {...props} />
      ))}
    </>
  );
};
const ButtonTypeGroup: React.FC<IconButtonProps> = (props) => {
  const types: IconButtonProps['type'][] = ['primary', 'default', 'dashed', 'text', 'link', 'transparent'];
  return (
    <>
      {types.map((type, idx) => (
        <IconButtonComponent key={idx} type={type} className={styles.button} {...props} />
      ))}
    </>
  );
};

const ButtonStateGroup: React.FC<IconButtonProps> = (props) => {
  const states: Pick<IconButtonProps, 'danger' | 'loading' | 'disabled'> = {
    danger: true,
    disabled: true,
    loading: true,
  };
  return (
    <>
      {Object.entries(states).map((state, idx) => (
        <IconButtonComponent key={idx} className={styles.button} {...{ [state[0]]: state[1] }} {...props} />
      ))}
    </>
  );
};

export const IconButton: Story = {
  ...Docs,
  render(args) {
    return (
      <Space direction='vertical' size='middle'>
        <Card title='Кнопка c иконкой'>
          <IconButtonComponent {...args} />
        </Card>
        <Card title='Кнопка c иконкой поддерживает небольшое числовое значение или дескриптор состояния'>
          <ButtonNotifGroup dataTestId={`iconbutton-${dataTestId}`} icon={args.icon}>
            {args.children}
          </ButtonNotifGroup>
        </Card>
        <Card title='Кнопка c иконкой поддерживает размер по умолчанию, а также большой и маленький размер.'>
          <ButtonSizeGroup dataTestId={`iconbutton-${dataTestId}`} icon={args.icon}>
            {args.children}
          </ButtonSizeGroup>
        </Card>
        <Card title='Кнопка c иконкой поддерживает разные стили.'>
          <ButtonTypeGroup dataTestId={`iconbutton-${dataTestId}`} icon={args.icon}>
            {args.children}
          </ButtonTypeGroup>
        </Card>
        <Card title='Кнопка c иконкой поддерживает разные состояния: статус ошибки, статус неактивный, статус загрузки'>
          <ButtonStateGroup dataTestId={`iconbutton-${dataTestId}`} icon={args.icon}>
            {args.children}
          </ButtonStateGroup>
        </Card>
        <Card>
          <Typography.Text>
            Отличие написанного компонента кнопки с иконкой от антовской кнопки заключается в том, что написанная имеет
            дополнительный пропс notification и обязательный пропс icon. Тем самым кнопка c иконкой поддерживает
            небольшое числовое значение.
          </Typography.Text>
        </Card>
        <Card>
          <a href={getLinkToAntDesign('button')}>ссылка на кнопку ant design</a>
        </Card>
      </Space>
    );
  },
};
