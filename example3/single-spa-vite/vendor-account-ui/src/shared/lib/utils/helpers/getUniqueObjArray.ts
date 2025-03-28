export const getUniqueObjArray = <T>(arr: T[], key: keyof T): T[] => [
  ...new Map(arr.map((item) => [item[key], item])).values(),
];
