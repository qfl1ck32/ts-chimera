import { ErrorContext } from './defs';

import GlobalError = globalThis.Error;

export class Error<T = null> extends GlobalError {
  private _data?: T;

  constructor(...args: T extends null ? [] : [T]) {
    super();

    this._data = args?.[0];

    this.message = this.getMessage();
  }

  getCode(): string {
    const nameOfError = this.getNameOfError();
    const code = nameOfError.toUpperCase().replace(/([a-z])([A-Z])/g, '$1_$2');

    return code;
  }

  public getContext(): ErrorContext {
    return {};
  }

  public getMessage(): string {
    const nameOfError = this.getNameOfError();
    console.log({ nameOfError });
    return `Error ${nameOfError} has occurred.`;
  }

  get data(): T | undefined {
    return this._data;
  }

  private getNameOfError(): string {
    const className = this.constructor.name;
    return className.replace(/Error$/, '');
  }
}
