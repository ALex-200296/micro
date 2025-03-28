export function createStringEnum<T extends { [key: string]: string }>(keysObj: T) {
  const optionsObj = {} as {
    [K in keyof T]: keyof T;
  };
  const keys = Object.keys(keysObj) as Array<keyof T>;
  for (const key of keys) {
    optionsObj[key] = key;
  }
  return [optionsObj] as const;
}
