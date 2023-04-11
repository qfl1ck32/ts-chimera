import { inject, injectable } from 'inversify';

import { Token } from './token';

export const Injectable = injectable;

export const Inject = inject;

export const InjectToken = <T>(token: Token<T>): any => {
  return function (target: any, key: string, index: number) {
    inject(token.identifier)(target, key, index);
  };
};
