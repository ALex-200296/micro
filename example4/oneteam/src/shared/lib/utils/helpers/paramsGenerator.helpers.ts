export const paramsGenerator = (params: [string, any][]) => Object.fromEntries(params.filter((items) => items[1]));
