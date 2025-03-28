export const filterOption = <T>(inputValue: string, option: T | undefined, optionKey: keyof T): boolean => {
  const selectOption = option && (option[optionKey] as string);
  return selectOption ? selectOption.toLowerCase().trim().includes(inputValue.toLowerCase().trim()) : true;
};
