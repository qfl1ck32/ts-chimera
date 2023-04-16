import { Package } from '@ts-chimera/core';

export class AppPackage extends Package {
  getServices() {
    return [];
  }

  async initialise() {}
}
