import { ErrorContext } from './defs';

import GlobalError = globalThis.Error;

export abstract class Error<T = null> extends GlobalError {
  private _data?: T;

  constructor(...args: T extends null ? [] : [T]) {
    super();

    this._data = args[0];

    this.message = this.getMessage();
  }

  getCode(): string {
    const nameOfError = this.getNameOfError();
    const code = nameOfError
      .replace(/([A-Z])/g, '_$1')
      .toUpperCase()
      .slice(1);

    return code;
  }

  public getContext(): ErrorContext {
    return {};
  }

  public getMessage(): string {
    const nameOfError = this.getNameOfError();
    return `Error ${nameOfError} has occurred.`;
  }

  get data(): T extends null ? undefined : T {
    return this._data as any;
  }

  private getNameOfError(): string {
    const className = this.constructor.name;
    return className.replace(/Error$/, '');
  }
}
