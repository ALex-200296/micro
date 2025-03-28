import React, { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { integrationSelectors } from '@app/store/integration/integration.selectors';
import {
  integrationSliceName,
  resetReportsFilter,
  resetReportsFilters,
  setReportsFilters,
  setReportsPagination,
  setReportsSort,
  setReportsUpdate,
  typeAppApi,
} from '@app/store/integration/integration.slice';
import { IntegrationComputedProperty } from '@app/store/integration/integration.types';
import { FiltersForm } from '@entities/common/ui';
import { useConstructReportsPage, useReportsPageFilters } from '@features/common/lib';
import { FileLoadForm,Manuals } from '@features/common/ui';
import { getSortingForTable, useFilterToTag, useOnTableChange, useToggleState } from '@shared/lib';
import { dashedFormat, PageTitle, Table, TagsGroup, TemplateFileAware, Toolbar } from '@shared/ui';
import { getFilterConfig, getReportsColumnsConfig, manualsDrawerTitle } from '@views/BaseAccess/BaseAccessPage.data';
import { IInitialFiltersValues } from '@views/BaseAccess/BaseAccessPage.types';
import dayjs from 'dayjs';

import { AppApiTexts, dataTestId, templateApiApplicationInfo, toolBarInfoData } from './AppApi.data';

const AppApi: React.FC = () => {
  const dispatch = useDispatch();

  const filtersCount = useSelector(integrationSelectors.getIntegrationFiltersCount(IntegrationComputedProperty.APP_API));

  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();
  const {
    isOpen: templatesOpen,
    handleOpen: handleTemplatesOpen,
    handleClose: handleTemplatesClose,
  } = useToggleState();
  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();

  const { infoTitle, fileLoadData, manualsData } = toolBarInfoData;

  const { filtersFormItem, statusFilterOptions, handleFiltersReset, onFilterFinish } = useReportsPageFilters({
    computedProperty: IntegrationComputedProperty.APP_API,
    dataSelector: infoSelectors.getInfoSearch(TypeInfoSearch.CO_TABLE, CodeInfoSearch.JOB_STATE),
    setReportsFiltersType: setReportsFilters.type,
    resetReportsFiltersType: resetReportsFilters.type,
    afterFiltersSubmit: handleFiltersClose,
  });

  const {
    isLoading,
    onFinishTemplateForm,
    sliceData: { date, page, sidx, sortDate, sortStatus, records, status, rows },
  } = useConstructReportsPage({
    dataSelector: integrationSelectors.getIntegrationActionsData(IntegrationComputedProperty.APP_API),
    setUpdate: () => setReportsUpdate(IntegrationComputedProperty.APP_API),
    resetFilters: () => resetReportsFilters(IntegrationComputedProperty.APP_API),
    sliceName: integrationSliceName,
    computedProperty: IntegrationComputedProperty.APP_API,
    type: typeAppApi,
    templateProps: {
      handleClose: handleTemplatesClose,
      params: { rc: 'nsi', man: 'in' },
    },
  });

  const onTableChange = useOnTableChange({
    onPaginate: setReportsPagination,
    onSort: setReportsSort,
    computedProperty: IntegrationComputedProperty.APP_API,
  });

  const columns = useMemo(
    () => getReportsColumnsConfig(getSortingForTable(sortStatus), getSortingForTable(sortDate)),
    [sortStatus, sortDate, sidx],
  );
  const filterConfig = useMemo(
    () => getFilterConfig({ date: date || '', status }, statusFilterOptions),
    [date, status, statusFilterOptions],
  );
  const { filterTagsData } = useFilterToTag({
    filterConfig,
    onClose: (key) => dispatch(resetReportsFilter({ computedProperty: IntegrationComputedProperty.APP_API, key })),
    onCloseAll: () => dispatch(resetReportsFilters(IntegrationComputedProperty.APP_API)),
  });

  const initialFiltersValues: IInitialFiltersValues = useMemo(
    () => ({
      date: date ? dayjs(date, dashedFormat) : null,
      status: status,
    }),
    [date, status],
  );

  return (
    <>
      <PageTitle
        heading={AppApiTexts.heading}
        subHeading={<TemplateFileAware description={AppApiTexts.description} {...templateApiApplicationInfo} />}
      />
      <Toolbar>
        <Toolbar.DownloadFile
          onClick={handleTemplatesOpen}
          drawerProps={{
            width: 'md',
            destroyOnClose: true,
            title: infoTitle,
            open: templatesOpen,
            onClose: handleTemplatesClose,
            children: <FileLoadForm {...fileLoadData} onFinish={onFinishTemplateForm} />,
          }}
        >
          {AppApiTexts.tollbarDownloadButtonName}
        </Toolbar.DownloadFile>
        <Toolbar.ApplyFilter
          onClick={handleFiltersOpen}
          notification={filtersCount}
          drawerProps={{
            destroyOnClose: true,
            open: filtersOpen,
            onClose: handleFiltersClose,
            title: AppApiTexts.filtersDrawerTitle,
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
        dataSelector={integrationSelectors.getIntegrationTableData(IntegrationComputedProperty.APP_API)}
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

export default memo(AppApi);
