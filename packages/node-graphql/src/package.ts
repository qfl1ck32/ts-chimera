import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { ApolloPackage } from '@ts-phoenix/node-apollo';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';

@Injectable()
export class GraphQLPackage extends Package<PackageConfigType> {
  getConfigToken() {
    return PACKAGE_CONFIG_TOKEN;
  }

  getDependencies() {
    return [ApolloPackage];
  }
}
