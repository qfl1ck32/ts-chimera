/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Container as BaseContainer } from 'inversify';

import { Token } from './token';

export class Container extends BaseContainer {
  public getToken<T>(token: Token<T>): T {
    return this.get(token.identifier);
  }
}
