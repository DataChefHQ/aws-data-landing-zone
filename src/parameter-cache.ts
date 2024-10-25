export class ParameterCache {

  public static getInstance(): ParameterCache {
    if (!ParameterCache.instance) {
      ParameterCache.instance = new ParameterCache();
    }

    return ParameterCache.instance;
  }

  public static get(key: string): string | undefined {
    return ParameterCache.getInstance().get(key);
  }

  public static set(key: string, value: string): void {
    ParameterCache.getInstance().set(key, value);
  }

  public static delete(key: string): boolean {
    return ParameterCache.getInstance().delete(key);
  }

  public static clear(): void {
    ParameterCache.getInstance().clear();
  }

  private static instance: ParameterCache;
  private cache: Map<string, string> = new Map<string, string>();

  private constructor() {
    this.cache = new Map<string, string>();
  }
  public get(key: string): string | undefined {
    return this.cache.get(key);
  }

  public set(key: string, value: string): void {
    this.cache.set(key, value);
  }

  public delete(key: string): boolean {
    return this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }

}