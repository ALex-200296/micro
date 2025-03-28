import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { financeSelectors } from '@app/store/finance/finance.selectors';
import {
  financeSliceName,
  resetServicesFilter,
  resetServicesFilters,
  setServicesFilters,
  setServicesPagination,
  setServicesSorts,
} from '@app/store/finance/finance.slice';
import { infoSelectors } from '@app/store/info/info.selectors';
import { IInfoParam, InfoParamsGroup, InfoParamsOper } from '@app/store/info/info.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { FiltersForm } from '@entities/common/ui';
import { infoParamsAction } from '@middleware/info/info.saga';
import { invoiceDownloadFilePath } from '@middleware/invoice/invoice.data';
import { getInvoicesAction, getInvoicesActionType, postInvoicePrintAction } from '@middleware/invoice/invoice.saga';
import { InvoiceProcedure, IResponsePrintSaga, IReturnAdapterRowsInvoices } from '@middleware/invoice/invoice.types';
import { downloadBlob, downloadFile, getSortingForTable, isBlob, useFilterToTag, useOnTableChange, useToggleState } from '@shared/lib';
import { dashedFormat, dottedFormat, PageTitle, Table, TagsGroup, Toolbar } from '@shared/ui';
import { filtersDrawerTitle, getInvoiceFiltersFormItems } from '@views/BaseAccess/BaseAccessPage.data';
import { IInvoiceFiltersInitialValues, InvoiceFilters } from '@views/BaseAccess/BaseAccessPage.types';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

import { getServicesColumnConfig, heading } from './Services.data';

const Services: React.FC = () => {
  const dispatch = useDispatch();

  const {
    records,
    rows,
    page,
    filters: { startDate, endDate, status, orderCode },
    sorts: { dateSort, sidx },
  } = useSelector(financeSelectors.getServicesData);
  const filtersCount = useSelector(financeSelectors.getServicesFiltersCount);

  const statusOptions = useSelector(
    infoSelectors.getInfoParams(InfoParamsOper.invoiceStatus, undefined, InfoParamsGroup.servicesActs),
  );
  const isLoading = useSelector(uiSelectors.getIsRequestPending(getInvoicesActionType));

  const { isOpen: filtersOpen, handleOpen: handleFiltersOpen, handleClose: handleFiltersClose } = useToggleState();
  const onTableChange = useOnTableChange({ onPaginate: setServicesPagination, onSort: setServicesSorts });
  const optionsForStatusTag: Omit<IInfoParam, 'children'>[] = useMemo(
    () => statusOptions.map(({ children, ...rest }) => [...(children ? [children] : []), rest]).flat(2),
    [statusOptions],
  );

  const { filterTagsData } = useFilterToTag({
    filterConfig: {
      [InvoiceFilters.dateRange]: {
        currentValue: `${dayjs(startDate).format(dottedFormat)} - ${dayjs(endDate).format(dottedFormat)}`,
        filterName: 'Дата',
      },
      [InvoiceFilters.orderCode]: {
        currentValue: orderCode,
        filterName: 'Номер документа',
      },
      [InvoiceFilters.status]: {
        currentValue: status,
        filterName: 'Статус документа',
        selectConfig: {
          valuePropName: 'id',
          labelPropName: 'name',
          options: optionsForStatusTag,
        },
      },
    },
    onClose: (key, value) => dispatch(resetServicesFilter({ key, value })),
    onCloseAll: () => dispatch(resetServicesFilters()),
  });

  const afterPrint = (response: AxiosResponse<Blob | IResponsePrintSaga>) => {
    if (isBlob(response.data)) {
      downloadBlob(response.data as Blob, 'print.pdf');
    } else {
      const {
        data: { csv },
      } = response.data as IResponsePrintSaga;
      downloadFile(`${invoiceDownloadFilePath}${csv}`);
    }
  };

  const onOption = useCallback((record: IReturnAdapterRowsInvoices, option: keyof typeof InvoiceProcedure) => {
    const { id } = record;
    dispatch(
      postInvoicePrintAction({
        id,
        proc: InvoiceProcedure[option],
        action: afterPrint,
      }),
    );
  }, []);

  const columns = useMemo(() => getServicesColumnConfig(getSortingForTable(dateSort), onOption), [dateSort, sidx]);
  const filtersFormItems = useMemo(() => getInvoiceFiltersFormItems(statusOptions), [statusOptions]);
  const initialFiltersValues: IInvoiceFiltersInitialValues = {
    [InvoiceFilters.dateRange]: [startDate, endDate],
    [InvoiceFilters.status]: status,
    [InvoiceFilters.orderCode]: orderCode,
  };

  const getServicesActs = useCallback(() => {
    dispatch(
      getInvoicesAction({
        sliceName: financeSliceName,
        group: InfoParamsGroup.servicesActs,
        endDate: dayjs(endDate).format(dashedFormat) || '',
        startDate: dayjs(startDate).format(dashedFormat) || '',
        page,
        rows,
        sidx,
        sord: dateSort,
        status: status.join(','),
        orderCode,
      }),
    );
  }, [startDate, endDate, rows, page, sidx, dateSort, status, orderCode]);

  const onFilterFinish = useCallback((values: IInvoiceFiltersInitialValues) => {
    const { dateRange, status, orderCode } = values;
    dispatch(setServicesFilters({ startDate: dateRange[0], endDate: dateRange[1], status, orderCode }));
    handleFiltersClose();
  }, []);

  const onFilterReset = useCallback(() => {
    dispatch(resetServicesFilters());
  }, []);

  useEffect(() => {
    getServicesActs();
  }, [getServicesActs]);

  useEffect(
    () => () => {
      dispatch(resetServicesFilters());
    },
    [],
  );

  useEffect(() => {
    if (!statusOptions.length) {
      dispatch(infoParamsAction({ oper: InfoParamsOper.invoiceStatus, group: InfoParamsGroup.servicesActs }));
    }
  }, [statusOptions.length]);

  return (
    <>
      <PageTitle heading={heading} />
      <Toolbar>
        <Toolbar.ApplyFilter
          onClick={handleFiltersOpen}
          notification={filtersCount}
          drawerProps={{
            open: filtersOpen,
            onClose: handleFiltersClose,
            destroyOnClose: true,
            title: filtersDrawerTitle,
            children: (
              <FiltersForm
                initialValues={initialFiltersValues}
                formItems={filtersFormItems}
                onFinish={onFilterFinish}
                onReset={onFilterReset}
              />
            ),
          }}
        />
      </Toolbar>
      <TagsGroup tagsData={filterTagsData} closable dataTestId='finance-services' />
      <Table
        dataSelector={financeSelectors.getServicesTableData}
        columns={columns}
        rowKey='id'
        onChange={onTableChange}
        pagination={{ current: page, total: records, pageSize: rows }}
        loading={isLoading}
      />
    </>
  );
};

export default memo(Services);
