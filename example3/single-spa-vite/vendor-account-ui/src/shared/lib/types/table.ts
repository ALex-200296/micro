
import { FilterValue } from 'antd/es/table/interface';
import { SortOrder } from 'antd/lib/table/interface';

export type FilterDataType = Record<string, FilterValue | null>
export type OnChangeActionType = 'filter' | 'paginate' | 'sort';

export interface IOnChangeData {
  pagination: {
    page: number;
    rows: number;
  };
  action: OnChangeActionType;
  sort: {
    column?: React.Key;
    order?: SortOrder;
  };
  filter: FilterDataType;
}