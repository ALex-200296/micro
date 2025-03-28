export const defaultRows: number = 10;

export const calculateRangeRows = <T>(rows: T[], page: number): T[] => {
  return rows.slice(defaultRows * (page - 1), defaultRows * page);
};
