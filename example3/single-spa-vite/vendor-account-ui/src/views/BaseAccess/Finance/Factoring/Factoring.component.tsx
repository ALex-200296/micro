import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { financeSelectors } from '@app/store/finance/finance.selectors';
import {
  financeSliceName,
  resetReportsFilter,
  resetReportsFilters,
  setReportsFilters,
  setReportsPagination,
  setReportsSort,
  setReportsUpdate,
  typeFactoringLoad,
  typeGetFactoringLoad,
} from '@app/store/finance/finance.slice';
import { FinanceComputedPropertyState } from '@app/store/finance/finance.types';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { FiltersForm } from '@entities/common/ui';
import { useConstructReportsPage } from '@features/common/lib/hooks/useConstructReportsPage/useConstructReportsPage.hook';
import { FileLoadForm } from '@features/common/ui';
import { Manuals } from '@features/common/ui/Manuals/Manuals.component';
import { infoSearchAction } from '@middleware/info/info.saga';
import { getSortingForTable, useFilterToTag, useOnTableChange, useToggleState } from '@shared/lib';
import { dashedFormat, PageTitle, Table, TagsGroup, TemplateFileAware, Toolbar } from '@shared/ui';
import {
  filtersDrawerTitle,
  getFilterConfig,
  getFilterFormItems,
  getReportsColumnsConfig,
} from '@views/BaseAccess/BaseAccessPage.data';
import { IInitialFiltersValues } from '@views/BaseAccess/BaseAccessPage.types';
import dayjs from 'dayjs';

import {
  dataTestId,
  fileLoadFormProps,
  heading,
  manualsData,
  manualsDrawerTitle,
  templateAwareProps,
  templateTitle,
} from './Factoring.data';

const Factoring: React.FC = () => {
  const dispatch = useDispatch();

  const {
    isOpen: templatesOpen,
    handleOpen: handleTemplatesOpen,
    handleClose: handleTemplatesClose,
  } = useToggleState();
  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();
  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();

  const {
    isLoading,
    onFinishTemplateForm,
    sliceData: { date, page, sidx, sortDate, sortStatus, records, status, rows },
  } = useConstructReportsPage({
    dataSelector: financeSelectors.getFinanceReportsData(FinanceComputedPropertyState.FACTORING),
    setUpdate: () => setReportsUpdate(FinanceComputedPropertyState.FACTORING),
    resetFilters: () => resetReportsFilters(FinanceComputedPropertyState.FACTORING),
    sliceName: financeSliceName,
    computedProperty: FinanceComputedPropertyState.FACTORING,
    type: typeGetFactoringLoad,
    templateProps: {
      handleClose: handleTemplatesClose,
      params: { rc: 'nsi', man: 'in' },
    },
    postTaskProps: {
      oneRequest: true,
      type: typeFactoringLoad,
    },
  });

  const statusFilterOptions = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.CO_TABLE, CodeInfoSearch.JOB_STATE),
  );

  const filtersFormItem = useMemo(() => getFilterFormItems(statusFilterOptions), [statusFilterOptions]);
  const initialFiltersValues: IInitialFiltersValues = useMemo(
    () => ({
      date: date ? dayjs(date, dashedFormat) : null,
      status: status,
    }),
    [date, status],
  );
  const filtersCount = useSelector(
    financeSelectors.getFinanceReportsFiltersCount(FinanceComputedPropertyState.FACTORING),
  );

  const onTableChange = useOnTableChange({
    onPaginate: setReportsPagination,
    onSort: setReportsSort,
    computedProperty: FinanceComputedPropertyState.FACTORING,
  });

  const filterConfig = useMemo(
    () => getFilterConfig({ date: date || '', status }, statusFilterOptions),
    [date, status, statusFilterOptions],
  );

  const { filterTagsData } = useFilterToTag({
    filterConfig,
    onClose: (key) => dispatch(resetReportsFilter({ computedProperty: FinanceComputedPropertyState.FACTORING, key })),
    onCloseAll: () => dispatch(resetReportsFilters(FinanceComputedPropertyState.FACTORING)),
  });

  const columns = useMemo(
    () => getReportsColumnsConfig(getSortingForTable(sortStatus), getSortingForTable(sortDate), false, true, true),
    [sortStatus, sortDate, sidx],
  );

  useEffect(() => {
    if (!statusFilterOptions.length) {
      dispatch(
        infoSearchAction({
          type: TypeInfoSearch.CO_TABLE,
          code: CodeInfoSearch.JOB_STATE,
        }),
      );
    }
  }, []);

  const onFilterFinish = useCallback((value: Partial<IInitialFiltersValues>) => {
    dispatch(
      setReportsFilters({
        filters: {
          date: value.date ? dayjs(value.date).format(dashedFormat) : null,
          status: value.status || '',
        },
        computedProperty: FinanceComputedPropertyState.FACTORING,
      }),
    );
    handleFiltersClose();
  }, []);

  const handleFiltersReset = useCallback(() => {
    dispatch(resetReportsFilters(FinanceComputedPropertyState.FACTORING));
  }, []);

  return (
    <>
      <PageTitle heading={heading} subHeading={<TemplateFileAware {...templateAwareProps} />} />
      <Toolbar>
        <Toolbar.CreateFactoring
          onClick={handleTemplatesOpen}
          type='primary'
          drawerProps={{
            width: 'md',
            destroyOnClose: true,
            title: templateTitle,
            open: templatesOpen,
            onClose: handleTemplatesClose,
            children: <FileLoadForm colon={false} {...fileLoadFormProps} onFinish={onFinishTemplateForm} />,
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
        dataSelector={financeSelectors.getFinanceReportsTableData(FinanceComputedPropertyState.FACTORING)}
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

export default memo(Factoring);
