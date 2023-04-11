export class Event<T = any> {
  public readonly data: T | null;

  constructor(payload?: T) {
    this.data = payload || null;
  }
}
