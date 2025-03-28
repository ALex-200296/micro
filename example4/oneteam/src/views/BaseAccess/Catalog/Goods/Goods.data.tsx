import React from 'react';
import { goodsListFilters, ICatalogFilters, ICatalogTableItems } from '@app/store/catalog/catalog.types';
import { NoImageIcon } from '@shared/assets/NoImageIcon/NoImageIcon.component';
import { ColumnType, getTextStatusBadge, StatusCell } from '@shared/ui';
import { defaultFiltersConfig } from '@shared/ui/organisms/Table/FilterDropdown/FilterDropDown.data';

export const pageTitle = 'Управление списком товаров';
export const dataTestId = 'catalog-goods';
export const emptyDescription = 'Вы еще не загружали товары';
export const pageText = {
  addGoodsDescription: 'Добавить товары',
  emptyGoodsDescription: 'Вы еще не загружали товары.',
  filtersFailed: 'По вашему запросу ничего не найдено.',
  changeFilters: 'Изменить настройки фильтра',
  pageTitle: 'Управление списком товаров',
};

export const getGoodsListColumnsConfig = (
  activeFilters: Pick<ICatalogFilters, 'article' | 'name'>,
): ColumnType<ICatalogTableItems>[] => [
  {
    title: 'Статус',
    dataIndex: 'isIndex',
    key: 'isIndex',
    renderText: (isIndex: boolean) => {
      const text = isIndex ? 'Опубликован' : 'Не опубликован';
      return <StatusCell entryData={text} statusDesc={text} getStatus={getTextStatusBadge} />;
    },
    width: '8%',
  },
  {
    title: 'Основное фото',
    dataIndex: 'image',
    key: 'image',
    width: '6%',
    valueType: 'image',
    renderText: (record) => (record ? `${process.env.VITE_APP_CDN}${record}` : record),
    render: (_, entity) => <div style={{ textAlign: 'center' }}>{entity.image ? _ : <NoImageIcon />}</div>,
  },
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: goodsListFilters.name,
    width: '22%',
    sorter: true,
    ...defaultFiltersConfig(!!activeFilters[goodsListFilters.article], activeFilters[goodsListFilters.name]),
  },
  {
    title: 'Расширенный артикул',
    dataIndex: 'gdsExtArt',
    key: goodsListFilters.article,
    width: '10%',
    ...defaultFiltersConfig(!!activeFilters[goodsListFilters.name], activeFilters[goodsListFilters.article]),
  },
  {
    title: 'Серия/марка',
    key: 'series',
    width: '10%',
    renderText: (_, record) => `${record?.mnfSer ?? ''} ${record?.gdsSubBrand ?? ''}`,
  },
  {
    title: 'Единица измерения',
    dataIndex: 'edizm',
    key: 'edizm',
    width: '6%',
  },
  {
    title: 'Код товара',
    dataIndex: 'gdsCode',
    key: 'gdsCode',
    sorter: true,
    width: '10%',
  },
  {
    title: 'Код категории',
    dataIndex: 'config',
    key: 'config',
    width: '8%',
  },
  {
    title: 'Категория в каталоге',
    dataIndex: 'labelConfig',
    key: 'labelConfig',
    width: '20%',
  },
];

export const goodsListFilterConfig = {
  [goodsListFilters.category]: {
    labelPropName: 'title',
    valuePropName: 'id',
  },
  [goodsListFilters.manufacturer]: {
    labelPropName: 'label',
    valuePropName: 'value',
  },
  [goodsListFilters.series]: {
    labelPropName: 'label',
    valuePropName: 'value',
  },
  [goodsListFilters.brand]: {
    labelPropName: 'label',
    valuePropName: 'value',
  },
};
