import React from 'react';
import {
  Analog,
  CatalogPage,
  Certificates,
  Characteristics,
  Constructor,
  ControlPage,
  Description,
  DownloadPage,
  GoodsPage,
  Images,
  RedirectFromParent,
  SameType,
  TechInfo,
} from '@app/routes/root.lazy';
import { CreateSliceRouteType, IReturnLoader, Routes } from '@app/routes/root.types';
import { CatalogRulesKey } from '@shared/lib/services/rules/catalog/catalog.rules';

export const catalogTabs = [
  {
    key: Routes.CHARACTERISTICS,
    id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.CHARACTERISTICS}`,
    path: `/${Routes.CATALOG}/${Routes.CONTROL}/${Routes.CHARACTERISTICS}`,
    label: 'Характеристики товаров',
  },
  {
    key: Routes.CERTIFICATES,
    id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.CERTIFICATES}`,
    path: `/${Routes.CATALOG}/${Routes.CONTROL}/${Routes.CERTIFICATES}`,
    label: 'Сертификаты',
  },
  {
    key: Routes.IMAGES,
    id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.IMAGES}`,
    path: `/${Routes.CATALOG}/${Routes.CONTROL}/${Routes.IMAGES}`,
    label: 'Изображения',
  },
  {
    key: Routes.DESCRIPTION,
    id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.DESCRIPTION}`,
    path: `/${Routes.CATALOG}/${Routes.CONTROL}/${Routes.DESCRIPTION}`,
    label: 'Описание',
  },
  {
    key: Routes.TECH_INFO,
    id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.TECH_INFO}`,
    path: `/${Routes.CATALOG}/${Routes.CONTROL}/${Routes.TECH_INFO}`,
    label: 'Техническая информация',
  },
  {
    key: Routes.ANALOG,
    id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.ANALOG}`,
    path: `/${Routes.CATALOG}/${Routes.CONTROL}/${Routes.ANALOG}`,
    label: 'Аналоги',
  },
  {
    key: Routes.CONSTRUCTOR,
    id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.CONSTRUCTOR}`,
    path: `/${Routes.CATALOG}/${Routes.CONTROL}/${Routes.CONSTRUCTOR}`,
    label: 'Конструктор',
  },
  {
    key: Routes.SAME_TYPE,
    id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.SAME_TYPE}`,
    path: `/${Routes.CATALOG}/${Routes.CONTROL}/${Routes.SAME_TYPE}`,
    label: 'Однотипные товары',
  },
];

export const catalogRoute: CreateSliceRouteType = {
  path: Routes.CATALOG,
  id: CatalogRulesKey.CATALOG,
  element: <CatalogPage />,
  children: [
    {
      index: true,
      Component: () => <RedirectFromParent {...catalogRoute} />,
    },
    {
      path: Routes.DOWNLOAD,
      element: <DownloadPage />,
    },
    {
      path: Routes.GOODS,
      element: <GoodsPage />,
    },
    {
      path: Routes.CONTROL,
      element: <ControlPage />,
      loader: (): IReturnLoader => ({
        tabs: catalogTabs,
      }),
      children: [
        {
          id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.CHARACTERISTICS}`,
          path: Routes.CHARACTERISTICS,
          element: <Characteristics id={Routes.CHARACTERISTICS} />,
        },
        {
          id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.CERTIFICATES}`,
          path: Routes.CERTIFICATES,
          element: <Certificates id={Routes.CERTIFICATES} />,
        },
        {
          id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.IMAGES}`,
          path: Routes.IMAGES,
          element: <Images id={Routes.IMAGES} />,
        },
        {
          id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.DESCRIPTION}`,
          path: Routes.DESCRIPTION,
          element: <Description id={Routes.DESCRIPTION} />,
        },
        {
          id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.TECH_INFO}`,
          path: Routes.TECH_INFO,
          element: <TechInfo id={Routes.TECH_INFO} />,
        },
        {
          id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.ANALOG}`,
          path: Routes.ANALOG,
          element: <Analog id={Routes.ANALOG} />,
        },
        {
          id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.CONSTRUCTOR}`,
          path: Routes.CONSTRUCTOR,
          element: <Constructor id={Routes.CONSTRUCTOR} />,
        },
        {
          id: `${Routes.CATALOG}/${Routes.CONTROL}/${Routes.SAME_TYPE}`,
          path: Routes.SAME_TYPE,
          element: <SameType id={Routes.SAME_TYPE} />,
        },
      ],
    },
  ],
};
