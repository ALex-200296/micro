import React, { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catalogSelectors } from '@app/store/catalog/catalog.selectors';
import {
  catalogSliceName,
  resetReportsFilter,
  resetReportsFilters,
  setReporsSort,
  setReportsFilters,
  setReportsPagination,
  setReportsUpdate,
  typeImagesLoad,
} from '@app/store/catalog/catalog.slice';
import { CatalogComputedPropertyState } from '@app/store/catalog/catalog.types';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { setHelpState, setPrefillHelp } from '@app/store/ui/ui.slice';
import { userSelectors } from '@app/store/user/user.selectors';
import { FiltersForm } from '@entities/common/ui';
import { useConstructReportsPage, useReportsPageFilters } from '@features/common/lib';
import { FileLoadForm, Manuals } from '@features/common/ui';
import { getSortingForTable, useFilterToTag, useOnTableChange, useToggleState } from '@shared/lib';
import { dashedFormat, Table, TagsGroup, Toolbar } from '@shared/ui';
import {
  filtersDrawerTitle,
  getFilterConfig,
  getReportsColumnsConfig,
  manualsDrawerTitle,
} from '@views/BaseAccess/BaseAccessPage.data';
import { IInitialFiltersValues } from '@views/BaseAccess/BaseAccessPage.types';
import dayjs from 'dayjs';

import { dataTestId, getExtraFileLoadProps, tabsInfoData } from '../ControlPage.data';
import { ISubSectionProps } from '../ControlPage.types';

import { imageBtnName } from './Images.data';

const Images: React.FC<ISubSectionProps> = ({ id }) => {
  const dispatch = useDispatch();

  const code = useSelector(userSelectors.getManufacturerCode);
  const filtersCount = useSelector(catalogSelectors.getCatalogFiltersCount(CatalogComputedPropertyState.imagesLoad));
  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();
  const {
    isOpen: templatesOpen,
    handleOpen: handleTemplatesOpen,
    handleClose: handleTemplatesClose,
  } = useToggleState();
  const { isOpen: imageOpen, handleOpen: handleImageOpen, handleClose: handleImageClose } = useToggleState();
  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();

  const {
    isLoading,
    onFinishTemplateForm,
    onFinishResourceUploadForm,
    sliceData: { date, page, sidx, sortDate, sortStatus, records, status, rows },
  } = useConstructReportsPage({
    dataSelector: catalogSelectors.getCatalogActionsData(CatalogComputedPropertyState.imagesLoad),
    setUpdate: () => setReportsUpdate(CatalogComputedPropertyState.imagesLoad),
    resetFilters: () => resetReportsFilters(CatalogComputedPropertyState.imagesLoad),
    sliceName: catalogSliceName,
    computedProperty: CatalogComputedPropertyState.imagesLoad,
    type: typeImagesLoad,
    templateProps: {
      handleClose: handleTemplatesClose,
      params: { rc: 'nsi', man: 'in' },
    },
    resourceUploadProps: {
      handleClose: handleImageClose,
      params: { rc: 'lkp_files', man: `${code}_foto` },
    },
  });

  const { filtersFormItem, statusFilterOptions, handleFiltersReset, onFilterFinish } = useReportsPageFilters({
    computedProperty: CatalogComputedPropertyState.imagesLoad,
    dataSelector: infoSelectors.getInfoSearch(TypeInfoSearch.co_table, CodeInfoSearch.job_state),
    setReportsFiltersType: setReportsFilters.type,
    resetReportsFiltersType: resetReportsFilters.type,
    afterFiltersSubmit: handleFiltersClose,
  });

  const initialFiltersValues: IInitialFiltersValues = useMemo(
    () => ({
      date: date ? dayjs(date, dashedFormat) : null,
      status: status,
    }),
    [date, status],
  );
  const columns = useMemo(
    () => getReportsColumnsConfig(getSortingForTable(sortStatus), getSortingForTable(sortDate)),
    [sortStatus, sortDate, sidx],
  );
  const { templateFileLoadData, sectionFileLoadData, manualsData, templateTitle, uploaditle } = useMemo(
    () => tabsInfoData[id],
    [id],
  );

  const onTableChange = useOnTableChange({
    onPaginate: setReportsPagination,
    onSort: setReporsSort,
    computedProperty: CatalogComputedPropertyState.imagesLoad,
  });

  const filterConfig = useMemo(
    () => getFilterConfig({ date: date || '', status }, statusFilterOptions),
    [date, status, statusFilterOptions],
  );

  const { filterTagsData } = useFilterToTag({
    filterConfig,
    onClose: (key) => dispatch(resetReportsFilter({ computedProperty: CatalogComputedPropertyState.imagesLoad, key })),
    onCloseAll: () => dispatch(resetReportsFilters(CatalogComputedPropertyState.imagesLoad)),
  });

  const handleHelpOpen = useCallback(() => {
    dispatch(setHelpState(true));
    dispatch(setPrefillHelp(true));
  }, []);

  return (
    <>
      <Toolbar>
        <Toolbar.DownloadFile
          onClick={handleTemplatesOpen}
          drawerProps={{
            width: 'md',
            destroyOnClose: true,
            title: templateTitle,
            open: templatesOpen,
            onClose: handleTemplatesClose,
            children: <FileLoadForm {...templateFileLoadData} onFinish={onFinishTemplateForm} />,
          }}
        />
        <Toolbar.DownloadFile
          onClick={handleImageOpen}
          type='default'
          {...getExtraFileLoadProps(!code, handleHelpOpen)}
          drawerProps={{
            width: 'md',
            destroyOnClose: true,
            title: uploaditle,
            open: imageOpen,
            onClose: handleImageClose,
            children: <FileLoadForm {...sectionFileLoadData} onFinish={onFinishResourceUploadForm} />,
          }}
        >
          {imageBtnName}
        </Toolbar.DownloadFile>
        <Toolbar.ApplyFilter
          onClick={handleFiltersOpen}
          notification={filtersCount}
          drawerProps={{
            destroyOnClose: true,
            open: filtersOpen,
            onClose: handleFiltersClose,
            title: filtersDrawerTitle,
            children: (
              <FiltersForm
                initialValues={initialFiltersValues}
                formItems={filtersFormItem}
                onReset={handleFiltersReset}
                onFinish={onFilterFinish}
              />
            ),
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
      <TagsGroup tagsData={filterTagsData} closable dataTestId={dataTestId} />
      <Table
        columns={columns}
        dataSelector={catalogSelectors.getCatalogTableData(CatalogComputedPropertyState.imagesLoad)}
        pagination={{
          current: page,
          pageSize: rows,
          total: records,
        }}
        onChange={onTableChange}
        rowKey='id'
        loading={isLoading}
      />
    </>
  );
};

export default memo(Images);
