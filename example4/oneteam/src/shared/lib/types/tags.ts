import React from 'react';
import { SpaceProps, TagProps } from 'antd';

type PresetColorsType = 'default' | 'success' | 'error' | 'warning' | 'processing' | 'neutral';

export interface ITagsData extends Partial<Omit<TagProps, 'color' | 'visible' | 'bordered'>> {
  value: string;
  label?: string;
  color?: PresetColorsType | string;
  onClose?: (e?: React.MouseEvent<HTMLElement>) => void;
  isCloseAllTag?: boolean;
  hiddenValues?: Pick<ITagsData, 'value' | 'label' | 'onClose'>[];
}
export interface ITagsGroupProps
  extends Omit<TagProps, 'rootClassName' | 'color' | 'visible' | 'bordered' | 'onClose'> {
  tagsData: ITagsData[];
  dataTestId: string;
  color?: PresetColorsType | string;
  onClose?: (e?: React.MouseEvent<HTMLElement>) => void;
  spaceConfig?: SpaceProps;
}