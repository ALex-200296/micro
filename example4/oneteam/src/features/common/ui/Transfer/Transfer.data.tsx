import theme from '@styles/themeExports.module.scss';

export const style = {
  list: { background: theme.backgroundGrey, height: 500, width: 430 },
  operation: { margin: '1rem' },
};

export const noContentMessageKeys = {
  noContentLeft: 'noContentLeft',
  noContentRight: 'noContentRight',
} as const;
