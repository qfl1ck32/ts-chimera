export abstract class Event<T = null> {
  private readonly _data: T | null;

  constructor(...args: T extends null ? [] : [T]) {
    this._data = args?.[0] || null;
  }

  get data(): T extends null ? null : T {
    return this._data as any;
  }
}
