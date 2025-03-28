import React from 'react';
import { IInfoSearchState } from '@app/store/info/info.types';
import { DatePicker } from '@shared/ui/atoms/Inputs/DatePicker/DatePicker.component';
import { ReportsFilter } from '@store/root.types';
import { dataTestId } from '@views/BaseAccess/BaseAccessPage.data';
import { FilterLabels } from '@views/BaseAccess/BaseAccessPage.types';
import { Select } from 'antd';

import { FiltersFormItemsType } from '../../../../../entities/common/ui/FiltersForm/FiltersForm.types';

export const getReportsFilterFormItems = (statusMenuList: IInfoSearchState[]): FiltersFormItemsType => {
  return [
    {
      name: 'date',
      label: FilterLabels[ReportsFilter.date],
      labelType: 'float',
      children: <DatePicker allowClear={false} dataTestId={dataTestId} />,
    },
    {
      name: 'status',
      label: FilterLabels[ReportsFilter.status],
      labelType: 'float',
      children: <Select options={statusMenuList} fieldNames={{ value: 'code' }} allowClear />,
    },
  ];
};
