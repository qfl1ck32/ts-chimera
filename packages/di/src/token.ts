import { Injectable } from './decorators';

@Injectable()
export class Token<T> {
  public identifier: string;

  constructor(name: string) {
    this.identifier = Symbol.for(name).toString();
  }
}
