export const isDev = (): boolean => !import.meta.env.NODE_ENV || import.meta.env.NODE_ENV === 'development';
