import { Container } from 'inversify';

import { Token } from './token';

export const setToken = <T>(args: {
  token: Token<T>;
  value: T;
  container: Container;
}) => {
  args.container.bind(args.token.identifier).toConstantValue(args.value);
};
