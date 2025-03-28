import React, { memo, useMemo } from 'react';
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
  typeCertificatesLoad,
} from '@app/store/catalog/catalog.slice';
import { CatalogComputedPropertyState } from '@app/store/catalog/catalog.types';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { FiltersForm } from '@entities/common/ui';
import { useConstructReportsPage, useReportsPageFilters } from '@features/common/lib';
import { FileLoadForm } from '@features/common/ui';
import Manuals from '@features/common/ui/Manuals/Manuals.component';
import { getSortingForTable, useFilterToTag, useOnTableChange, useToggleState } from '@shared/lib';
import { dashedFormat, Table, TagsGroup, Toolbar } from '@shared/ui';
import {
  filtersDrawerTitle,
  getFilterConfig,
  getReportsColumnsConfig,
  manualsDrawerTitle,
} from '@views/BaseAccess/BaseAccessPage.data';
import { IInitialFiltersValues } from '@views/BaseAccess/BaseAccessPage.types';
import { Flex } from 'antd';
import dayjs from 'dayjs';

import { dataTestId, tabsInfoData } from '../ControlPage.data';
import { ISubSectionProps } from '../ControlPage.types';

import ReportsCertificatesDrawer from './ReportsCertificatesDrawer/ReportsCertificatesDrawer.component';
import { certificatesButtonText } from './Certificates.data';

const Certificates: React.FC<ISubSectionProps> = ({ id }) => {
  const dispatch = useDispatch();

  const filtersCount = useSelector(
    catalogSelectors.getCatalogFiltersCount(CatalogComputedPropertyState.CERTIFICATES_LOAD),
  );
  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();
  const {
    isOpen: templatesOpen,
    handleOpen: handleTemplatesOpen,
    handleClose: handleTemplatesClose,
  } = useToggleState();
  const {
    isOpen: certificatesOpen,
    handleOpen: handleCertificatesOpen,
    handleClose: handleCertificatesClose,
  } = useToggleState();
  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();
  const {
    isLoading,
    onFinishTemplateForm,
    onFinishResourceUploadForm,
    sliceData: { date, page, sidx, sortDate, sortStatus, status, records, rows },
  } = useConstructReportsPage({
    dataSelector: catalogSelectors.getCatalogActionsData(CatalogComputedPropertyState.CERTIFICATES_LOAD),
    setUpdate: () => setReportsUpdate(CatalogComputedPropertyState.CERTIFICATES_LOAD),
    resetFilters: () => resetReportsFilters(CatalogComputedPropertyState.CERTIFICATES_LOAD),
    sliceName: catalogSliceName,
    computedProperty: CatalogComputedPropertyState.CERTIFICATES_LOAD,
    type: typeCertificatesLoad,
    templateProps: {
      handleClose: handleTemplatesClose,
      params: { rc: 'nsi', man: 'in' },
    },
    resourceUploadProps: {
      handleClose: handleCertificatesClose,
      params: { rc: 'sert' },
    },
  });
  const { filtersFormItem, statusFilterOptions, handleFiltersReset, onFilterFinish } = useReportsPageFilters({
    computedProperty: CatalogComputedPropertyState.CERTIFICATES_LOAD,
    dataSelector: infoSelectors.getInfoSearch(TypeInfoSearch.CO_TABLE, CodeInfoSearch.JOB_STATE),
    setReportsFiltersType: setReportsFilters.type,
    resetReportsFiltersType: resetReportsFilters.type,
    afterFiltersSubmit: handleFiltersClose,
  });

  const { templateFileLoadData, sectionFileLoadData, templateTitle, uploaditle, manualsData } = useMemo(
    () => tabsInfoData[id],
    [id],
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
    onSort: setReporsSort,
    computedProperty: CatalogComputedPropertyState.CERTIFICATES_LOAD,
  });

  const filterConfig = useMemo(
    () => getFilterConfig({ date: date || '', status }, statusFilterOptions),
    [date, status, statusFilterOptions],
  );

  const { filterTagsData } = useFilterToTag({
    filterConfig,
    onClose: (key) =>
      dispatch(resetReportsFilter({ computedProperty: CatalogComputedPropertyState.CERTIFICATES_LOAD, key })),
    onCloseAll: () => dispatch(resetReportsFilters(CatalogComputedPropertyState.CERTIFICATES_LOAD)),
  });

  const columns = useMemo(
    () => getReportsColumnsConfig(getSortingForTable(sortStatus), getSortingForTable(sortDate), true, true),
    [sortStatus, sortDate, sidx],
  );

  return (
    <>
      <Flex justify='space-between' gap='small' className='margin_4_toolbar'>
        <ReportsCertificatesDrawer dataTestId={dataTestId} />
        <Toolbar excludeClassName>
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
            onClick={handleCertificatesOpen}
            type='default'
            drawerProps={{
              width: 'md',
              destroyOnClose: true,
              title: uploaditle,
              open: certificatesOpen,
              onClose: handleCertificatesClose,
              children: <FileLoadForm {...sectionFileLoadData} onFinish={onFinishResourceUploadForm} />,
            }}
          >
            {certificatesButtonText}
          </Toolbar.DownloadFile>
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
      </Flex>
      <TagsGroup tagsData={filterTagsData} closable dataTestId={dataTestId} />
      <Table
        columns={columns}
        dataSelector={catalogSelectors.getCatalogTableData(CatalogComputedPropertyState.CERTIFICATES_LOAD)}
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
export default memo(Certificates);
