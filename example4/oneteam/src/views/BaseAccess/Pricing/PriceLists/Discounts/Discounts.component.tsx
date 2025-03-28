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

  const filtersCount = useSelector(pricingSelectors.getPricingFiltersCount(PricingComputedPropertyState.discountsLoad));

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
    dataSelector: pricingSelectors.getPricingActionsData(PricingComputedPropertyState.discountsLoad),
    setUpdate: () => setReportsUpdate(PricingComputedPropertyState.discountsLoad),
    resetFilters: () => resetReportsFilters(PricingComputedPropertyState.discountsLoad),
    sliceName: pricingSliceName,
    computedProperty: PricingComputedPropertyState.discountsLoad,
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
    computedProperty: PricingComputedPropertyState.discountsLoad,
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
    () => getReportsColumnsConfig(getSortingForTable(sortStatus), getSortingForTable(sortDate), false, true),
    [sortStatus, sortDate, sidx],
  );

  const { infoTitle, fileLoadData, manualsData } = templateInfoData[KeyTab.discount];

  const onTableChange = useOnTableChange({
    onPaginate: setReportsPagination,
    onSort: setReporsSort,
    computedProperty: PricingComputedPropertyState.discountsLoad,
  });

  const filterConfig = useMemo(
    () => getFilterConfig({ date: date || '', status }, statusFilterOptions),
    [date, status, statusFilterOptions],
  );

  const { filterTagsData } = useFilterToTag({
    filterConfig,
    onClose: (key) =>
      dispatch(resetReportsFilter({ computedProperty: PricingComputedPropertyState.discountsLoad, key })),
    onCloseAll: () => dispatch(resetReportsFilters(PricingComputedPropertyState.discountsLoad)),
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
        dataSelector={pricingSelectors.getPricingTableData(PricingComputedPropertyState.discountsLoad)}
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
