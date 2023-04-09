import { Injectable } from '@src/decorators';

@Injectable()
export class Token<T> {
  public identifier: string;

  constructor(public readonly name: string) {
    this.identifier = Symbol.for(name).toString();
  }
}
