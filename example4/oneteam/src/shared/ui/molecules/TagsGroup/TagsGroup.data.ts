import { SpaceProps } from 'antd';

import styles from './TagsGroup.module.scss';
import theme from '@styles/themeExports.module.scss';

export const spaceDefault: SpaceProps = {
  wrap: true,
  size: [4, 4],
  className: styles.space,
};
export const tagColorIsNeutral = (tagGroupColor?: string, tagColor?: string): boolean =>
  (tagColor || tagGroupColor) === 'neutral';
export const getTagColor = (tagGroupColor: string, tagColor?: string): string =>
  tagColorIsNeutral(tagGroupColor, tagColor) ? theme.backgroundGrey : tagColor || tagGroupColor;
export const tagColorIsNeutralHex = (tagColor?: string): boolean =>
    tagColor === theme.backgroundGrey;
