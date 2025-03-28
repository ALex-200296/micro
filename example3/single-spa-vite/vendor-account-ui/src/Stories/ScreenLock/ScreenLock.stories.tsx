import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { setIsScreenLock } from '@app/store/ui/ui.slice';
import { ScreenLock as ScreenLockComponent } from '@shared/ui/atoms/ScreenLock/ScreenLock.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Card, Space, Typography } from 'antd';

import { getLinkToAntDesign } from '../stories.data';

const { Paragraph, Link } = Typography;

const meta: Meta<typeof ScreenLockComponent> = {
  component: ScreenLockComponent,
  title: 'ScreenLock/ScreenLock',
};

export default meta;
type Story = StoryObj<typeof ScreenLockComponent>;

export const ScreenLock: Story = {
  render: () => {
    const dispatch = useDispatch();
    const isScreenLock = useSelector(uiSelectors.getIsScreenLock);

    useEffect(() => {
      if (isScreenLock) {
        setTimeout(() => {
          dispatch(setIsScreenLock(false));
        }, 3000);
      }
    }, [isScreenLock]);

    return (
      <Space direction='vertical' size='middle'>
        {isScreenLock && <ScreenLockComponent />}
        <Card title='ScreenLock'>
          <Button onClick={() => dispatch(setIsScreenLock(true))}>Показать ScreenLook</Button>
        </Card>
        <Card>
          <Paragraph>
            Компонент ScreenLock используется в случаях, когда необходимо заблокировать пользователю взамиодейстиве с
            интерфейсом, например на время загрузки данных.
          </Paragraph>
          <Paragraph>
            В стейте проекта в реализовано состояние isScreenLock, по умолчанию false. Когда состояние изменяется на
            true, создается портал, в котором рендерится компонент ScreenLock.
          </Paragraph>
          <Paragraph>Компонент не имеет входящих параметров.</Paragraph>
        </Card>
        <Card>
          <Link href={getLinkToAntDesign('spin')}>ссылка на компонент AntDesign</Link>
        </Card>
      </Space>
    );
  },
};
