import { Container as BaseContainer, interfaces } from 'inversify';

import { ServiceIdentifierNotFoundError } from './errors';
import { Token } from './token';

export class Container extends BaseContainer {
  public getToken<T>(token: Token<T>): T {
    return this.get(token.identifier);
  }

  public get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
    try {
      return super.get(serviceIdentifier);
    } catch (err) {
      let serviceName = '';

      if (typeof serviceIdentifier === 'string') {
        serviceName = serviceIdentifier;
      } else if (typeof serviceIdentifier === 'symbol') {
        serviceName = serviceIdentifier.toString();
      } else if (typeof serviceIdentifier === 'function') {
        serviceName = serviceIdentifier.name;
      }

      throw new ServiceIdentifierNotFoundError({
        name: serviceName,
      });
    }
  }
}
