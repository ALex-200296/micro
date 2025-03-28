import React from 'react';
import { Button } from '@shared/ui/atoms/Button/Button.component';
import { Drawer as DrawerComponent } from '@shared/ui/atoms/Drawer/Drawer.component';
import { IDrawerProps } from '@shared/ui/atoms/Drawer/Drawer.types';
import { useState } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Space, Typography } from 'antd';

const { Link } = Typography;

import { dataTestId, disableProps, getLinkToAntDesign } from '../stories.data';

import { propsToDisable } from './Docs.data';

import styles from './Drawer.module.scss';

const meta: Meta<typeof DrawerComponent> = {
  component: DrawerComponent,
  title: 'Drawer/Drawer',
  argTypes: {
    ...disableProps(propsToDisable),
  },
};

export default meta;
type Story = StoryObj<typeof DrawerComponent>;

const DrawerSize = () => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState<IDrawerProps['width']>('sm');

  const changeSize = (width: IDrawerProps['width']) => {
    setOpen(true);
    setWidth(width);
  };

  return (
    <>
      <Space>
        <Button onClick={() => changeSize('sm')} dataTestId={`drawer-${dataTestId}`}>
          Открыть sm
        </Button>
        <Button onClick={() => changeSize('md')} dataTestId={`drawer-${dataTestId}`}>
          Открыть md
        </Button>
        <Button onClick={() => changeSize('lg')} dataTestId={`drawer-${dataTestId}`}>
          Открыть lg
        </Button>
      </Space>
      <div className={styles.container}>
        <DrawerComponent getContainer={false} width={width} onClose={() => setOpen(false)} open={open}>
          Привет, это дровер.
        </DrawerComponent>
      </div>
    </>
  );
};

const DrawerCopyTitle = () => {
  const [open, setOpen] = useState(false);

  return (
    <Space>
      <Button onClick={() => setOpen(true)} dataTestId={`drawer-${dataTestId}`}>
        Открыть
      </Button>
      <div className={styles.container}>
        <DrawerComponent
          getContainer={false}
          open={open}
          onClose={() => setOpen(false)}
          copyableTitlePart='Этот заголовок может быть скопирован'
        />
      </div>
    </Space>
  );
};

const DrawerPlacement = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<IDrawerProps['placement']>('right');

  const changePlacement = (placement: IDrawerProps['placement']) => {
    setOpen(true);
    setPlacement(placement);
  };

  return (
    <>
      <Space className={styles.btn}>
        <Button onClick={() => changePlacement('top')} dataTestId={`drawer-${dataTestId}`}>
          Открыть top
        </Button>
        <Button onClick={() => changePlacement('bottom')} dataTestId={`drawer-${dataTestId}`}>
          Открыть bottom
        </Button>
        <Button onClick={() => changePlacement('left')} dataTestId={`drawer-${dataTestId}`}>
          Открыть left
        </Button>
        <Button onClick={() => changePlacement('right')} dataTestId={`drawer-${dataTestId}`}>
          Открыть right
        </Button>
      </Space>
      <div className={styles.container_placement}>
        <DrawerComponent getContainer={false} placement={placement} onClose={() => setOpen(false)} open={open}>
          Привет, это дровер.
        </DrawerComponent>
      </div>
    </>
  );
};

const DrawerContent = () => {
  const [open, setOpen] = useState(false);

  return (
    <Space>
      <Button onClick={() => setOpen(true)} dataTestId={`drawer-${dataTestId}`}>
        Открыть
      </Button>
      <div className={styles.container}>
        <DrawerComponent
          getContainer={false}
          footer='Привет, это футер.'
          extra={<Button dataTestId={`drawer-${dataTestId}`}>Доп. функционал</Button>}
          width='md'
          onClose={() => setOpen(false)}
          open={open}
          title='Привет, это заголовок дровера.'
        >
          Привет, это дровер
        </DrawerComponent>
      </div>
    </Space>
  );
};

const DrawerMaskOff = () => {
  const [open, setOpen] = useState(false);

  return (
    <Space>
      <Button onClick={() => setOpen(true)} dataTestId={`drawer-${dataTestId}`}>
        Открыть
      </Button>
      <div className={styles.container}>
        <DrawerComponent getContainer={false} mask={false} width='sm' onClose={() => setOpen(false)} open={open}>
          Привет, это дровер.
        </DrawerComponent>
      </div>
    </Space>
  );
};

const DrawerDouble = () => {
  const [open, setOpen] = useState(false);
  const [secondLevelOpen, setSecondLevelOpen] = useState(false);

  return (
    <Space>
      <Button onClick={() => setOpen(true)} dataTestId={`drawer-${dataTestId}`}>
        Открыть
      </Button>
      <div className={styles.container}>
        <DrawerComponent width='sm' onClose={() => setOpen(false)} open={open}>
          <Button onClick={() => setSecondLevelOpen(true)} dataTestId={`drawer-${dataTestId}`}>
            Открыть
          </Button>
          <DrawerComponent width='sm' onClose={() => setSecondLevelOpen(false)} open={secondLevelOpen}>
            Второй уровень
          </DrawerComponent>
        </DrawerComponent>
      </div>
    </Space>
  );
};

export const Drawer: Story = {
  render: () => {
    return (
      <Space direction='vertical' size='large' className={styles.space}>
        <Card title='Дровер имеет три вариации ширины: sm = 25%, md = 50%, lg = 75%.'>{DrawerSize()}</Card>
        <Card title='Заголовок дровера может быть скопирован по нажатию на специальную иконку.'>
          {DrawerCopyTitle()}
        </Card>
        <Card title='Расположение дровера может быть справа, снизу, слева, сверху.'>{DrawerPlacement()}</Card>
        <Card title='Контент дровера может располагаться в разных секциях согласно семантике: заголовок, футер, доп. функционал.'>
          <Space className={styles.drawer}>{DrawerContent()}</Space>
        </Card>
        <Card title='Дровер без эффекта маски.'>{DrawerMaskOff()}</Card>
        <Card title='Двухуровневый дровер.'>{DrawerDouble()}</Card>
        <Card title='Ссылка на документацию.'>
          <Space>
            <Link href={getLinkToAntDesign('drawer')}>Drawer</Link>
          </Space>
        </Card>
      </Space>
    );
  },
};
