import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { IconButton } from '@shared/ui/molecules';
import { ColumnType } from 'antd/es/table';
import cn from 'classnames';

import { FilterDropdown } from './FilterDropdown.component';

import styles from './FilterDropdown.module.scss';

export const defaultFiltersConfig = (
  isBtnDisabled: boolean = false,
  filterValue?: string | null,
): Pick<ColumnType, 'filterDropdown' | 'filterIcon' | 'filteredValue'> => {
  return {
    filteredValue: filterValue ? [filterValue] : undefined,
    filterDropdown: FilterDropdown,
    filterIcon: () => (
      <IconButton
        icon={<SearchOutlined className={cn({ [styles.icon_filtered]: !!filterValue })} />}
        className={styles.search_btn}
        dataTestId='open-filter-dropdown-btn'
        size='small'
        type='transparent'
        disabled={isBtnDisabled}
      />
    ),
  };
};

export const searchInputName = 'searchInput';
export const dropDownFilterItemConfig = {
  name: searchInputName,
  help: 'Должен содержать не менее 3 символов',
  rules: [{ min: 3, validateTrigger: ['onSubmit'] }],
};
