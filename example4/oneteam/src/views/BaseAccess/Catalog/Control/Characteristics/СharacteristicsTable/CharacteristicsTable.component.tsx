import React, { memo, useMemo } from 'react';
import { catalogSelectors } from '@app/store/catalog/catalog.selectors';
import {
  catalogSliceName,
  resetReportsFilters,
  setReporsSort,
  setReportsPagination,
  setReportsUpdate,
  typeGoodsLoad,
} from '@app/store/catalog/catalog.slice';
import { CatalogComputedPropertyState } from '@app/store/catalog/catalog.types';
import { useConstructReportsPage } from '@features/common/lib';
import { getSortingForTable, useOnTableChange } from '@shared/lib';
import { Table } from '@shared/ui';
import { getReportsColumnsConfig } from '@views/BaseAccess/BaseAccessPage.data';

const CharacteristicsTable: React.FC = () => {
  const {
    isLoading,
    sliceData: { page, sidx, sortDate, sortStatus, records, rows },
  } = useConstructReportsPage({
    dataSelector: catalogSelectors.getCatalogActionsData(CatalogComputedPropertyState.goodsLoad),
    setUpdate: () => setReportsUpdate(CatalogComputedPropertyState.goodsLoad),
    resetFilters: () => resetReportsFilters(CatalogComputedPropertyState.goodsLoad),
    sliceName: catalogSliceName,
    computedProperty: CatalogComputedPropertyState.goodsLoad,
    type: typeGoodsLoad,
  });

  const onTableChange = useOnTableChange({
    onPaginate: setReportsPagination,
    onSort: setReporsSort,
    computedProperty: CatalogComputedPropertyState.goodsLoad,
  });

  const columns = useMemo(
    () => getReportsColumnsConfig(getSortingForTable(sortStatus), getSortingForTable(sortDate), false, true),
    [sortStatus, sortDate, sidx],
  );

  return (
    <Table
      columns={columns}
      dataSelector={catalogSelectors.getCatalogTableData(CatalogComputedPropertyState.goodsLoad)}
      pagination={{
        current: page,
        pageSize: rows,
        total: records,
      }}
      onChange={onTableChange}
      rowKey='id'
      loading={isLoading}
    />
  );
};

export default memo(CharacteristicsTable);
