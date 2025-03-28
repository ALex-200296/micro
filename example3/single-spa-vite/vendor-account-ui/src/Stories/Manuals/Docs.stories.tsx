import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@app/store/user/user.slice';
import { Manuals } from '@features/common/ui/Manuals/Manuals.component';
import type { Meta, StoryObj } from '@storybook/react';

import { manualsDataDetail, manualsMockedData, mockedUserData } from './Docs.data';

const meta: Meta<typeof Manuals> = {
  title: 'Manuals/Документация',
  component: Manuals,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Manuals>;

export const Docs: Story = {
  args: {
    showEdoId: true,
    showManufacturerInfo: false,
    manualsData: manualsMockedData,
  },
  argTypes: {
    showEdoId: {
      description: 'Показывать ли идентификатор ЭДО ЭТМ.',
    },
    showManufacturerInfo: {
      description:
        'Показывать ли коды производителей пользователя. У каждого пользователя свой набор производителей в зависимости от организации.',
    },
    manualsData: {
      description: 'Конфигурация документации. Нужно для настройки разделов и их подпунктов.',
      table: {
        type: {
          detail: manualsDataDetail,
        },
      },
    },
  },
  render: (args) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setUser(mockedUserData));
    }, []);
    return <Manuals {...args} />;
  },
};
