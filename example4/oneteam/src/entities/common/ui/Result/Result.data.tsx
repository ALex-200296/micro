import React from 'react';
import { Location } from 'react-router-dom';
import { Routes } from '@app/routes/root.types';
import { Status404 } from '@shared/assets';

import { GetDataCodesType, Status, StatusesType } from './Result.types';

export const dataTestId = 'result';
export const serverError = /5\d/;
export const allErrors = /[4|5|6]\d{2}/;
export const noAccessError = /403/;

export const getDataCodes: GetDataCodesType = ({ title, prevLocation }) => ({
  [Status.clientError]: {
    title: `Ошибка ${title}`,
    icon: <Status404 />,
    subTitle:
      'Страница не найдена. Страница, которую вы запрашиваете, не существует.\nВозможно, она устарела, была удалена, или был введен неверный адрес страницы.',
    path: prevLocation || { pathname: Routes.Home, search: '' },
    text: 'Вернуться назад',
  },
  [Status.serverError]: {
    title: `Ошибка ${title}`,
    icon: <Status404 />,
    subTitle: 'На сервере произошла непредвиденная ошибка, мы скоро её исправим.',
    path: { pathname: Routes.Home, search: '' },
    text: 'Перейти на Главную страницу',
  },
  [Status.noAccess]: {
    icon: <Status404 />,
    subTitle: 'Что-то пошло не так',
    path: { pathname: process.env.VITE_APP_BASENAME,isAbsolutePath: true, search: '' },
    text: 'Перейти на Главную страницу',
  },
});

export const getStatusData = (status: StatusesType, title: string, prevLocation?: Location | null) => {
  if (serverError.test(status)) return getDataCodes({title})[Status.serverError];
  if (noAccessError.test(status)) return getDataCodes({title})[Status.noAccess];
  return getDataCodes({title, prevLocation})[Status.clientError];
};
