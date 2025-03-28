import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from 'react-use-cookie';
import { financeSelectors } from '@app/store/finance/finance.selectors';
import {
  resetReconciliationFilters,
  setReconciliationDateParam,
  setReconciliationPagination,
} from '@app/store/finance/finance.slice';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { userSelectors } from '@app/store/user/user.selectors';
import { FiltersForm } from '@entities/common/ui';
import {
  getFinanceClientsAct,
  getFinanceClientsActType,
  postFinanceClientActType,
} from '@middleware/finance/finance.saga';
import { useOnTableChange, useToggleState } from '@shared/lib';
import { PageTitle, reversedDashedFormat, Table, Toolbar } from '@shared/ui';
import { filtersDrawerTitle } from '@views/BaseAccess/BaseAccessPage.data';
import dayjs from 'dayjs';

import ReconciliationCreateForm from './ReconciliationCreateForm/ReconciliationCreateForm.component';
import { createActDrawerTitle, filtersFormItems, getReconciliationTableConfig, heading } from './Reconciliation.data';
import { IFiltersInitialValues } from './Reconciliation.types';

const Reconciliation: React.FC = () => {
  const dispatch = useDispatch();
  const sId = getCookie('session-id');

  const organizationCode = useSelector(userSelectors.getUserProfileOrganizationCode);
  const { startDate, endDate } = useSelector(financeSelectors.getFiltersReconciliation);
  const { page, records, rows } = useSelector(financeSelectors.getReconciliationData);
  const filtersCount = useSelector(financeSelectors.getReconciliationFiltersCount);
  const isGetLoading: boolean = useSelector(uiSelectors.getIsRequestPending(getFinanceClientsActType));
  const isPostLoading = useSelector(uiSelectors.getIsRequestPending(postFinanceClientActType));

  const {
    isOpen: createActOpen,
    handleOpen: handleCreateActOpen,
    handleClose: handleCreateActClose,
  } = useToggleState();
  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();

  const columns = useMemo(() => getReconciliationTableConfig(organizationCode, sId), []);
  const onTableChange = useOnTableChange({ onPaginate: setReconciliationPagination });

  const initialFiltersValues: IFiltersInitialValues = {
    dateRange: [startDate, endDate],
  };

  useEffect(() => {
    dispatch(setReconciliationPagination({ page: 1, rows }));
    dispatch(
      getFinanceClientsAct({
        organizationCode,
        startDate: dayjs(startDate).format(reversedDashedFormat),
        endDate: dayjs(endDate).format(reversedDashedFormat),
      }),
    );
  }, [organizationCode, startDate, endDate]);

  useEffect(
    () => () => {
      dispatch(resetReconciliationFilters());
    },
    [],
  );

  const onFiltersReset = useCallback(() => {
    dispatch(resetReconciliationFilters());
  }, []);

  const onFilterFinish = useCallback((value: Partial<IFiltersInitialValues>) => {
    if (value.dateRange) {
      const [startDate, endDate] = value.dateRange;
      dispatch(setReconciliationDateParam({ startDate, endDate }));
    }
    handleFiltersClose();
  }, []);

  return (
    <>
      <PageTitle heading={heading} />
      <Toolbar>
        <Toolbar.CreateAct
          type='primary'
          onClick={handleCreateActOpen}
          loading={isPostLoading}
          drawerProps={{
            destroyOnClose: true,
            title: createActDrawerTitle,
            open: createActOpen,
            onClose: handleCreateActClose,
            children: (
              <ReconciliationCreateForm
                organizationCode={organizationCode}
                startDate={startDate}
                endDate={endDate}
                afterSubmit={handleCreateActClose}
              />
            ),
          }}
        />
        <Toolbar.ApplyFilter
          onClick={handleFiltersOpen}
          notification={filtersCount}
          drawerProps={{
            title: filtersDrawerTitle,
            destroyOnClose: true,
            open: filtersOpen,
            onClose: handleFiltersClose,
            children: (
              <FiltersForm
                initialValues={initialFiltersValues}
                formItems={filtersFormItems}
                onReset={onFiltersReset}
                onFinish={onFilterFinish}
              />
            ),
          }}
        />
      </Toolbar>
      <Table
        columns={columns}
        dataSelector={financeSelectors.getReconciliationTableData}
        rowKey='Number'
        pagination={{
          current: page,
          pageSize: rows,
          total: records,
        }}
        loading={isGetLoading}
        onChange={onTableChange}
      />
    </>
  );
};

export default memo(Reconciliation);
