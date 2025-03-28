import { isArray } from '@shared/lib';

import { DefyingMediateFuncType, IMediateValue, MediateFuncType } from './useFilterToTag.types';

const findLabelToShow: MediateFuncType<string> = ({ currentValue, selectConfig }) =>
  selectConfig.options.find((option) => option[selectConfig.valuePropName] === currentValue)?.[
    selectConfig.labelPropName
  ];

const getSelectValue: MediateFuncType<IMediateValue> = ({ currentValue: value, selectConfig }) => ({
  valueToShow: findLabelToShow({ currentValue: value, selectConfig }),
  initialValue: value as string,
});

export const getSelectValueForTag: MediateFuncType<IMediateValue[]> = ({ currentValue, selectConfig }) =>
  isArray(currentValue)
    ? [
        {
          ...getSelectValue({ currentValue: currentValue[0], selectConfig }),
          hiddenValues: currentValue.slice(1).map((value) => getSelectValue({ currentValue: value, selectConfig })),
        },
      ]
    : [getSelectValue({ currentValue, selectConfig })];

export const getValueForTag: DefyingMediateFuncType<IMediateValue[]> = ({ currentValue, selectConfig }) => {
  if (selectConfig) {
    return getSelectValueForTag({currentValue, selectConfig});
  }
  return isArray(currentValue)
    ? currentValue.map((value) => ({ valueToShow: value }))
    : [{ valueToShow: currentValue }];
};
