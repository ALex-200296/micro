import { filterOption } from '@shared/ui';
import { SelectProps } from 'antd/lib';

export const mutlipleFilterSelectProps: SelectProps = {
  mode: 'multiple',
  allowClear: true,
  showSearch: true,
  filterOption: (input, option) => filterOption(input, option, 'label'),
};
