import { interfaces, Container as BaseContainer } from 'inversify';

import { CONFIG_TOKEN_IDENTIFIER, SERVICE_TOKEN_IDENTIFIER } from './constants';
import { ConfigNotFoundError, ServiceNotFoundError } from './errors';

export class Container extends BaseContainer {
  public get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
    try {
      return super.get(serviceIdentifier);
    } catch (e: any) {
      const message = e.message as string;

      if (message.includes('No matching bindings found')) {
        if (message.includes(CONFIG_TOKEN_IDENTIFIER)) {
          const packageName = message // Symbol(CONFIG_TOKEN_IDENTIFIER "PackageName")
            .split(CONFIG_TOKEN_IDENTIFIER)[1]
            .slice(0, -1)
            .trim();

          throw new ConfigNotFoundError({
            packageName,
          });
        }

        if (message.includes(SERVICE_TOKEN_IDENTIFIER)) {
          const serviceName = message // Symbol(SERVICE_TOKEN_IDENTIFIER "ServiceName")
            .split(SERVICE_TOKEN_IDENTIFIER)[1]
            .slice(0, -1)
            .trim();

          throw new ServiceNotFoundError({
            serviceName,
          });
        }
      }

      throw e;
    }
  }
}
