class Cache {
  private INSTANCE: Record<string, any> = {};

  private set = (funcCache: any, argForFuncCache: any): any => {
    this.INSTANCE[funcCache] = funcCache(argForFuncCache);
  };

  private get = (funcCache: any): any => {
    return this.INSTANCE[funcCache];
  };

  public getCachedValueOrCompute = (funcCache: any, argForFuncCache: any): any => {
    if (this.INSTANCE[funcCache]) {
      return this.get(funcCache);
    }
    this.set(funcCache, argForFuncCache);
    return funcCache(argForFuncCache);
  };

  public clear = () => {
    this.INSTANCE = {};
  };
}

export const cacheRules = new Cache();
