const handler = <T extends object>(defaultKey?: keyof T): ProxyHandler<T> => ({
  get: (target: T, name: string | symbol) => {
    const key = name as keyof T;
    if (defaultKey) return target[key] ? target[key] : target[defaultKey];
    return target[key] ? target[key] : target[Object.keys(target)[0] as keyof T];
  },
});

export const objectPropertyProxy = <T extends object>(object: T, defaultkey?: keyof T): T => {
  const proxyHandler = handler(defaultkey);
  return new Proxy<T>(object, proxyHandler);
};
