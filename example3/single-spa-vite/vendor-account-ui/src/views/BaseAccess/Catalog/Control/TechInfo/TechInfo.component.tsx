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
  typeTechInfoLoad,
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

import { techInfoBtnName } from './TechInfo.data';

const TechInfo: React.FC<ISubSectionProps> = ({ id }) => {
  const dispatch = useDispatch();

  const filtersCount = useSelector(catalogSelectors.getCatalogFiltersCount(CatalogComputedPropertyState.TECH_INFO_LOAD));
  const manufacturer = useSelector(userSelectors.getManufacturerCode);

  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();
  const {
    isOpen: templatesOpen,
    handleOpen: handleTemplatesOpen,
    handleClose: handleTemplatesClose,
  } = useToggleState();
  const { isOpen: techInfoOpen, handleOpen: handleTechInfoOpen, handleClose: handleTechInfoClose } = useToggleState();
  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();

  const {
    isLoading,
    onFinishTemplateForm,
    onFinishResourceUploadForm,
    sliceData: { date, page, sidx, sortDate, sortStatus, records, status, rows },
  } = useConstructReportsPage({
    dataSelector: catalogSelectors.getCatalogActionsData(CatalogComputedPropertyState.TECH_INFO_LOAD),
    setUpdate: () => setReportsUpdate(CatalogComputedPropertyState.TECH_INFO_LOAD),
    resetFilters: () => resetReportsFilters(CatalogComputedPropertyState.TECH_INFO_LOAD),
    sliceName: catalogSliceName,
    computedProperty: CatalogComputedPropertyState.TECH_INFO_LOAD,
    type: typeTechInfoLoad,
    templateProps: {
      handleClose: handleTemplatesClose,
      params: { rc: 'nsi', man: 'in' },
    },
    resourceUploadProps: {
      handleClose: handleTechInfoClose,
      params: { rc: 'lkp_files', man: `${manufacturer}_ti` },
    },
  });

  const { filtersFormItem, statusFilterOptions, handleFiltersReset, onFilterFinish } = useReportsPageFilters({
    computedProperty: CatalogComputedPropertyState.TECH_INFO_LOAD,
    dataSelector: infoSelectors.getInfoSearch(TypeInfoSearch.CO_TABLE, CodeInfoSearch.JOB_STATE),
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

  const { templateFileLoadData, sectionFileLoadData, templateTitle, uploaditle, manualsData } = useMemo(
    () => tabsInfoData[id],
    [id],
  );

  const onTableChange = useOnTableChange({
    onPaginate: setReportsPagination,
    onSort: setReporsSort,
    computedProperty: CatalogComputedPropertyState.TECH_INFO_LOAD,
  });

  const filterConfig = useMemo(
    () => getFilterConfig({ date: date || '', status }, statusFilterOptions),
    [date, status, statusFilterOptions],
  );

  const { filterTagsData } = useFilterToTag({
    filterConfig,
    onClose: (key) =>
      dispatch(resetReportsFilter({ computedProperty: CatalogComputedPropertyState.TECH_INFO_LOAD, key })),
    onCloseAll: () => dispatch(resetReportsFilters(CatalogComputedPropertyState.TECH_INFO_LOAD)),
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
          onClick={handleTechInfoOpen}
          type='default'
          {...getExtraFileLoadProps(!manufacturer, handleHelpOpen)}
          drawerProps={{
            width: 'md',
            destroyOnClose: true,
            title: uploaditle,
            open: techInfoOpen,
            onClose: handleTechInfoClose,
            children: <FileLoadForm {...sectionFileLoadData} onFinish={onFinishResourceUploadForm} />,
          }}
        >
          {techInfoBtnName}
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
        dataSelector={catalogSelectors.getCatalogTableData(CatalogComputedPropertyState.TECH_INFO_LOAD)}
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

export default memo(TechInfo);
