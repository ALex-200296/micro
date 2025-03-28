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
  typeUzedo,
} from '@app/store/integration/integration.slice';
import { IntegrationComputedProperty } from '@app/store/integration/integration.types';
import { FiltersForm } from '@entities/common/ui';
import { useConstructReportsPage, useReportsPageFilters } from '@features/common/lib';
import { Manuals } from '@features/common/ui';
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

import { dataTestId, getLinkToEdoForm, manualsData } from '../Application.data';

const Uzedo: React.FC = () => {
  const dispatch = useDispatch();

  const filtersCount = useSelector(integrationSelectors.getIntegrationFiltersCount(IntegrationComputedProperty.UZEDO));

  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();
  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();

  const {
    isLoading,
    sliceData: { date, page, sidx, sortDate, sortStatus, records, status, rows },
  } = useConstructReportsPage({
    dataSelector: integrationSelectors.getIntegrationActionsData(IntegrationComputedProperty.UZEDO),
    setUpdate: () => setReportsUpdate(IntegrationComputedProperty.UZEDO),
    resetFilters: () => resetReportsFilters(IntegrationComputedProperty.UZEDO),
    sliceName: integrationSliceName,
    computedProperty: IntegrationComputedProperty.UZEDO,
    type: typeUzedo,
  });

  const { filtersFormItem, statusFilterOptions, handleFiltersReset, onFilterFinish } = useReportsPageFilters({
    computedProperty: IntegrationComputedProperty.UZEDO,
    dataSelector: infoSelectors.getInfoSearch(TypeInfoSearch.CO_TABLE, CodeInfoSearch.JOB_STATE),
    setReportsFiltersType: setReportsFilters.type,
    resetReportsFiltersType: resetReportsFilters.type,
    afterFiltersSubmit: handleFiltersClose,
  });

  const columns = useMemo(
    () => getReportsColumnsConfig(getSortingForTable(sortStatus), getSortingForTable(sortDate), true),
    [sortStatus, sortDate, sidx],
  );

  const initialFiltersValues: IInitialFiltersValues = useMemo(
    () => ({
      date: date ? dayjs(date, dashedFormat) : null,
      status: status,
    }),
    [date, status],
  );
  const onTableChange = useOnTableChange({
    onPaginate: setReportsPagination,
    onSort: setReportsSort,
    computedProperty: IntegrationComputedProperty.UZEDO,
  });

  const filterConfig = useMemo(
    () => getFilterConfig({ date: date || '', status }, statusFilterOptions),
    [date, status, statusFilterOptions],
  );

  const { filterTagsData } = useFilterToTag({
    filterConfig,
    onClose: (key) => dispatch(resetReportsFilter({ computedProperty: IntegrationComputedProperty.UZEDO, key })),
    onCloseAll: () => dispatch(resetReportsFilters(IntegrationComputedProperty.UZEDO)),
  });

  return (
    <>
      <Toolbar>
        <Toolbar.EdoApplication href={getLinkToEdoForm(IntegrationComputedProperty.UZEDO)} />
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
            children: <Manuals manualsData={manualsData} showManufacturerInfo showEdoId />,
          }}
        />
      </Toolbar>
      <TagsGroup tagsData={filterTagsData} closable dataTestId={dataTestId} />
      <Table
        columns={columns}
        dataSelector={integrationSelectors.getIntegrationTableData(IntegrationComputedProperty.UZEDO)}
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

export default memo(Uzedo);
