import React, { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { logisticsSelectors } from '@app/store/logistics/logistics.selectors';
import {
  logisticsSliceName,
  resetReportsFilter,
  resetReportsFilters,
  setReportsFilters,
  setReportsPagination,
  setReportsSort,
  setReportsUpdate,
  typeStorageAssortment,
} from '@app/store/logistics/logistics.slice';
import { LogisticsComputedPropertyState } from '@app/store/logistics/logistics.types';
import { FiltersForm } from '@entities/common/ui';
import { useConstructReportsPage, useReportsPageFilters } from '@features/common/lib';
import {  FileLoadForm, Manuals } from '@features/common/ui';
import { getSortingForTable, useFilterToTag, useOnTableChange, useToggleState } from '@shared/lib';
import { dashedFormat, PageTitle, Table, TemplateFileAware, Toolbar } from '@shared/ui';
import { TagsGroup } from '@shared/ui/molecules/TagsGroup/TagsGroup.component';
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
} from './Management.data';

const Management: React.FC = () => {
  const dispatch = useDispatch();

  const filtersCount = useSelector(
    logisticsSelectors.getLogisticsFiltersCount(LogisticsComputedPropertyState.storageAssortment),
  );

  const {
    isOpen: templatesOpen,
    handleOpen: handleTemplatesOpen,
    handleClose: handleTemplatesClose,
  } = useToggleState();
  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();
  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();

  const {
    isLoading,
    onFinishTemplateForm,
    sliceData: { date, page, sidx, sortDate, sortStatus, records, status, rows },
  } = useConstructReportsPage({
    dataSelector: logisticsSelectors.getLogisticsAdditionalData(LogisticsComputedPropertyState.storageAssortment),
    setUpdate: () => setReportsUpdate(LogisticsComputedPropertyState.storageAssortment),
    resetFilters: () => resetReportsFilters(LogisticsComputedPropertyState.storageAssortment),
    sliceName: logisticsSliceName,
    computedProperty: LogisticsComputedPropertyState.storageAssortment,
    type: typeStorageAssortment,
    templateProps: {
      handleClose: handleTemplatesClose,
      params: { rc: 'nsi', man: 'in' },
    },
  });

  const { filtersFormItem, statusFilterOptions, handleFiltersReset, onFilterFinish } = useReportsPageFilters({
    computedProperty: LogisticsComputedPropertyState.storageAssortment,
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

  const onTableChange = useOnTableChange({
    onPaginate: setReportsPagination,
    onSort: setReportsSort,
    computedProperty: LogisticsComputedPropertyState.storageAssortment,
  });

  const filterConfig = useMemo(
    () => getFilterConfig({ date: date || '', status }, statusFilterOptions),
    [date, status, statusFilterOptions],
  );

  const { filterTagsData } = useFilterToTag({
    filterConfig,
    onClose: (key) =>
      dispatch(resetReportsFilter({ computedProperty: LogisticsComputedPropertyState.storageAssortment, key })),
    onCloseAll: () => dispatch(resetReportsFilters(LogisticsComputedPropertyState.storageAssortment)),
  });

  return (
    <>
      <PageTitle heading={heading} subHeading={<TemplateFileAware description={description} {...templateData} />} />
      <Toolbar>
        <Toolbar.DownloadFile
          onClick={handleTemplatesOpen}
          drawerProps={{
            width: 'md',
            destroyOnClose: true,
            title: templateTitle,
            open: templatesOpen,
            onClose: handleTemplatesClose,
            children: <FileLoadForm {...fileLoadFormProps} onFinish={onFinishTemplateForm} />,
          }}
        />
        <Toolbar.ApplyFilter
          onClick={handleFiltersOpen}
          notification={filtersCount}
          drawerProps={{
            open: filtersOpen,
            destroyOnClose: true,
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
        dataSelector={logisticsSelectors.getLogisticsTableData(LogisticsComputedPropertyState.storageAssortment)}
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

export default memo(Management);
