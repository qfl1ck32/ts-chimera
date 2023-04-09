import { inject, injectable, Container } from 'inversify';
import 'reflect-metadata';

export { Container };

export const Injectable = injectable;

export const Inject = inject;

@Injectable()
export class Token<T> {
  public identifier: string;

  constructor(public readonly name: string) {
    this.identifier = Symbol.for(name).toString();
  }
}

export const InjectToken = <T>(token: Token<T>): any => {
  return function (target: any, key: string, index: number) {
    inject(token.identifier)(target, key, index);
  };
};

export const setToken = <T>(
  token: Token<T>,
  value: T,
  container: Container,
) => {
  container.bind(token.identifier).toConstantValue(value);
};
