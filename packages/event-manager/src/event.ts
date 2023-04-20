export abstract class Event<T = null> {
  public readonly data: T | null;

  constructor(...args: T extends null ? [] : [T]) {
    this.data = args?.[0] || null;
  }
}
