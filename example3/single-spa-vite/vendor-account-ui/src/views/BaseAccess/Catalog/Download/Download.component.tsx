import React, { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catalogSelectors } from '@app/store/catalog/catalog.selectors';
import {
  catalogSliceName,
  resetReportsData,
  resetReportsFilter,
  resetReportsFilters,
  setReporsSort,
  setReportsFilters,
  setReportsPagination,
  setReportsUpdate,
  typeNewGoodsLoad,
} from '@app/store/catalog/catalog.slice';
import { CatalogComputedPropertyState } from '@app/store/catalog/catalog.types';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { FiltersForm } from '@entities/common/ui';
import { useConstructReportsPage, useReportsPageFilters } from '@features/common/lib';
import { convertNameFiles, FileLoadForm, getNumForFiles, IFileLoadInitialValuesState, Manuals } from '@features/common/ui';
import { postTaskAction } from '@middleware/reports/reports.saga';
import { postTemplateAction } from '@middleware/template/template.saga';
import { createNumberId, getSortingForTable, useFilterToTag, useOnTableChange, useRules, useToggleState } from '@shared/lib';
import { dashedFormat, PageTitle, Table, TagsGroup, TemplateFileAware, Toolbar } from '@shared/ui';
import {
  filtersDrawerTitle,
  getFilterConfig,
  getReportsColumnsConfig,
  manualsDrawerTitle,
} from '@views/BaseAccess/BaseAccessPage.data';
import { IInitialFiltersValues } from '@views/BaseAccess/BaseAccessPage.types';
import dayjs from 'dayjs';

import {
  dataTestId,
  description,
  fileLoadFormProps,
  heading,
  manualsData,
  templateData,
  templateTitle,
} from './Download.data';

const Download: React.FC = () => {
  const dispatch = useDispatch();
  const { getActionAccess } = useRules();

  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();
  const {
    isOpen: templatesOpen,
    handleOpen: handleTemplatesOpen,
    handleClose: handleTemplatesClose,
  } = useToggleState();
  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();

  const isTemplateDownloadWI = getActionAccess('catalogDownload', 'templateDownload');

  const {
    isLoading,
    sliceData: { date, page, sidx, sortDate, sortStatus, records, status, rows },
  } = useConstructReportsPage({
    dataSelector: catalogSelectors.getCatalogActionsData(CatalogComputedPropertyState.NEW_GOODS_LOAD),
    setUpdate: () => setReportsUpdate(CatalogComputedPropertyState.NEW_GOODS_LOAD),
    resetFilters: () => resetReportsFilters(CatalogComputedPropertyState.NEW_GOODS_LOAD),
    sliceName: catalogSliceName,
    computedProperty: CatalogComputedPropertyState.NEW_GOODS_LOAD,
    type: typeNewGoodsLoad,
  });
  const { filtersFormItem, statusFilterOptions, handleFiltersReset, onFilterFinish } = useReportsPageFilters({
    computedProperty: CatalogComputedPropertyState.NEW_GOODS_LOAD,
    dataSelector: infoSelectors.getInfoSearch(TypeInfoSearch.CO_TABLE, CodeInfoSearch.JOB_STATE),
    setReportsFiltersType: setReportsFilters.type,
    resetReportsFiltersType: resetReportsFilters.type,
    afterFiltersSubmit: handleFiltersClose,
  });

  const filtersCount = useSelector(catalogSelectors.getCatalogFiltersCount(CatalogComputedPropertyState.NEW_GOODS_LOAD));

  const templateFileData = templateData[`${isTemplateDownloadWI}`];
  const initialFiltersValues: IInitialFiltersValues = useMemo(
    () => ({
      date: date ? dayjs(date, dashedFormat) : null,
      status: status,
    }),
    [date, status],
  );

  const onTableChange = useOnTableChange({
    onPaginate: setReportsPagination,
    onSort: setReporsSort,
    computedProperty: CatalogComputedPropertyState.NEW_GOODS_LOAD,
  });

  const filterConfig = useMemo(
    () => getFilterConfig({ date: date || '', status }, statusFilterOptions),
    [date, status, statusFilterOptions],
  );

  const { filterTagsData } = useFilterToTag({
    filterConfig,
    onClose: (key) =>
      dispatch(resetReportsFilter({ computedProperty: CatalogComputedPropertyState.NEW_GOODS_LOAD, key })),
    onCloseAll: () => dispatch(resetReportsFilters(CatalogComputedPropertyState.NEW_GOODS_LOAD)),
  });

  const columns = useMemo(
    () => getReportsColumnsConfig(getSortingForTable(sortStatus), getSortingForTable(sortDate), true, true),
    [sortStatus, sortDate, sidx],
  );

  const onFinish = useCallback((values: IFileLoadInitialValuesState) => {
    const {
      files: { fileList },
    } = values;
    const convertedFileList = convertNameFiles(fileList);
    const numForFiles = getNumForFiles(convertedFileList);
    const codeNotification = createNumberId();
    dispatch(
      postTemplateAction({ files: convertedFileList, rc: 'nsi', man: 'in', num: numForFiles, codeNotification }),
    );
    dispatch(
      postTaskAction({
        nameFile: numForFiles,
        type: typeNewGoodsLoad,
        codeNotification: codeNotification,
        actions: [{ type: resetReportsData.type, payload: CatalogComputedPropertyState.NEW_GOODS_LOAD }],
      }),
    );
    handleTemplatesClose();
  }, []);

  return (
    <>
      <PageTitle heading={heading} subHeading={<TemplateFileAware description={description} {...templateFileData} />} />
      <Toolbar>
        <Toolbar.DownloadFile
          onClick={handleTemplatesOpen}
          drawerProps={{
            width: 'md',
            destroyOnClose: true,
            title: templateTitle,
            open: templatesOpen,
            onClose: handleTemplatesClose,
            children: <FileLoadForm {...fileLoadFormProps} template={templateFileData} onFinish={onFinish} />,
          }}
        />
        <Toolbar.ApplyFilter
          onClick={handleFiltersOpen}
          notification={filtersCount}
          drawerProps={{
            destroyOnClose: true,
            title: filtersDrawerTitle,
            children: (
              <FiltersForm
                initialValues={initialFiltersValues}
                formItems={filtersFormItem}
                onReset={handleFiltersReset}
                onFinish={onFilterFinish}
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
      <TagsGroup tagsData={filterTagsData} closable dataTestId={dataTestId} />
      <Table
        columns={columns}
        dataSelector={catalogSelectors.getCatalogTableData(CatalogComputedPropertyState.NEW_GOODS_LOAD)}
        pagination={{
          current: page,
          total: records,
          pageSize: rows,
        }}
        onChange={onTableChange}
        rowKey='id'
        loading={isLoading}
      />
    </>
  );
};

export default memo(Download);
