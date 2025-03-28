import React, { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { pricingSelectors } from '@app/store/pricing/pricing.selectors';
import {
  pricingSliceName,
  resetReportsFilter,
  resetReportsFilters,
  setReporsSort,
  setReportsFilters,
  setReportsPagination,
  setReportsUpdate,
  typeDiscountsLoad,
} from '@app/store/pricing/pricing.slice';
import { PricingComputedPropertyState } from '@app/store/pricing/pricing.types';
import { FiltersForm } from '@entities/common/ui';
import { useConstructReportsPage, useReportsPageFilters } from '@features/common/lib';
import { FileLoadForm, Manuals } from '@features/common/ui';
import { getSortingForTable, useFilterToTag, useOnTableChange, useToggleState } from '@shared/lib';
import { dashedFormat, Table, TagsGroup, Toolbar } from '@shared/ui';
import dayjs from 'dayjs';

import {
  filtersDrawerTitle,
  getFilterConfig,
  getReportsColumnsConfig,
  manualsDrawerTitle,
} from '../../../BaseAccessPage.data';
import { IInitialFiltersValues } from '../../../BaseAccessPage.types';
import ExtraFileLoadForm from '../../../components/ExtraFileLoadForm/ExtraFileLoadForm.component';
import { KeyTab, templateInfoData } from '../PriceListsPage.data';

import { dataTestId, tollbarDownloadButtonName } from './Discounts.data';

const Discounts: React.FC = () => {
  const dispatch = useDispatch();

  const filtersCount = useSelector(pricingSelectors.getPricingFiltersCount(PricingComputedPropertyState.DISCOUNTS_LOAD));

  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();
  const {
    isOpen: templatesOpen,
    handleOpen: handleTemplatesOpen,
    handleClose: handleTemplatesClose,
  } = useToggleState();
  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();

  const {
    isLoading,
    onFinishTemplateForm,
    sliceData: { date, page, sidx, sortDate, sortStatus, records, status, rows },
  } = useConstructReportsPage({
    dataSelector: pricingSelectors.getPricingActionsData(PricingComputedPropertyState.DISCOUNTS_LOAD),
    setUpdate: () => setReportsUpdate(PricingComputedPropertyState.DISCOUNTS_LOAD),
    resetFilters: () => resetReportsFilters(PricingComputedPropertyState.DISCOUNTS_LOAD),
    sliceName: pricingSliceName,
    computedProperty: PricingComputedPropertyState.DISCOUNTS_LOAD,
    type: typeDiscountsLoad,
    templateProps: {
      handleClose: handleTemplatesClose,
      params: { rc: 'nsi', man: 'in' },
    },
    getExtraTaskParams: ({ allClientsChosen, client, holding }) => ({
      pExtParam: `client=${allClientsChosen ? holding : client.join(',')}`,
    }),
  });

  const { filtersFormItem, statusFilterOptions, handleFiltersReset, onFilterFinish } = useReportsPageFilters({
    computedProperty: PricingComputedPropertyState.DISCOUNTS_LOAD,
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
    () => getReportsColumnsConfig(getSortingForTable(sortStatus), getSortingForTable(sortDate), false, true),
    [sortStatus, sortDate, sidx],
  );

  const { infoTitle, fileLoadData, manualsData } = templateInfoData[KeyTab.discount];

  const onTableChange = useOnTableChange({
    onPaginate: setReportsPagination,
    onSort: setReporsSort,
    computedProperty: PricingComputedPropertyState.DISCOUNTS_LOAD,
  });

  const filterConfig = useMemo(
    () => getFilterConfig({ date: date || '', status }, statusFilterOptions),
    [date, status, statusFilterOptions],
  );

  const { filterTagsData } = useFilterToTag({
    filterConfig,
    onClose: (key) =>
      dispatch(resetReportsFilter({ computedProperty: PricingComputedPropertyState.DISCOUNTS_LOAD, key })),
    onCloseAll: () => dispatch(resetReportsFilters(PricingComputedPropertyState.DISCOUNTS_LOAD)),
  });

  return (
    <>
      <Toolbar>
        <Toolbar.DownloadFile
          onClick={handleTemplatesOpen}
          drawerProps={{
            width: 'md',
            destroyOnClose: true,
            title: infoTitle,
            open: templatesOpen,
            onClose: handleTemplatesClose,
            children: (
              <FileLoadForm
                {...fileLoadData}
                onFinish={onFinishTemplateForm}
                extraForm={(form) => <ExtraFileLoadForm form={form} />}
              />
            ),
          }}
        >
          {tollbarDownloadButtonName}
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
        dataSelector={pricingSelectors.getPricingTableData(PricingComputedPropertyState.DISCOUNTS_LOAD)}
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

export default memo(Discounts);
