import { useMemo } from 'react';
import { ITagsGroupProps } from '@shared/lib/types';

import { getValueForTag } from './useFilterToTag.data';
import { IFilterConfig, IReturnData, IUseFilterToTagArgs } from './useFilterToTag.types';

export const useFilterToTag = <K extends string, V extends string>({
  filterConfig,
  onClose,
  onCloseAll,
}: IUseFilterToTagArgs<K, V>): IReturnData => {
  const filterTagsData: ITagsGroupProps['tagsData'] = useMemo(
    () =>
      Object.entries<IFilterConfig<V, K>>(filterConfig).reduce<ITagsGroupProps['tagsData']>(
        (accum, [key, { currentValue, filterName, selectConfig, dependency }]) => {
          const tagData = getValueForTag({ currentValue, selectConfig });
          const tags = tagData.map(({ valueToShow, initialValue, hiddenValues }) => ({
            value: valueToShow,
            label: filterName,
            ...(hiddenValues?.length
              ? {
                  hiddenValues: hiddenValues.map((hiddenValue) => ({
                    value: hiddenValue.valueToShow,
                    onClose: () => {
                      onClose?.(key as K, hiddenValue.initialValue, dependency);
                    },
                  })),
                }
              : {}),
            onClose: () => {
              onClose?.(key as K, initialValue, dependency);
            },
          }));

          return [...accum, ...tags];
        },
        [],
      ),
    [filterConfig],
  );
  const showCloseAllTag = useMemo(() => Boolean(filterTagsData.filter((el) => el.value).length), [filterTagsData]);

  const closeAllTag: ITagsGroupProps['tagsData'] = useMemo(
    () =>
      onCloseAll && showCloseAllTag
        ? [
            {
              value: 'Сбросить все',
              isCloseAllTag: true,
              onClose: onCloseAll,
            },
          ]
        : [],
    [onCloseAll, showCloseAllTag],
  );

  return {
    filterTagsData: [...filterTagsData, ...closeAllTag],
  };
};
