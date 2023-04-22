/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Container as BaseContainer, interfaces } from 'inversify';

import { Token } from './token';

export class Container extends BaseContainer {
  public getToken<T>(token: Token<T>): T {
    return this.get(token.identifier);
  }

  public bindToken<T>(token: Token<T>): interfaces.BindingToSyntax<T> {
    return super.bind(token.identifier);
  }

  public rebindToken<T>(token: Token<T>): interfaces.BindingToSyntax<T> {
    return super.rebind(token.identifier);
  }
}
