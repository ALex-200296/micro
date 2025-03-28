export const createId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export const declension = (totalCount: number, [one, few, many]: [string, string, string]) => {
  const lastDigit = (Math.abs(totalCount) % 100) % 10;

  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit > 1 && lastDigit < 5) {
    return few;
  }

  return many;
};
