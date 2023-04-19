import { Container as BaseContainer } from '@ts-phoenix/di';
import { interfaces } from 'inversify';

import { CONFIG_TOKEN_IDENTIFIER } from './constants';
import { ConfigNotFoundError } from './errors';
import { PackageConfigToken } from './tokens';

export class Container extends BaseContainer {
  public getPackageConfigToken<T>(token: PackageConfigToken<T>): T {
    return this.getToken(token);
  }

  public get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
    try {
      return super.get(serviceIdentifier);
    } catch (e: any) {
      const message = e.message as string;

      if (message.includes('No matching bindings found')) {
        if (message.includes(CONFIG_TOKEN_IDENTIFIER)) {
          const packageName = message // Symbol(CONFIG_TOKEN_IDENTIFIER "PACKAGE_NAME")
            .split(CONFIG_TOKEN_IDENTIFIER)[1] // "PACKAGE_NAME")
            .slice(0, -1) // remove ")"
            .trim() // remove the space
            .split('_')
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');

          throw new ConfigNotFoundError({
            packageName,
          });
        }
      }

      throw e;
    }
  }
}
