export const ItemNames = {
  APP_THEME: 'appTheme',
  COMPONENTS: 'components',
  COLOR: 'color',
  BOX_SHADOW: 'boxShadow',
  FONT: 'font',
  LINE: 'line',
  SCREEN: 'screen',
} as const;

export interface ITabContentProps {
  tabItemName: typeof ItemNames;
}
