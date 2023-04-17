import { Injectable } from './decorators';

@Injectable()
export class Token<T> {
  public identifier: symbol;

  constructor() {
    this.identifier = Symbol();
  }
}
