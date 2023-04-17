import { Injectable, Package } from '@ts-phoenix/core';

// eslint-disable-next-line import/namespace
// import * as Services from '@src/services';

@Injectable()
export class AppPackage extends Package {
  getConfigToken() {
    return null;
  }

  // initialiseServices() {
  //   return Object.values(Services);
  // }
}
