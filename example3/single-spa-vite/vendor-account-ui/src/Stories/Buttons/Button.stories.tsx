import React from 'react';
import { Button } from '@shared/ui/atoms/Button/Button.component';
import { IButtonProps } from '@shared/ui/atoms/Button/Button.types';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Space, Typography } from 'antd';

import { dataTestId, getLinkToAntDesign } from '../stories.data';

import { Docs } from './Docs.stories';

import styles from './Button.module.scss';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'buttons',
};

export default meta;
type Story = StoryObj<typeof Button>;

const ButtonSizeGroup: React.FC<IButtonProps> = (props) => {
  const sizes: IButtonProps['size'][] = ['small', 'middle', 'large'];
  return (
    <>
      {sizes.map((size, idx) => (
        <Button key={idx} size={size} className={styles.button} {...props} />
      ))}
    </>
  );
};

const ButtonshapeGroup: React.FC<IButtonProps> = (props) => {
  const shapes: IButtonProps['shape'][] = ['circle', 'default', 'round'];
  return (
    <>
      {shapes.map((shape, idx) => (
        <Button key={idx} shape={shape} className={styles.button} {...props} />
      ))}
    </>
  );
};

const ButtonTypeGroup: React.FC<IButtonProps> = (props) => {
  const types: IButtonProps['type'][] = ['primary', 'default', 'dashed', 'text', 'link', 'transparent'];
  return (
    <>
      {types.map((type, idx) => (
        <Button key={idx} type={type} className={styles.button} {...props} />
      ))}
    </>
  );
};

const ButtonStateGroup: React.FC<IButtonProps> = (props) => {
  const states: Pick<IButtonProps, 'danger' | 'loading' | 'disabled'> = { danger: true, disabled: true, loading: true };
  return (
    <>
      {Object.entries(states).map((state, idx) => (
        <Button key={idx} className={styles.button} {...{ [state[0]]: state[1] }} {...props} />
      ))}
    </>
  );
};

export const Buttons: Story = {
  ...Docs,
  render(args) {
    return (
      <Space direction='vertical' size='middle' className={styles.space}>
        <Card title='Кнопки'>
          <ButtonTypeGroup dataTestId={dataTestId}>{args.children}</ButtonTypeGroup>
        </Card>
        <Card title='Кнопка поддерживает размер по умолчанию, а также большой и маленький размер.'>
          <ButtonSizeGroup dataTestId={dataTestId}>{args.children}</ButtonSizeGroup>
        </Card>
        <Card title='Кнопка поддерживает форму по умолчанию, а также круга и закругленный.'>
          <ButtonshapeGroup dataTestId={dataTestId}>{args.children}</ButtonshapeGroup>
        </Card>
        <Card title='Кнопка поддерживает разные состояния: статус ошибки, статус неактивный, статус загрузки'>
          <ButtonStateGroup dataTestId={dataTestId}>{args.children}</ButtonStateGroup>
        </Card>
        <Card>
          <Typography.Text>
            Отличие написанного компонента кнопки от антовской заключается в том, что написанная имеет дополнительный
            пропс primary, который позволяет указать, является ли кнопка основной, также отсутствует пропс ghost, type и
            rootClassName
          </Typography.Text>
        </Card>
        <Card>
          <a href={getLinkToAntDesign('button')}>ссылка на кнопку ant design</a>
        </Card>
      </Space>
    );
  },
};
