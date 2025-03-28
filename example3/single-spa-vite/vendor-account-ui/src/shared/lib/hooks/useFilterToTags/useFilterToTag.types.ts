import { ITagsGroupProps } from '@shared/lib/types';

export interface IFilterConfig<V extends string, K extends string> {
  selectConfig?: {
    valuePropName: V;
    labelPropName: string;
    options: Record<string, any>[];
    multiple?: boolean;
  };
  filterName?: string;
  currentValue: string | string[];
  dependency?: Partial<Record<K, any>>;
}
export interface IUseFilterToTagArgs<K extends string, V extends string> {
  filterConfig: Record<K, IFilterConfig<V, K>>;
  onClose?: (key: K, value?: string, dependency?: Partial<Record<K, any>>) => void;
  onCloseAll?: () => void;
}

export interface IMediateValue {
  valueToShow: string;
  initialValue?: string;
  dependency?: Partial<Record<string, any>>;
  hiddenValues?: IMediateValue[];
}

export interface IReturnData {
  filterTagsData: ITagsGroupProps['tagsData'];
}

interface IMediateFuncArgs<V extends string, K extends string> {
  currentValue: IFilterConfig<V, K>['currentValue'];
  selectConfig?: Required<IFilterConfig<V, K>>['selectConfig'];
}

export type DefyingMediateFuncType<R> = <V extends string, K extends string>(args: IMediateFuncArgs<V, K>) => R;

export type MediateFuncType<R> = <V extends string, K extends string>(args: Required<IMediateFuncArgs<V, K>>) => R;
