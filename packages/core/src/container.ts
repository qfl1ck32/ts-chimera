import { Container as BaseContainer } from '@ts-phoenix/di';

import { PackageConfigToken } from './tokens';

export class Container extends BaseContainer {
  public getPackageConfigToken<T>(token: PackageConfigToken<T>): T {
    return this.getToken(token);
  }
}
