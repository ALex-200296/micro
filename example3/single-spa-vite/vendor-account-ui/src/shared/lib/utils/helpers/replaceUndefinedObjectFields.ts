import { isUndefined } from './typeGuards/isUndefined';

export const replaceUndefinedObjectFields = (object: Record<string, any>) =>
  Object.fromEntries(Object.entries(object).map((elem) => (isUndefined(elem[1]) ? [elem[0], ''] : elem)));
