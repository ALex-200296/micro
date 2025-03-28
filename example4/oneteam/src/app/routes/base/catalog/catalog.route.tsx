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
    key: Routes.Characteristics,
    id: `${Routes.Catalog}/${Routes.Control}/${Routes.Characteristics}`,
    path: `/${Routes.Catalog}/${Routes.Control}/${Routes.Characteristics}`,
    label: 'Характеристики товаров',
  },
  {
    key: Routes.Certificates,
    id: `${Routes.Catalog}/${Routes.Control}/${Routes.Certificates}`,
    path: `/${Routes.Catalog}/${Routes.Control}/${Routes.Certificates}`,
    label: 'Сертификаты',
  },
  {
    key: Routes.Images,
    id: `${Routes.Catalog}/${Routes.Control}/${Routes.Images}`,
    path: `/${Routes.Catalog}/${Routes.Control}/${Routes.Images}`,
    label: 'Изображения',
  },
  {
    key: Routes.Description,
    id: `${Routes.Catalog}/${Routes.Control}/${Routes.Description}`,
    path: `/${Routes.Catalog}/${Routes.Control}/${Routes.Description}`,
    label: 'Описание',
  },
  {
    key: Routes.TechInfo,
    id: `${Routes.Catalog}/${Routes.Control}/${Routes.TechInfo}`,
    path: `/${Routes.Catalog}/${Routes.Control}/${Routes.TechInfo}`,
    label: 'Техническая информация',
  },
  {
    key: Routes.Analog,
    id: `${Routes.Catalog}/${Routes.Control}/${Routes.Analog}`,
    path: `/${Routes.Catalog}/${Routes.Control}/${Routes.Analog}`,
    label: 'Аналоги',
  },
  {
    key: Routes.Constructor,
    id: `${Routes.Catalog}/${Routes.Control}/${Routes.Constructor}`,
    path: `/${Routes.Catalog}/${Routes.Control}/${Routes.Constructor}`,
    label: 'Конструктор',
  },
  {
    key: Routes.SameType,
    id: `${Routes.Catalog}/${Routes.Control}/${Routes.SameType}`,
    path: `/${Routes.Catalog}/${Routes.Control}/${Routes.SameType}`,
    label: 'Однотипные товары',
  },
];

export const catalogRoute: CreateSliceRouteType = {
  path: Routes.Catalog,
  id: CatalogRulesKey.catalog,
  element: <CatalogPage />,
  children: [
    {
      index: true,
      Component: () => <RedirectFromParent {...catalogRoute} />,
    },
    {
      path: Routes.Download,
      element: <DownloadPage />,
    },
    {
      path: Routes.Goods,
      element: <GoodsPage />,
    },
    {
      path: Routes.Control,
      element: <ControlPage />,
      loader: (): IReturnLoader => ({
        tabs: catalogTabs,
      }),
      children: [
        {
          id: `${Routes.Catalog}/${Routes.Control}/${Routes.Characteristics}`,
          path: Routes.Characteristics,
          element: <Characteristics id={Routes.Characteristics} />,
        },
        {
          id: `${Routes.Catalog}/${Routes.Control}/${Routes.Certificates}`,
          path: Routes.Certificates,
          element: <Certificates id={Routes.Certificates} />,
        },
        {
          id: `${Routes.Catalog}/${Routes.Control}/${Routes.Images}`,
          path: Routes.Images,
          element: <Images id={Routes.Images} />,
        },
        {
          id: `${Routes.Catalog}/${Routes.Control}/${Routes.Description}`,
          path: Routes.Description,
          element: <Description id={Routes.Description} />,
        },
        {
          id: `${Routes.Catalog}/${Routes.Control}/${Routes.TechInfo}`,
          path: Routes.TechInfo,
          element: <TechInfo id={Routes.TechInfo} />,
        },
        {
          id: `${Routes.Catalog}/${Routes.Control}/${Routes.Analog}`,
          path: Routes.Analog,
          element: <Analog id={Routes.Analog} />,
        },
        {
          id: `${Routes.Catalog}/${Routes.Control}/${Routes.Constructor}`,
          path: Routes.Constructor,
          element: <Constructor id={Routes.Constructor} />,
        },
        {
          id: `${Routes.Catalog}/${Routes.Control}/${Routes.SameType}`,
          path: Routes.SameType,
          element: <SameType id={Routes.SameType} />,
        },
      ],
    },
  ],
};
