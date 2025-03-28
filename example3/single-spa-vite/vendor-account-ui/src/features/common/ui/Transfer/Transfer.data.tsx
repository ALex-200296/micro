import theme from '@styles/themeExports.module.scss';

export const style = {
  list: { background: theme.backgroundGrey, height: 500, width: 430 },
  operation: { margin: '1rem' },
};

export const NoContentMessageKeys = {
  NO_CONTENT_LEFT: 'noContentLeft',
  NO_CONTENT_RIGHT: 'noContentRight',
} as const;
