import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  resetGoodsList,
  resetGoodsListFilter,
  resetGoodsListFilters,
  setGoodsListFilters,
  setGoodsListPagination,
  setGoodsListSort,
} from '@app/store/catalog/catalog.slice';
import { CatalogComputedPropertyState, goodsListFilters } from '@app/store/catalog/catalog.types';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoClass } from '@app/store/info/info.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { Manuals } from '@features/common/ui';
import {
  getGoodsListAction,
  getGoodsListFilesAction,
  getUnpubReportsFilesAction,
} from '@middleware/catalog/catalog.saga';
import { useFilterToTag, useOnTableChange, useToggleState } from '@shared/lib';
import { Empty, PageTitle, Table,TagsGroup,Toolbar } from '@shared/ui';
import { catalogSelectors } from '@store/catalog/catalog.selectors';
import { manualsDrawerTitle } from '@views/BaseAccess/BaseAccessPage.data';
import { manualsData } from '@views/BaseAccess/Catalog/Download/Download.data';
import GoodsFilter from '@views/BaseAccess/Catalog/Goods/GoodsFilter/GoodsFilter.component';
import { Flex } from 'antd';

import ReportUnpublishedGoodsDrawer from './ReportUnpublishedGoodsDrawer/ReportUnpublishedGoodsDrawer.component';
import { dataTestId, getGoodsListColumnsConfig, goodsListFilterConfig, pageText } from './Goods.data';

const Goods: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();
  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();

  const isLoading = useSelector(uiSelectors.getIsRequestPending(getGoodsListAction.type));
  const isDownloadButtonLoading = useSelector(uiSelectors.getIsRequestPending(getGoodsListFilesAction.type));

  const handleDownloadClick = useCallback(() => {
    dispatch(getGoodsListFilesAction());
  }, []);

  const { records, page, rows } = useSelector(catalogSelectors.getGoodsListPagination);

  const { sort, sortValue } = useSelector(catalogSelectors.getGoodsListSorter);
  const listStatus = useSelector(catalogSelectors.getGoodsListStatus);
  const categoriesOptions = useSelector(infoSelectors.getInfoClass(CodeInfoClass.code81));
  const catalogConfigChars = useSelector(catalogSelectors.getConfigChars);
  const manufacturerOptions = useSelector(infoSelectors.getInfoSesSearch());
  const { noIndex, brand, category, manufacturer, series, name, article } = useSelector(
    catalogSelectors.getGoodsListFilters,
  );

  const columns = useMemo(() => getGoodsListColumnsConfig({ name, article }), [name, article]);
  const filtersCount = useSelector(catalogSelectors.getGoodsListFiltersCount);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getGoodsListAction({
        noIndex,
        page,
        rows,
        sort,
        sortValue,
        listStatus,
        brand,
        category,
        manufacturer,
        series,
        name,
        article,
      }),
    );
  }, [page, rows, sort, sortValue, noIndex, brand, category, manufacturer, series, name, article]);

  const {
    page: reportsPage,
    rows: reportsRows,
    records: reportsRecords,
  } = useSelector(catalogSelectors.getUnpublishedGoodsState);

  useEffect(() => {
    dispatch(getUnpubReportsFilesAction({ page: reportsPage, rows: reportsRows }));
  }, [reportsPage]);

  const onTableChange = useOnTableChange({
    onPaginate: setGoodsListPagination,
    onSort: setGoodsListSort,
    computedProperty: CatalogComputedPropertyState.goodsLoad,
    onFilter: setGoodsListFilters,
  });

  const { filterTagsData } = useFilterToTag({
    filterConfig: {
      [goodsListFilters.noIndex]: {
        currentValue: noIndex ? 'Только неопубликованные' : '',
      },
      [goodsListFilters.category]: {
        currentValue: category,
        filterName: 'Категория',
        selectConfig: {
          ...goodsListFilterConfig.category,
          options: categoriesOptions,
        },
      },
      [goodsListFilters.manufacturer]: {
        currentValue: manufacturer,
        filterName: 'Производитель',
        dependency: { [goodsListFilters.series]: [], [goodsListFilters.brand]: [] },
        selectConfig: {
          ...goodsListFilterConfig.manufacturer,
          options: manufacturerOptions,
        },
      },
      [goodsListFilters.series]: {
        currentValue: series,
        filterName: 'Серия',
        selectConfig: {
          ...goodsListFilterConfig.series,
          options: catalogConfigChars[989]?.options || [],
        },
      },
      [goodsListFilters.brand]: {
        currentValue: brand,
        filterName: 'Марка',
        selectConfig: {
          ...goodsListFilterConfig.brand,
          options: catalogConfigChars?.[82]?.options || [],
        },
      },
      [goodsListFilters.name]: {
        currentValue: name,
        filterName: 'Наименование',
      },
      [goodsListFilters.article]: {
        currentValue: article,
        filterName: 'Расширенный артикул',
      },
    },
    onClose: (key, value, dependency) => {
      dispatch(resetGoodsListFilter({ key, value }));
      if (dependency) {
        dispatch(setGoodsListFilters(dependency));
      }
    },

    onCloseAll: () => dispatch(resetGoodsListFilters()),
  });

  const onFiltersReset = useCallback(() => {
    dispatch(resetGoodsListFilters());
  }, []);

  useEffect(
    () => () => {
      dispatch(resetGoodsList());
    },
    [],
  );

  return (
    <>
      <PageTitle heading={pageText.pageTitle} />
      <Flex justify={reportsRecords ? 'space-between' : 'end'} gap='small' className='margin_4_toolbar'>
        {!!reportsRecords && (
          <ReportUnpublishedGoodsDrawer
            dataTestId={dataTestId}
            page={reportsPage}
            rows={reportsRows}
            records={reportsRecords}
          />
        )}
        <Toolbar excludeClassName>
          <Toolbar.AddGoods />
          <Toolbar.EditGoods />
          <Toolbar.DownloadUnpublishedGoods loading={isDownloadButtonLoading} onClick={handleDownloadClick} />
          <Toolbar.ApplyFilter
            onClick={handleFiltersOpen}
            notification={filtersCount}
            drawerProps={{
              destroyOnClose: true,
              title: 'Фильтр',
              children: (
                <GoodsFilter
                  onFinish={(values) => {
                    dispatch(setGoodsListFilters(values));
                    handleFiltersClose();
                  }}
                  onReset={onFiltersReset}
                  initialValues={{
                    noIndex,
                    category,
                    manufacturer,
                    brand,
                    series,
                    name,
                    article,
                  }}
                />
              ),
              open: filtersOpen,
              onClose: handleFiltersClose,
            }}
          />
          <Toolbar.OpenDocumentation
            onClick={handleManualsOpen}
            drawerProps={{
              open: manualsOpen,
              onClose: handleManualsClose,
              title: manualsDrawerTitle,
              children: <Manuals manualsData={manualsData} showManufacturerInfo />,
            }}
          />
        </Toolbar>
      </Flex>
      <TagsGroup tagsData={filterTagsData} closable dataTestId={dataTestId} />
      <Table
        columns={columns}
        pagination={{
          current: page,
          pageSize: rows,
          total: records,
        }}
        dataSelector={catalogSelectors.getGoodsList}
        rowKey='id'
        loading={isLoading}
        onChange={onTableChange}
        locale={{
          emptyText:
            filtersCount && !records ? (
              <Empty
                description={pageText.filtersFailed}
                linkProps={{ children: pageText.changeFilters, onClick: () => handleFiltersOpen() }}
              />
            ) : (
              <Empty
                description={pageText.emptyGoodsDescription}
                linkProps={{ children: pageText.addGoodsDescription, onClick: () => navigate('/catalog/download') }}
              />
            ),
        }}
      />
    </>
  );
};

export default memo(Goods);
