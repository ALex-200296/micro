import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catalogSelectors } from '@app/store/catalog/catalog.selectors';
import {
  resetReportsData,
  resetReportsFilter,
  resetReportsFilters,
  setReportsFilters,
  typeGoodsLoad,
} from '@app/store/catalog/catalog.slice';
import { CatalogComputedPropertyState } from '@app/store/catalog/catalog.types';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { FiltersForm } from '@entities/common/ui';
import { useReportsPageFilters } from '@features/common/lib';
import { FileLoadForm, Manuals } from '@features/common/ui';
import { getNumForFiles } from '@features/common/ui/Form/FileLoadForm/FileLoadForm.data';
import { IFileLoadInitialValuesState } from '@features/common/ui/Form/FileLoadForm/FileLoadForm.types';
import { convertNameFiles } from '@features/common/ui/Inputs/FileInput/FileInput.data';
import { getRxReportsFilesAction } from '@middleware/catalog/catalog.saga';
import { postTaskAction } from '@middleware/reports/reports.saga';
import { postTemplateAction } from '@middleware/template/template.saga';
import { createNumberId, useFilterToTag, useToggleState } from '@shared/lib';
import { dashedFormat, TagsGroup, Toolbar } from '@shared/ui';
import { filtersDrawerTitle, getFilterConfig, manualsDrawerTitle } from '@views/BaseAccess/BaseAccessPage.data';
import { IInitialFiltersValues } from '@views/BaseAccess/BaseAccessPage.types';
import { Flex } from 'antd';
import dayjs from 'dayjs';

import { dataTestId, tabsInfoData } from '../ControlPage.data';
import { ISubSectionProps, KeyTab } from '../ControlPage.types';

import ReportsCharacteristicsDrawer from './ReportsCharacteristicsDrawer/ReportsCharacteristicsDrawer.component';
import CharacteristicsTable from './СharacteristicsTable/CharacteristicsTable.component';

const Characteristics: React.FC<ISubSectionProps> = ({ id }) => {
  const dispatch = useDispatch();

  const filtersCount = useSelector(catalogSelectors.getCatalogFiltersCount(CatalogComputedPropertyState.GOODS_LOAD));
  const {
    filters: { date, status },
  } = useSelector(catalogSelectors.getCatalogActionsData(CatalogComputedPropertyState.GOODS_LOAD));
  const {
    page: reportsPage,
    rows: reportsRows,
    records: reportsRecords,
  } = useSelector(catalogSelectors.getCharacteristicReportsState);

  useEffect(() => {
    dispatch(getRxReportsFilesAction({ page: reportsPage, rows: reportsRows }));
  }, [reportsPage]);

  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();
  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();
  const {
    isOpen: characteristicsOpen,
    handleOpen: handleCharacteristicsOpen,
    handleClose: handleCharacteristicsClose,
  } = useToggleState();

  const { filtersFormItem, statusFilterOptions, handleFiltersReset, onFilterFinish } = useReportsPageFilters({
    computedProperty: CatalogComputedPropertyState.GOODS_LOAD,
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

  const { templateFileLoadData, manualsData, templateTitle } = useMemo(() => tabsInfoData[KeyTab[id]], [id]);

  const filterConfig = useMemo(
    () => getFilterConfig({ date: date || '', status }, statusFilterOptions),
    [date, status, statusFilterOptions],
  );

  const { filterTagsData } = useFilterToTag({
    filterConfig,
    onClose: (key) => dispatch(resetReportsFilter({ computedProperty: CatalogComputedPropertyState.GOODS_LOAD, key })),
    onCloseAll: () => dispatch(resetReportsFilters(CatalogComputedPropertyState.GOODS_LOAD)),
  });

  const onFinishCharacteristicsForm = useCallback((values: IFileLoadInitialValuesState) => {
    const {
      files: { fileList },
    } = values;
    const convertedFilelist = convertNameFiles(fileList);
    const numForFiles = getNumForFiles(fileList);
    const codeNotification = createNumberId();

    dispatch(
      postTemplateAction({ files: convertedFilelist, rc: 'nsi', man: 'in', num: numForFiles, codeNotification }),
    );
    dispatch(
      postTaskAction({
        nameFile: numForFiles,
        type: typeGoodsLoad,
        codeNotification,
        actions: [{ type: resetReportsData.type, payload: CatalogComputedPropertyState.GOODS_LOAD }],
      }),
    );
    handleCharacteristicsClose();
  }, []);

  return (
    <>
      <Flex justify={reportsRecords ? 'space-between' : 'end'} gap='small' className='margin_4_toolbar'>
        {!!reportsRecords && <ReportsCharacteristicsDrawer />}
        <Toolbar excludeClassName>
          <Toolbar.DownloadFile
            onClick={handleCharacteristicsOpen}
            drawerProps={{
              width: 'md',
              destroyOnClose: true,
              title: templateTitle,
              open: characteristicsOpen,
              onClose: handleCharacteristicsClose,
              children: <FileLoadForm {...templateFileLoadData} onFinish={onFinishCharacteristicsForm} />,
            }}
          />
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
      </Flex>
      <TagsGroup tagsData={filterTagsData} closable dataTestId={dataTestId} />
      <CharacteristicsTable />
    </>
  );
};

export default memo(Characteristics);
